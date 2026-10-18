// IMU attitude, magnetometer and calibration maths shared by the IMU service and calibration CLI.
// Vehicle frame is FLU: x = forward, y = left, z = up. Heading values are clockwise from north.
import { mkdir, readFile, rename, writeFile, copyFile } from "node:fs/promises";
import { dirname } from "node:path";

export const STANDARD_GRAVITY = 9.80665;
export const DEFAULT_AXIS_MAP = "+z,+x,+y";
const RAD = Math.PI / 180;

export const wrap360 = degrees => ((degrees % 360) + 360) % 360;
export const wrap180 = degrees => wrap360(degrees + 180) - 180;
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = a => Math.hypot(a[0], a[1], a[2]);
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export function normalize(a) {
  const length = norm(a);
  return length > 0 ? scale(a, 1 / length) : [0, 0, 1];
}
export const matVec = (m, v) => [dot(m[0], v), dot(m[1], v), dot(m[2], v)];
export const transpose = m => [0, 1, 2].map(i => [m[0][i], m[1][i], m[2][i]]);
export const matMul = (a, b) => {
  const bt = transpose(b);
  return a.map(row => bt.map(column => dot(row, column)));
};
export const IDENTITY = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const det3 = m => dot(m[0], cross(m[1], m[2]));

/** Parses "forward,left,up" sensor axes, e.g. "+z,+x,+y", into a sensor-to-vehicle matrix. */
export function axisMatrix(spec = DEFAULT_AXIS_MAP) {
  const parts = String(spec).split(",").map(part => part.trim().toLowerCase());
  if (parts.length !== 3) throw new Error(`Axis map '${spec}' must list forward,left,up axes, e.g. ${DEFAULT_AXIS_MAP}.`);
  const rows = parts.map(part => {
    const match = /^([+-]?)([xyz])$/.exec(part);
    if (!match) throw new Error(`Axis map '${spec}' contains invalid axis '${part}'.`);
    const row = [0, 0, 0];
    row["xyz".indexOf(match[2])] = match[1] === "-" ? -1 : 1;
    return row;
  });
  if (Math.round(det3(rows)) !== 1) {
    throw new Error(`Axis map '${spec}' must be a right-handed rotation of the sensor axes.`);
  }
  return rows;
}

export function rotationZ(degrees) {
  const c = Math.cos(degrees * RAD);
  const s = Math.sin(degrees * RAD);
  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
}

/** Minimal rotation taking unit vector `from` onto unit vector `to`. */
export function rotationBetween(from, to) {
  const a = normalize(from);
  const b = normalize(to);
  const v = cross(a, b);
  const c = dot(a, b);
  if (c < -0.999999) throw new Error("Cannot level a sensor mounted upside down; check the axis map.");
  const k = 1 / (1 + c);
  return [
    [c + k * v[0] * v[0], k * v[0] * v[1] - v[2], k * v[0] * v[2] + v[1]],
    [k * v[1] * v[0] + v[2], c + k * v[1] * v[1], k * v[1] * v[2] - v[0]],
    [k * v[2] * v[0] - v[1], k * v[2] * v[1] + v[0], c + k * v[2] * v[2]],
  ];
}

/** Roll is positive with the right side down and pitch positive nose up. */
export function tiltFromUp(up) {
  const u = normalize(up);
  return {
    rollDeg: Math.atan2(u[1], u[2]) / RAD,
    pitchDeg: Math.asin(Math.max(-1, Math.min(1, u[0]))) / RAD,
  };
}

/** Tilt-compensated magnetic heading of the vehicle forward axis. */
export function magneticHeading(field, up) {
  const u = normalize(up);
  const fieldStrength = norm(field);
  const horizontal = sub(field, scale(u, dot(field, u)));
  if (fieldStrength <= 0 || norm(horizontal) < fieldStrength * 0.05) return null;
  const north = normalize(horizontal);
  const east = cross(north, u);
  return {
    headingDeg: wrap360(Math.atan2(east[0], north[0]) / RAD),
    fieldUt: fieldStrength,
    // Positive dip points down, as in the northern hemisphere; Australia is negative.
    dipDeg: Math.asin(Math.max(-1, Math.min(1, -dot(field, u) / fieldStrength))) / RAD,
  };
}

