export interface SpraySettings {
  widthMeters: number;
  offsetMeters: number;
  forwardOffsetMeters: number;
}

export interface SavedSprayStrip {
  sequence: number;
  coordinates: number[];
  areaSqMeters: number;
}

export interface SavedSprayTrack extends SpraySettings {
  id: string;
  startedAt: string;
  updatedAt: string;
  totalAreaSqMeters: number;
  revision: number;
}

export interface SpraySave extends SpraySettings {
  saveId: string;
  revision: number;
  strips: SavedSprayStrip[];
}

export const SPRAY_BATCH_SIZE = 64;
export const SPRAY_PAGE_SIZE = 20;
export const SPRAY_BODY_LIMIT = 64 * 1024;

export function isTrackId(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function between(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

export function isSpraySettings(value: unknown): value is SpraySettings {
  return record(value) && between(value.widthMeters, 1, 50) &&
    between(value.offsetMeters, -25, 25) && between(value.forwardOffsetMeters, -25, 25);
}

export function isSavedStrip(value: unknown): value is SavedSprayStrip {
  return record(value) && Number.isSafeInteger(value.sequence) && between(value.sequence, 0, 2_147_483_646) &&
    between(value.areaSqMeters, 0, 1_000_000_000) && Array.isArray(value.coordinates) &&
    value.coordinates.length === 8 && value.coordinates.every((coordinate, index) =>
      between(coordinate, index % 2 === 0 ? -180 : -90, index % 2 === 0 ? 180 : 90));
}

export function isSpraySave(value: unknown): value is SpraySave {
  return isSpraySettings(value) && record(value) && isTrackId(value.saveId) &&
    Number.isSafeInteger(value.revision) && between(value.revision, 0, 2_147_483_646) &&
    Array.isArray(value.strips) && value.strips.length <= SPRAY_BATCH_SIZE &&
    value.strips.every((strip, index, strips) => isSavedStrip(strip) &&
      (index === 0 || strip.sequence === strips[index - 1].sequence + 1));
}

export function isSavedTrack(value: unknown): value is SavedSprayTrack {
  return isSpraySettings(value) && record(value) && isTrackId(value.id) &&
    typeof value.startedAt === "string" && Number.isFinite(Date.parse(value.startedAt)) &&
    typeof value.updatedAt === "string" && Number.isFinite(Date.parse(value.updatedAt)) &&
    between(value.totalAreaSqMeters, 0, Number.MAX_SAFE_INTEGER) &&
    Number.isSafeInteger(value.revision) && between(value.revision, 0, 2_147_483_647);
}

export function parseTrackPage(value: unknown): { tracks: SavedSprayTrack[]; nextCursor: string | null } {
  if (!record(value) || !Array.isArray(value.tracks) || !value.tracks.every(isSavedTrack) ||
    !(value.nextCursor === null || isTrackId(value.nextCursor))) throw new Error("Invalid saved track list.");
  return { tracks: value.tracks, nextCursor: value.nextCursor };
}

export function parseTrackDetail(value: unknown): {
  track: SavedSprayTrack; strips: SavedSprayStrip[]; nextSequence: number | null;
} {
  if (!record(value) || !isSavedTrack(value.track) || !Array.isArray(value.strips) ||
    !value.strips.every(isSavedStrip) ||
    !(value.nextSequence === null || (Number.isSafeInteger(value.nextSequence) && between(value.nextSequence, 0, 2_147_483_646)))) {
    throw new Error("Invalid saved track coverage.");
  }
  return { track: value.track, strips: value.strips, nextSequence: value.nextSequence };
}
