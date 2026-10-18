export type HeadingSource = "none" | "gnss" | "gnss+imu" | "imu+mag" | "imu";
export type MotionDirection = "forward" | "reverse" | "stationary";
export type ImuState = "ok" | "stale" | "missing";

export type GnssDisplay = {
  seq: number;
  publishedAtMs: number;
  fix: {
    timestamp: string;
    latitude: number;
    longitude: number;
    ageMs: number;
    fixType: string | null;
  } | null;
  headingDeg: number | null;
  headingStdDeg: number | null;
  headingSource: HeadingSource;
  yawRateDps: number;
  direction: MotionDirection;
  rollDeg: number | null;
  pitchDeg: number | null;
  imuState: ImuState;
  magUsed: boolean;
  magDisturbance: number | null;
  /** Signed vehicle speed; negative while reversing. */
  speedMps: number | null;
};

export type DisplayPose = {
  latitude: number;
  longitude: number;
  /** Fused body heading, or null when it is not trustworthy enough to draw. */
  headingDeg: number | null;
};

const HEADING_SOURCES = new Set<HeadingSource>(["none", "gnss", "gnss+imu", "imu+mag", "imu"]);
const DIRECTIONS = new Set<MotionDirection>(["forward", "reverse", "stationary"]);
const IMU_STATES = new Set<ImuState>(["ok", "stale", "missing"]);
const EARTH_RADIUS_M = 6378137;
const RAD = Math.PI / 180;

const finite = (value: unknown): number | null => typeof value === "number" && Number.isFinite(value) ? value : null;
const record = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
const wrap360 = (degrees: number) => ((degrees % 360) + 360) % 360;
const wrap180 = (degrees: number) => wrap360(degrees + 180) - 180;

/** Validates the gnss-reader display payload; returns null for anything malformed. */
export function parseGnssDisplay(payload: unknown): GnssDisplay | null {
  const value = record(payload);
  if (!value || value.version !== 1) return null;
  const seq = finite(value.seq);
  const publishedAtMs = finite(value.publishedAtMs);
  if (seq === null || publishedAtMs === null) return null;
  const rawFix = record(value.fix);
  let fix: GnssDisplay["fix"] = null;
  if (rawFix) {
    const latitude = finite(rawFix.latitude);
    const longitude = finite(rawFix.longitude);
    if (latitude !== null && longitude !== null && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180) {
      fix = {
        timestamp: typeof rawFix.timestamp === "string" ? rawFix.timestamp : new Date(publishedAtMs).toISOString(),
        latitude,
        longitude,
        ageMs: Math.max(0, finite(rawFix.ageMs) ?? 0),
        fixType: typeof rawFix.fixType === "string" ? rawFix.fixType : null,
      };
    }
  }
  const imu = record(value.imu);
  const mag = record(value.mag);
  const headingDeg = finite(value.headingDeg);
  return {
    seq,
    publishedAtMs,
    fix,
    headingDeg: headingDeg === null ? null : wrap360(headingDeg),
    headingStdDeg: finite(value.headingStdDeg),
    headingSource: HEADING_SOURCES.has(value.headingSource as HeadingSource) ? value.headingSource as HeadingSource : "none",
    yawRateDps: finite(value.yawRateDps) ?? 0,
    direction: DIRECTIONS.has(value.direction as MotionDirection) ? value.direction as MotionDirection : "stationary",
    rollDeg: finite(value.rollDeg),
    pitchDeg: finite(value.pitchDeg),
    imuState: IMU_STATES.has(imu?.state as ImuState) ? imu?.state as ImuState : "missing",
    magUsed: mag?.used === true,
    magDisturbance: finite(mag?.disturbance),
    speedMps: finite(value.speedMps),
  };
}

export type PredictorOptions = {
  maxPredictionMs?: number;
  staleAfterMs?: number;
  blendTimeConstantMs?: number;
  snapDistanceM?: number;
  snapHeadingDeg?: number;
  maxHeadingStdDeg?: number;
};

type Base = { display: GnssDisplay & { fix: NonNullable<GnssDisplay["fix"]> }; receivedAtMs: number };

/**
 * Dead-reckons the displayed vehicle pose between 20 Hz display packets with a constant turn rate
 * and velocity model, and blends corrections so the vehicle glides instead of jumping.
 * Times are local monotonic milliseconds (performance.now()).
 */
export class DisplayPosePredictor {
  private base: Base | null = null;
  private correction = { eastM: 0, northM: 0, headingDeg: 0, atMs: 0 };
  private readonly options: Required<PredictorOptions>;

  constructor(options: PredictorOptions = {}) {
    this.options = {
      maxPredictionMs: 500,
      staleAfterMs: 1000,
      blendTimeConstantMs: 250,
      snapDistanceM: 5,
      snapHeadingDeg: 45,
      maxHeadingStdDeg: 40,
      ...options,
    };
  }

  get latest(): GnssDisplay | null {
    return this.base?.display ?? null;
  }

  reset() {
    this.base = null;
    this.correction = { eastM: 0, northM: 0, headingDeg: 0, atMs: 0 };
  }