/** Scores magnetic disturbance from field strength and dip changes; 0 is clean, above 1 is suspect. */
export class MagDisturbance {
  constructor(reference = null, { fieldTolerance = 0.1, dipToleranceDeg = 5, learnTimeConstantS = 120 } = {}) {
    this.reference = reference && Number.isFinite(reference.fieldUt) && Number.isFinite(reference.dipDeg)
      ? { fieldUt: reference.fieldUt, dipDeg: reference.dipDeg }
      : null;
    this.learned = this.reference === null;
    this.fieldTolerance = fieldTolerance;
    this.dipToleranceDeg = dipToleranceDeg;
    this.learnTimeConstantS = learnTimeConstantS;
  }

  update(fieldUt, dipDeg, dt) {
    if (!this.reference) {
      this.reference = { fieldUt, dipDeg };
      return 0;
    }
    const disturbance = Math.max(
      Math.abs(fieldUt - this.reference.fieldUt) / (this.reference.fieldUt * this.fieldTolerance),
      Math.abs(dipDeg - this.reference.dipDeg) / this.dipToleranceDeg,
    );
    if (this.learned && disturbance < 1.5) {
      const k = Math.min(1, dt / this.learnTimeConstantS);
      this.reference.fieldUt += (fieldUt - this.reference.fieldUt) * k;
      this.reference.dipDeg += (dipDeg - this.reference.dipDeg) * k;
    }
    return disturbance;
  }
}

/**
 * Gravity-aided tilt filter with yaw integrated about the gravity vertical. The yaw
 * integral is unwrapped and only its changes are meaningful; GNSS supplies absolute heading.
 */
export class AttitudeFilter {
  constructor({
    gyroBiasDps = [0, 0, 0],
    tiltTimeConstantS = 2,
    accelGateG = 0.1,
    biasTimeConstantS = 20,
    stationarySeconds = 1.5,
  } = {}) {
    this.up = [0, 0, 1];
    this.initialized = false;
    this.gyroBiasDps = [...gyroBiasDps];
    this.yawDeg = 0;
    this.yawRateDps = 0;
    this.tiltTimeConstantS = tiltTimeConstantS;
    this.accelGateG = accelGateG;
    this.biasTimeConstantS = biasTimeConstantS;
    this.stationarySeconds = stationarySeconds;
    this.speedMps = null;
    this.stillForS = 0;
    this.stationary = false;
    this.gyroMean = [0, 0, 0];
    this.gyroVariance = 0;
    this.accelMean = [0, 0, 1];
    this.accelVariance = 0;
    this.accelCorrections = 0;
    this.accelRejections = 0;
  }

  /** gyroDps and accelG are vehicle-frame (FLU) vectors; speedMps is signed forward speed or null. */
  update(gyroDps, accelG, dt) {
    if (!(dt > 0)) return;
    if (!this.initialized) {
      if (norm(accelG) < 0.5) return;
      this.up = normalize(accelG);
      this.accelMean = [...accelG];
      this.gyroMean = [...gyroDps];
      this.initialized = true;
      return;
    }

    const statsK = Math.min(1, dt / 0.5);
    const gyroDeviation = sub(gyroDps, this.gyroMean);
    this.gyroMean = add(this.gyroMean, scale(gyroDeviation, statsK));
    this.gyroVariance += (dot(gyroDeviation, gyroDeviation) - this.gyroVariance) * statsK;
    const accelDeviation = sub(accelG, this.accelMean);
    this.accelMean = add(this.accelMean, scale(accelDeviation, statsK));
    this.accelVariance += (dot(accelDeviation, accelDeviation) - this.accelVariance) * statsK;

    const correctedDps = sub(gyroDps, this.gyroBiasDps);
    const quiet = Math.sqrt(this.gyroVariance) < 0.6 && Math.sqrt(this.accelVariance) < 0.03 &&
      norm(correctedDps) < 3 && (this.speedMps === null || Math.abs(this.speedMps) < 0.15);
    this.stillForS = quiet ? this.stillForS + dt : 0;
    this.stationary = this.stillForS >= this.stationarySeconds;
    if (this.stationary) {
      // Zero-angular-rate update: a parked vehicle's mean gyro output is bias.
      const k = Math.min(1, dt / this.biasTimeConstantS);
      this.gyroBiasDps = add(this.gyroBiasDps, scale(sub(gyroDps, this.gyroBiasDps), k));
    }

    const omega = scale(sub(gyroDps, this.gyroBiasDps), RAD);
    this.up = normalize(add(this.up, scale(cross(this.up, omega), dt)));

    const upRate = dot(omega, this.up);
    const speed = this.speedMps ?? 0;
    // Remove turning centripetal acceleration so tilt does not lean into turns.
    const measuredUp = sub(accelG, [0, (speed * upRate) / STANDARD_GRAVITY, 0]);
    const magnitude = norm(measuredUp);
    if (Math.abs(magnitude - 1) < this.accelGateG) {
      const k = Math.min(1, dt / this.tiltTimeConstantS);
      this.up = normalize(add(this.up, scale(sub(scale(measuredUp, 1 / magnitude), this.up), k)));
      this.accelCorrections += 1;
    } else {
      this.accelRejections += 1;
    }

    // Heading is clockwise, the opposite sense to a positive rotation about up.
    this.yawRateDps = this.stationary ? 0 : -upRate / RAD;
    this.yawDeg += this.yawRateDps * dt;
  }
}

