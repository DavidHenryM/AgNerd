// Pure calculations for the IMU calibration CLI (scripts/imu-calibrate.mjs).
import {
  axisMatrix, fitHorizontalEllipse, magneticHeading, matMul, matVec, mountRotation, normalize, wrap180,
} from "./imu-fusion.mjs";

/** Averages vectors; returns null for an empty list. */
export function meanVector(vectors) {
  if (!vectors.length) return null;
  const sum = vectors.reduce((total, v) => [total[0] + v[0], total[1] + v[1], total[2] + v[2]], [0, 0, 0]);
  return sum.map(value => value / vectors.length);
}

/** Largest per-axis standard deviation, used to reject parks where the vehicle moved. */
export function maxStdDev(vectors) {
  const mean = meanVector(vectors);
  if (!mean) return Infinity;
  return Math.max(...[0, 1, 2].map(i => Math.sqrt(vectors.reduce((sum, v) => sum + (v[i] - mean[i]) ** 2, 0) / vectors.length)));
}

/**
 * Mount tilt from one or two parks. Parking on the same spot facing opposite directions flips the
 * ground slope in the vehicle frame but not the mount tilt, so averaging cancels the slope.
 * up vectors are accelerometer means in nominal forward-left-up axes (g).
 */
export function mountFromParks(upFirst, upReversed = null, yawOffsetDeg = 0) {
  const a = normalize(upFirst);
  if (!upReversed) return { ...mountRotation(a, yawOffsetDeg), groundSlopeDeg: null };
  const b = normalize(upReversed);
  const mount = normalize([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
  const slope = [(a[0] - b[0]) / 2, (a[1] - b[1]) / 2];
  return {
    ...mountRotation(mount, yawOffsetDeg),
    groundSlopeDeg: Math.asin(Math.min(1, Math.hypot(slope[0], slope[1]))) * 180 / Math.PI,
  };
}

/** Converts a sensor-axis gyro bias into the levelled vehicle frame used by the attitude filter. */
export function vehicleGyroBias(sensorBiasDps, axisMap, mount) {
  return matVec(matMul(mount.rotation, axisMatrix(axisMap)), sensorBiasDps);
}

/**
 * Builds magnetometer hard/soft-iron calibration from samples recorded while driving slow circles.
 * samples: [{ field: [f, l, u] µT in levelled vehicle axes (uncalibrated), up: [f, l, u], yawDeg }]
 */
export function magCalibrationFromCircles(samples, { minTurnDeg = 400 } = {}) {
  if (samples.length < 50) throw new Error(`Only ${samples.length} magnetometer samples were recorded; drive the circles for longer.`);
  const yawTurnDeg = samples.at(-1).yawDeg - samples[0].yawDeg;
  if (Math.abs(yawTurnDeg) < minTurnDeg) {
    throw new Error(`The gyro measured only ${Math.abs(yawTurnDeg).toFixed(0)}° of turning; drive at least ${minTurnDeg}° (more than one full circle).`);
  }
  const fit = fitHorizontalEllipse(samples.map(sample => [sample.field[0], sample.field[1]]));
  if (fit.residualRms > 0.08) {
    throw new Error(`Magnetometer readings were inconsistent (${(fit.residualRms * 100).toFixed(1)}% fit error); recalibrate away from steel sheds, fences and other vehicles.`);
  }
  const center = [fit.center[0], fit.center[1], 0];
  const matrix = [[fit.matrix[0][0], fit.matrix[0][1], 0], [fit.matrix[1][0], fit.matrix[1][1], 0], [0, 0, 1]];
  const corrected = samples.map(sample => {
    const field = matVec(matrix, [sample.field[0] - center[0], sample.field[1] - center[1], sample.field[2] - center[2]]);
    const heading = magneticHeading(field, sample.up);
    return heading ? { yawDeg: sample.yawDeg, ...heading } : null;
  }).filter(sample => sample !== null);
  let magTurnDeg = 0;
  for (let i = 1; i < corrected.length; i++) magTurnDeg += wrap180(corrected[i].headingDeg - corrected[i - 1].headingDeg);
  const turnRatio = magTurnDeg / yawTurnDeg;
  if (turnRatio < 0) {
    throw new Error("Magnetometer heading turns the opposite way to the gyro. Check IMU_MAG_AXIS_MAP (try negating the forward or left axis) and calibrate again.");
  }
  if (turnRatio < 0.8 || turnRatio > 1.2) {
    throw new Error(`Magnetometer turned ${magTurnDeg.toFixed(0)}° while the gyro turned ${yawTurnDeg.toFixed(0)}°; check IMU_MAG_AXIS_MAP and avoid magnetic disturbances.`);
  }
  const fieldUt = corrected.reduce((sum, sample) => sum + sample.fieldUt, 0) / corrected.length;
  const dipDeg = corrected.reduce((sum, sample) => sum + sample.dipDeg, 0) / corrected.length;
  return {
    mag: { center, matrix, fieldUt, dipDeg },
    report: { samples: samples.length, yawTurnDeg, magTurnDeg, residualPercent: fit.residualRms * 100, axisRatio: fit.axisRatio, fieldUt, dipDeg },
  };
}