  /** Returns false when the packet is a duplicate or has no position. */
  ingest(display: GnssDisplay, receivedAtMs: number): boolean {
    const previous = this.base?.display;
    if (previous && display.seq === previous.seq && display.publishedAtMs === previous.publishedAtMs) return false;
    if (previous && display.publishedAtMs < previous.publishedAtMs) return false;
    if (!display.fix) {
      this.reset();
      return false;
    }
    const before = this.base ? this.pose(receivedAtMs) : null;
    this.base = { display: display as Base["display"], receivedAtMs };
    const after = this.rawPose(receivedAtMs);
    if (!before || !after) {
      this.correction = { eastM: 0, northM: 0, headingDeg: 0, atMs: receivedAtMs };
      return true;
    }
    const cosLat = Math.cos(after.latitude * RAD);
    const northM = (before.latitude - after.latitude) * RAD * EARTH_RADIUS_M;
    const eastM = wrap180(before.longitude - after.longitude) * RAD * EARTH_RADIUS_M * cosLat;
    const headingDeg = before.headingDeg !== null && after.headingDeg !== null ? wrap180(before.headingDeg - after.headingDeg) : 0;
    const snap = Math.hypot(eastM, northM) > this.options.snapDistanceM || Math.abs(headingDeg) > this.options.snapHeadingDeg;
    this.correction = snap ? { eastM: 0, northM: 0, headingDeg: 0, atMs: receivedAtMs } : { eastM, northM, headingDeg, atMs: receivedAtMs };
    return true;
  }

  /** Smoothed pose for rendering, or null when no recent packet is available. */
  pose(nowMs: number): DisplayPose | null {
    const raw = this.rawPose(nowMs);
    if (!raw) return null;
    const weight = Math.exp(-Math.max(0, nowMs - this.correction.atMs) / this.options.blendTimeConstantMs);
    if (weight < 1e-3) return raw;
    const latitude = raw.latitude + (this.correction.northM * weight) / EARTH_RADIUS_M / RAD;
    const longitude = raw.longitude + (this.correction.eastM * weight) / (EARTH_RADIUS_M * Math.cos(raw.latitude * RAD)) / RAD;
    return {
      latitude,
      longitude,
      headingDeg: raw.headingDeg === null ? null : wrap360(raw.headingDeg + this.correction.headingDeg * weight),
    };
  }

  private rawPose(nowMs: number): DisplayPose | null {
    if (!this.base) return null;
    const { display, receivedAtMs } = this.base;
    const sinceReceiveMs = nowMs - receivedAtMs;
    if (sinceReceiveMs > this.options.staleAfterMs) return null;
    const { fix } = display;
    const trusted = display.headingDeg !== null && display.headingSource !== "none" &&
      (display.headingStdDeg === null || display.headingStdDeg <= this.options.maxHeadingStdDeg);
    if (!trusted) return { latitude: fix.latitude, longitude: fix.longitude, headingDeg: null };

    const yawRate = display.yawRateDps;
    const headingNow = wrap360(display.headingDeg! + yawRate * Math.max(0, Math.min(sinceReceiveMs, this.options.maxPredictionMs)) / 1000);
    const speed = display.speedMps;
    if (display.direction === "stationary" || speed === null || speed === 0) {
      return { latitude: fix.latitude, longitude: fix.longitude, headingDeg: headingNow };
    }
    const dtS = Math.min(this.options.maxPredictionMs, Math.max(0, fix.ageMs + sinceReceiveMs)) / 1000;
    const headingAtFix = display.headingDeg! - yawRate * fix.ageMs / 1000;
    const omega = yawRate * RAD;
    const turn = omega * dtS;
    // Exact chord of a constant-rate arc; speed is signed so reversing moves backwards.
    const distance = Math.abs(turn) < 1e-6 ? speed * dtS : (2 * speed / omega) * Math.sin(turn / 2);
    const bearing = (headingAtFix * RAD) + turn / 2;
    const northM = distance * Math.cos(bearing);
    const eastM = distance * Math.sin(bearing);
    const latitude = fix.latitude + northM / EARTH_RADIUS_M / RAD;
    const longitude = fix.longitude + eastM / (EARTH_RADIUS_M * Math.cos(fix.latitude * RAD)) / RAD;
    return { latitude, longitude, headingDeg: headingNow };
  }
}

const HEADING_SOURCE_LABELS: Record<HeadingSource, string> = {
  none: "No heading",
  gnss: "GNSS course",
  "gnss+imu": "GNSS + gyro",
  "imu+mag": "Gyro + compass",
  imu: "Gyro only",
};

export function formatHeading(headingDeg: number | null, headingStdDeg: number | null, source: HeadingSource) {
  if (headingDeg === null || source === "none") return HEADING_SOURCE_LABELS.none;
  const uncertainty = headingStdDeg === null ? "" : ` ±${Math.max(1, Math.round(headingStdDeg))}°`;
  return `${Math.round(headingDeg) % 360}°${uncertainty} (${HEADING_SOURCE_LABELS[source]})`;
}

/** Tilt text and a warning colour; roll is positive with the right side down. */
export function formatTilt(rollDeg: number | null, pitchDeg: number | null) {
  if (rollDeg === null || pitchDeg === null) return null;
  const roll = Math.abs(rollDeg) < 0.05 ? "level" : `${Math.abs(rollDeg).toFixed(1)}° ${rollDeg > 0 ? "right" : "left"} down`;
  const pitch = Math.abs(pitchDeg) < 0.05 ? "level" : `${Math.abs(pitchDeg).toFixed(1)}° nose ${pitchDeg > 0 ? "up" : "down"}`;
  const worst = Math.max(Math.abs(rollDeg), Math.abs(pitchDeg));
  return {
    text: `Roll ${roll} · Pitch ${pitch}`,
    color: worst >= 20 ? "#FF5252" : worst >= 12 ? "#FFC107" : "inherit",
  };
}