/** Tracks the delivered sample rate so FIFO samples integrate with the sensor's real clock. */
export class SampleRateEstimator {
  constructor(nominalHz, { windowMs = 1000, timeConstantS = 5 } = {}) {
    this.nominalHz = nominalHz;
    this.rateHz = nominalHz;
    this.windowMs = windowMs;
    this.timeConstantS = timeConstantS;
    this.windowStart = null;
    this.windowSamples = 0;
  }

  reset() {
    this.windowStart = null;
    this.windowSamples = 0;
  }

  add(samples, nowMs) {
    if (this.windowStart === null) {
      this.windowStart = nowMs;
      this.windowSamples = 0;
      return this.rateHz;
    }
    this.windowSamples += samples;
    const elapsedMs = nowMs - this.windowStart;
    if (elapsedMs >= this.windowMs) {
      const measured = this.windowSamples / (elapsedMs / 1000);
      const bounded = Math.max(this.nominalHz * 0.85, Math.min(this.nominalHz * 1.15, measured));
      this.rateHz += (bounded - this.rateHz) * Math.min(1, elapsedMs / 1000 / this.timeConstantS);
      this.windowStart = nowMs;
      this.windowSamples = 0;
    }
    return this.rateHz;
  }
}

export function defaultImuCalibration() {
  return {
    version: 1,
    createdAt: null,
    gyroBiasDps: [0, 0, 0],
    mount: { rotation: IDENTITY.map(row => [...row]), rollDeg: 0, pitchDeg: 0, yawDeg: 0 },
    mag: null,
  };
}

function isMatrix3(value) {
  return Array.isArray(value) && value.length === 3 &&
    value.every(row => Array.isArray(row) && row.length === 3 && row.every(Number.isFinite));
}
const isVector3 = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);

export function normalizeImuCalibration(value) {
  const calibration = defaultImuCalibration();
  if (!value || typeof value !== "object") return calibration;
  if (isVector3(value.gyroBiasDps)) calibration.gyroBiasDps = [...value.gyroBiasDps];
  if (value.mount && isMatrix3(value.mount.rotation) && Math.abs(det3(value.mount.rotation) - 1) < 0.01) {
    calibration.mount = {
      rotation: value.mount.rotation.map(row => [...row]),
      rollDeg: Number(value.mount.rollDeg) || 0,
      pitchDeg: Number(value.mount.pitchDeg) || 0,
      yawDeg: Number(value.mount.yawDeg) || 0,
    };
  }
  if (value.mag && isVector3(value.mag.center) && isMatrix3(value.mag.matrix)) {
    calibration.mag = {
      center: [...value.mag.center],
      matrix: value.mag.matrix.map(row => [...row]),
      fieldUt: Number.isFinite(value.mag.fieldUt) ? value.mag.fieldUt : null,
      dipDeg: Number.isFinite(value.mag.dipDeg) ? value.mag.dipDeg : null,
    };
  }
  calibration.createdAt = typeof value.createdAt === "string" ? value.createdAt : null;
  return calibration;
}

export async function loadImuCalibration(path) {
  try {
    return { calibration: normalizeImuCalibration(JSON.parse(await readFile(path, "utf8"))), loaded: true, error: null };
  } catch (error) {
    const missing = error && typeof error === "object" && "code" in error && error.code === "ENOENT";
    return {
      calibration: defaultImuCalibration(),
      loaded: false,
      error: missing ? null : error instanceof Error ? error.message : String(error),
    };
  }
}

