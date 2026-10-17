import {
  isSavedTrack, parseTrackDetail, SPRAY_BATCH_SIZE,
  type SavedSprayStrip, type SavedSprayTrack, type SpraySave, type SpraySettings,
} from "./spray-tracks";

export class SprayTrackHttpError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export type TrackTransport = (url: string, init?: RequestInit) => Promise<unknown>;

interface TrackSessionState {
  track: SavedSprayTrack | null;
  totalAreaSqMeters: number;
  busy: boolean;
  saving: boolean;
  dirty: boolean;
  error: string | null;
  conflict: boolean;
}

export class SprayTrackSession {
  private state: TrackSessionState = {
    track: null, totalAreaSqMeters: 0, busy: false, saving: false, dirty: false, error: null, conflict: false,
  };
  private listeners = new Set<() => void>();
  private coverage: SavedSprayStrip[] = [];
  private savedCount = 0;
  private settings: SpraySettings = { widthMeters: 6, offsetMeters: 0, forwardOffsetMeters: -1.5 };
  private settingsVersion = 0;
  private savedSettingsVersion = 0;
  private creationId: string | null = null;
  private pendingSave: { body: SpraySave; settingsVersion: number } | null = null;
  private savePromise: Promise<boolean> | null = null;

  constructor(private request: TrackTransport, private uuid: () => string = () => crypto.randomUUID()) {}

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };
  getSnapshot = () => this.state;
  get strips(): readonly SavedSprayStrip[] { return this.coverage; }

  private publish(update: Partial<TrackSessionState>) {
    this.state = { ...this.state, ...update };
    for (const listener of this.listeners) listener();
  }

  private failure(error: unknown, revisionConflict = false) {
    console.error("Spray track operation failed:", error);
    this.publish({
      error: error instanceof Error ? error.message : String(error),
      conflict: this.state.conflict || (revisionConflict && error instanceof SprayTrackHttpError && error.status === 409),
    });
  }

  setSettings(settings: SpraySettings) {
    if (Object.keys(settings).every(key => settings[key as keyof SpraySettings] === this.settings[key as keyof SpraySettings])) return;
    this.settings = { ...settings };
    this.settingsVersion++;
    if (this.state.track) this.publish({ dirty: true });
  }

  append(coordinates: number[], areaSqMeters: number) {
    if (!this.state.track || this.state.busy || this.state.error) return;
    this.coverage.push({ sequence: this.coverage.length, coordinates: [...coordinates], areaSqMeters });
    this.publish({ dirty: true, totalAreaSqMeters: this.state.totalAreaSqMeters + areaSqMeters });
  }

  private readTrack(value: unknown) {
    if (!value || typeof value !== "object" || !("track" in value) || !isSavedTrack(value.track)) {
      throw new Error("Invalid spray track save response.");
    }
    return value.track;
  }

  private async create() {
    this.creationId ??= this.uuid();
    const version = this.settingsVersion;
    const track = this.readTrack(await this.request("/api/spray-tracks", {
      method: "POST", body: JSON.stringify({ id: this.creationId, ...this.settings }),
    }));
    const matches = track.widthMeters === this.settings.widthMeters && track.offsetMeters === this.settings.offsetMeters &&
      track.forwardOffsetMeters === this.settings.forwardOffsetMeters;
    this.savedSettingsVersion = matches ? this.settingsVersion : version - 1;
    this.publish({ track, dirty: !matches, error: null, conflict: false });
  }

  async start(): Promise<boolean> {
    if (this.state.busy || this.state.error) return false;
    this.publish({ busy: true });
    try {
      if (!this.state.track) {
        await this.create();
      }
      return true;
    } catch (error) { this.failure(error); return false; }
    finally { this.publish({ busy: false }); }
  }

  flush(): Promise<boolean> {
    if (this.savePromise) return this.savePromise;
    this.savePromise = this.save().finally(() => { this.savePromise = null; });
    return this.savePromise;
  }

  private async save(): Promise<boolean> {
    if (this.state.conflict) return false;
    if (!this.state.track) {
      // A failed create is retried with the same ID, avoiding duplicate tracks.
      if (!this.creationId) {
        this.publish({ error: null });
        return true;
      }
      try {
        await this.create();
      } catch (error) { this.failure(error); return false; }
    }
    if (!this.state.track) throw new Error("Spray track creation did not return a track.");
    this.publish({ saving: true });
    try {
      while (this.savedCount < this.coverage.length || this.savedSettingsVersion !== this.settingsVersion || this.pendingSave) {
        this.pendingSave ??= {
          body: {
            ...this.settings, revision: this.state.track.revision, saveId: this.uuid(),
            strips: this.coverage.slice(this.savedCount, this.savedCount + SPRAY_BATCH_SIZE),
          },
          settingsVersion: this.settingsVersion,
        };
        const pending = this.pendingSave;
        const track = this.readTrack(await this.request(`/api/spray-tracks/${this.state.track.id}`, {
          method: "PATCH", body: JSON.stringify(pending.body),
        }));
        this.savedCount += pending.body.strips.length;
        this.savedSettingsVersion = pending.settingsVersion;
        this.pendingSave = null;
        this.publish({ track });
      }
      this.publish({ dirty: false, error: null, conflict: false });
      return true;
    } catch (error) { this.failure(error, true); return false; }
    finally { this.publish({ saving: false }); }
  }

  async newTrack(): Promise<boolean> {
    if (this.state.busy) return false;
    this.publish({ busy: true });
    try {
      if (!await this.flush()) return false;
      this.coverage = [];
      this.savedCount = 0;
      this.creationId = null;
      this.pendingSave = null;
      this.savedSettingsVersion = this.settingsVersion;
      this.publish({ track: null, totalAreaSqMeters: 0, dirty: false, error: null, conflict: false });
      return true;
    } finally { this.publish({ busy: false }); }
  }

  async resume(id: string, discard = false): Promise<boolean> {
    if (this.state.busy) return false;
    this.publish({ busy: true });
    try {
      if (this.savePromise) await this.savePromise;
      if (!discard && !await this.flush()) return false;
      const coverage: SavedSprayStrip[] = [];
      let after = -1;
      let track: SavedSprayTrack | null = null;
      let more = true;
      while (more) {
        const page = parseTrackDetail(await this.request(
          `/api/spray-tracks/${id}?after=${after}${track ? `&revision=${track.revision}` : ""}`,
        ));
        track = page.track;
        for (const strip of page.strips) {
          if (strip.sequence !== coverage.length) throw new Error("Saved track contains a coverage gap.");
          coverage.push(strip);
        }
        more = page.nextSequence !== null;
        if (page.nextSequence !== null) {
          if (page.nextSequence <= after) throw new Error("Invalid saved coverage pagination.");
          after = page.nextSequence;
        }
      }
      if (!track) throw new Error("Saved track metadata is missing.");
      const area = coverage.reduce((total, strip) => total + strip.areaSqMeters, 0);
      if (Math.abs(area - track.totalAreaSqMeters) > Math.max(0.001, area * 1e-9)) {
        throw new Error("Saved track area does not match its coverage.");
      }
      this.coverage = coverage;
      this.savedCount = coverage.length;
      this.settings = {
        widthMeters: track.widthMeters, offsetMeters: track.offsetMeters, forwardOffsetMeters: track.forwardOffsetMeters,
      };
      this.settingsVersion++;
      this.savedSettingsVersion = this.settingsVersion;
      this.pendingSave = null;
      this.creationId = track.id;
      this.publish({ track, totalAreaSqMeters: track.totalAreaSqMeters, dirty: false, error: null, conflict: false });
      return true;
    } catch (error) { this.failure(error); return false; }
    finally { this.publish({ busy: false }); }
  }

  async deleteCurrent(): Promise<boolean> {
    if (this.state.busy) return false;
    this.publish({ busy: true });
    try {
      if (this.savePromise) await this.savePromise;
      const id = this.state.track?.id ?? this.creationId;
      if (id) {
        // A lost save response may have advanced the revision. Retry that exact
        // batch first; never delete another device's subsequent changes.
        if (this.pendingSave && !await this.flush()) return false;
        const result = await this.request(`/api/spray-tracks/${id}?revision=${this.state.track?.revision ?? 0}`, { method: "DELETE" });
        if (!result || typeof result !== "object" || !("deleted" in result) || result.deleted !== true) {
          throw new Error("Spray track deletion was not confirmed.");
        }
      }
      this.coverage = [];
      this.savedCount = 0;
      this.creationId = null;
      this.pendingSave = null;
      this.savedSettingsVersion = this.settingsVersion;
      this.publish({ track: null, totalAreaSqMeters: 0, dirty: false, error: null, conflict: false });
      return true;
    } catch (error) { this.failure(error, true); return false; }
    finally { this.publish({ busy: false }); }
  }
}