export async function saveImuCalibration(path, calibration) {
  await mkdir(dirname(path), { recursive: true });
  await copyFile(path, `${path}.bak`).catch(error => {
    if (!error || error.code !== "ENOENT") throw error;
  });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(normalizeImuCalibration(calibration), null, 2)}\n`, "utf8");
  await rename(temporary, path);
}

/** Mounting rotation that levels the averaged up vector and removes a yaw offset (CCW degrees). */
export function mountRotation(up, yawOffsetDeg = 0) {
  const level = rotationBetween(up, [0, 0, 1]);
  const rotation = matMul(rotationZ(-yawOffsetDeg), level);
  const { rollDeg, pitchDeg } = tiltFromUp(up);
  return { rotation, rollDeg, pitchDeg, yawDeg: yawOffsetDeg };
}

function solveLinear(matrix, vector) {
  const n = vector.length;
  const a = matrix.map((row, i) => [...row, vector[i]]);
  for (let column = 0; column < n; column++) {
    let pivot = column;
    for (let row = column + 1; row < n; row++) {
      if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row;
    }
    if (Math.abs(a[pivot][column]) < 1e-12) throw new Error("Calibration data is degenerate; turn through more headings.");
    [a[column], a[pivot]] = [a[pivot], a[column]];
    for (let row = 0; row < n; row++) {
      if (row === column) continue;
      const factor = a[row][column] / a[column][column];
      for (let k = column; k <= n; k++) a[row][k] -= factor * a[column][k];
    }
  }
  return a.map((row, i) => row[n] / row[i]);
}

/**
 * Fits horizontal hard/soft iron from points recorded while turning through full circles.
 * Returns a centre and 2x2 matrix mapping the ellipse onto a circle of the mean radius.
 */
export function fitHorizontalEllipse(points) {
  if (points.length < 20) throw new Error("At least 20 magnetometer samples are required.");
  const meanX = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const meanY = points.reduce((sum, p) => sum + p[1], 0) / points.length;
  const spread = Math.sqrt(points.reduce((sum, p) => sum + (p[0] - meanX) ** 2 + (p[1] - meanY) ** 2, 0) / points.length) || 1;
  // Normalising first keeps the conic normal equations well conditioned.
  const normal = Array.from({ length: 5 }, () => [0, 0, 0, 0, 0]);
  const rhs = [0, 0, 0, 0, 0];
  for (const [rawX, rawY] of points) {
    const x = (rawX - meanX) / spread;
    const y = (rawY - meanY) / spread;
    const row = [x * x, x * y, y * y, x, y];
    for (let i = 0; i < 5; i++) {
      rhs[i] += row[i];
      for (let j = 0; j < 5; j++) normal[i][j] += row[i] * row[j];
    }
  }
  const [a, b, c, d, e] = solveLinear(normal, rhs);
  const m = [[a, b / 2], [b / 2, c]];
  const det = a * c - (b * b) / 4;
  if (!(det > 0) || !(a > 0)) throw new Error("Magnetometer data is not an ellipse; drive complete slow circles away from steel.");
  const cx = (-d * c + (e * b) / 2) / (2 * det);
  const cy = (-e * a + (d * b) / 2) / (2 * det);
  const k = 1 + a * cx * cx + b * cx * cy + c * cy * cy;
  const s = m.map(row => row.map(value => value / k));
  // Symmetric square root of S via its eigen decomposition.
  const trace = s[0][0] + s[1][1];
  const gap = Math.sqrt(((s[0][0] - s[1][1]) / 2) ** 2 + s[0][1] ** 2);
  const lambda1 = trace / 2 + gap;
  const lambda2 = trace / 2 - gap;
  if (!(lambda2 > 0)) throw new Error("Magnetometer ellipse fit is unstable; record more varied headings.");
  const angle = Math.abs(s[0][1]) < 1e-15 && s[0][0] >= s[1][1] ? 0 : Math.atan2(lambda1 - s[0][0], s[0][1]);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const r1 = Math.sqrt(lambda1);
  const r2 = Math.sqrt(lambda2);
  const sqrtS = [
    [cosA * cosA * r1 + sinA * sinA * r2, cosA * sinA * (r1 - r2)],
    [cosA * sinA * (r1 - r2), sinA * sinA * r1 + cosA * cosA * r2],
  ];
  const radius = 1 / Math.sqrt(Math.sqrt(lambda1 * lambda2));
  const matrix = sqrtS.map(row => row.map(value => value * radius));
  const center = [meanX + cx * spread, meanY + cy * spread];
  const radii = points.map(([x, y]) => {
    const qx = (x - center[0]) / spread;
    const qy = (y - center[1]) / spread;
    return Math.hypot(matrix[0][0] * qx + matrix[0][1] * qy, matrix[1][0] * qx + matrix[1][1] * qy);
  });
  const residualRms = Math.sqrt(radii.reduce((sum, r) => sum + (r - radius) ** 2, 0) / radii.length) / radius;
  return { center, matrix, radius: radius * spread, residualRms, axisRatio: Math.sqrt(lambda1 / lambda2) };
}

/**
 * Converts sensor-frame samples to vehicle frame and maintains attitude, gyro bias and
 * magnetometer heading for the IMU service.
 */
export class ImuProcessor {
  constructor({
    axisMap = DEFAULT_AXIS_MAP,
    magAxisMap = axisMap,
    calibration = defaultImuCalibration(),
    nominalRateHz = 208,
    tiltTimeConstantS = 2,
  } = {}) {
    this.calibration = normalizeImuCalibration(calibration);
    this.imuMatrix = matMul(this.calibration.mount.rotation, axisMatrix(axisMap));
    this.magMatrix = matMul(this.calibration.mount.rotation, axisMatrix(magAxisMap));
    this.attitude = new AttitudeFilter({ gyroBiasDps: this.calibration.gyroBiasDps, tiltTimeConstantS });
    this.rate = new SampleRateEstimator(nominalRateHz);
    this.disturbance = new MagDisturbance(this.calibration.mag);
    this.samples = 0;
    this.lastSampleAtMs = null;
    this.lastAccelG = null;
    this.mag = null;
    this.lastMagAtMs = null;
    this.speed = { mps: null, atMs: null };
  }

  setSpeed(speedMps, atMs) {
    this.speed = { mps: Number.isFinite(speedMps) ? speedMps : null, atMs };
  }

  resetRate() {
    this.rate.reset();
  }

  /** samples: [{ gyroDps: [x, y, z], accelG: [x, y, z] }] in sensor axes, oldest first. */
  addImuSamples(samples, nowMs) {
    const rateHz = this.rate.add(samples.length, nowMs);
    const dt = 1 / rateHz;
    this.attitude.speedMps = this.speed.mps !== null && nowMs - this.speed.atMs < 2000 ? this.speed.mps : null;
    for (const sample of samples) {
      const accel = matVec(this.imuMatrix, sample.accelG);
      this.lastAccelG = accel;
      this.attitude.update(matVec(this.imuMatrix, sample.gyroDps), accel, dt);
      this.samples += 1;
    }
    if (samples.length) this.lastSampleAtMs = nowMs;
  }

  /** Converts a raw sensor-axis field (µT) into the calibrated vehicle-frame field. */
  vehicleField(rawUt) {
    const field = matVec(this.magMatrix, rawUt);
    const mag = this.calibration.mag;
    return mag ? matVec(mag.matrix, sub(field, mag.center)) : field;
  }

  addMag(rawUt, nowMs) {
    if (!this.attitude.initialized) return;
    const dt = this.lastMagAtMs === null ? 0 : Math.max(0, (nowMs - this.lastMagAtMs) / 1000);
    this.lastMagAtMs = nowMs;
    const heading = magneticHeading(this.vehicleField(rawUt), this.attitude.up);
    this.mag = heading
      ? { ...heading, disturbance: this.disturbance.update(heading.fieldUt, heading.dipDeg, dt), atMs: nowMs }
      : null;
  }

  snapshot(nowMs) {
    const { rollDeg, pitchDeg } = tiltFromUp(this.attitude.up);
    const round = (value, digits = 3) => Number.isFinite(value) ? Number(value.toFixed(digits)) : null;
    const magFresh = this.mag && nowMs - this.mag.atMs < 1000;
    return {
      initialized: this.attitude.initialized,
      sampleAtMs: this.lastSampleAtMs,
      samples: this.samples,
      sampleRateHz: round(this.rate.rateHz, 2),
      stationary: this.attitude.stationary,
      attitude: {
        rollDeg: round(rollDeg, 2),
        pitchDeg: round(pitchDeg, 2),
        yawDeg: round(this.attitude.yawDeg, 4),
        yawRateDps: round(this.attitude.yawRateDps, 3),
      },
      accelG: this.lastAccelG?.map(value => round(value, 4)) ?? null,
      gyroBiasDps: this.attitude.gyroBiasDps.map(value => round(value, 4)),
      mag: magFresh ? {
        headingDeg: round(this.mag.headingDeg, 2),
        fieldUt: round(this.mag.fieldUt, 2),
        dipDeg: round(this.mag.dipDeg, 2),
        disturbance: round(this.mag.disturbance, 3),
        calibrated: this.calibration.mag !== null,
      } : null,
    };
  }
}
