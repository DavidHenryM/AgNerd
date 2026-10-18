import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  AttitudeFilter, ImuProcessor, MagDisturbance, axisMatrix, fitHorizontalEllipse, loadImuCalibration,
  magneticHeading, matVec, mountRotation, saveImuCalibration, tiltFromUp, wrap180,
} from "./imu-fusion.mjs";

const RAD = Math.PI / 180;
const close = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message ?? ""} expected ${expected} ± ${tolerance}, got ${actual}`);

/** Earth field in world ENU (µT) for south-eastern Australia: dip about -65°. */
const WORLD_FIELD = [0, 24 * Math.cos(-65 * RAD), 24 * Math.sin(65 * RAD)].map(v => v);
/** World ENU vector expressed in vehicle FLU for a level vehicle with clockwise heading h. */
function worldToVehicle([east, north, up], headingDeg) {
  const h = headingDeg * RAD;
  return [east * Math.sin(h) + north * Math.cos(h), -east * Math.cos(h) + north * Math.sin(h), up];
}

await test("default axis map turns x-left, y-up, z-forward sensor axes into forward-left-up", () => {
  const matrix = axisMatrix("+z,+x,+y");
  assert.deepEqual(matVec(matrix, [0.2, 0.9, 0.1]), [0.1, 0.2, 0.9]);
  assert.throws(() => axisMatrix("+z,+y,+x"), /right-handed/);
  assert.throws(() => axisMatrix("+z,+x"), /forward,left,up/);
});

await test("default mounting uses sensor Y for yaw: left decreases compass heading and right increases it", () => {
  for (const [sensorYawRate, expected] of [[10, -30], [-10, 30]]) {
    const processor = new ImuProcessor();
    processor.setSpeed(2, 0);
    processor.addImuSamples([{ gyroDps: [0, 0, 0], accelG: [0, 1, 0] }], 0);
    for (let i = 1; i <= 624; i++) {
      processor.addImuSamples([{ gyroDps: [0, sensorYawRate, 0], accelG: [0, 1, 0] }], i * 1000 / 208);
    }
    close(processor.attitude.yawDeg, expected, 0.05);
  }
  assert.deepEqual(matVec(axisMatrix(), [0, 0, 10]), [10, 0, 0], "sensor Z is forward/roll, not vertical/yaw");
});

await test("tilt converges on gravity and parked gyro bias is learned", () => {
  const filter = new AttitudeFilter({ tiltTimeConstantS: 0.5, biasTimeConstantS: 2 });
  filter.speedMps = 0;
  const up = [Math.sin(4 * RAD), Math.sin(-3 * RAD), 1];
  const bias = [0.4, -0.3, 0.8];
  for (let i = 0; i < 208 * 20; i++) filter.update(bias, up, 1 / 208);
  const tilt = tiltFromUp(filter.up);
  close(tilt.pitchDeg, 4, 0.1, "pitch");
  close(tilt.rollDeg, -3, 0.1, "roll");
  assert.equal(filter.stationary, true);
  filter.gyroBiasDps.forEach((value, i) => close(value, bias[i], 0.02, "bias"));
  const yawBefore = filter.yawDeg;
  for (let i = 0; i < 208 * 5; i++) filter.update(bias, up, 1 / 208);
  close(filter.yawDeg, yawBefore, 0.01, "parked heading holds");
});

await test("yaw integrates about gravity and centripetal force does not tilt the estimate", () => {
  const filter = new AttitudeFilter();
  filter.update([0, 0, 0], [0, 0, 1], 1 / 208);
  filter.speedMps = 5;
  // Left turn at 10 deg/s: centripetal 5 m/s * 0.1745 rad/s to the left.
  const lateralG = (5 * 10 * RAD) / 9.80665;
  for (let i = 0; i < 208 * 9; i++) filter.update([0, 0, 10], [0, lateralG, 1], 1 / 208);
  close(filter.yawDeg, -90, 0.5, "clockwise heading decreases in a left turn");
  close(filter.yawRateDps, -10, 0.01);
  close(tiltFromUp(filter.up).rollDeg, 0, 0.2, "roll stays level through the turn");
});

await test("tilt-compensated magnetic heading and dip", () => {
  for (const heading of [0, 45, 90, 200, 315]) {
    const result = magneticHeading(worldToVehicle(WORLD_FIELD, heading), [0, 0, 1]);
    close(wrap180(result.headingDeg - heading), 0, 1e-6, `heading ${heading}`);
    close(result.dipDeg, -65, 1e-6, "southern hemisphere dip");
  }
  // Pitched 10 degrees nose-up while facing east.
  const pitch = 10 * RAD;
  const level = worldToVehicle(WORLD_FIELD, 90);
  const pitched = [level[0] * Math.cos(pitch) + level[2] * Math.sin(pitch), level[1], -level[0] * Math.sin(pitch) + level[2] * Math.cos(pitch)];
  const up = [Math.sin(pitch), 0, Math.cos(pitch)];
  close(magneticHeading(pitched, up).headingDeg, 90, 1e-6, "tilt compensation");
});

await test("disturbance rises when field strength or dip changes", () => {
  const disturbance = new MagDisturbance({ fieldUt: 50, dipDeg: -65 });
  close(disturbance.update(50, -65, 0.1), 0, 1e-9);
  assert.ok(disturbance.update(60, -65, 0.1) >= 2);
  assert.ok(disturbance.update(50, -55, 0.1) >= 2);
  const learned = new MagDisturbance();
  learned.update(48, -64, 0.1);
  assert.ok(learned.update(49, -64.5, 0.1) < 1);
});

await test("ellipse fit removes hard and soft iron from horizontal turns", () => {
  const softIron = [[1.3, 0.2], [0.1, 0.8]];
  const offset = [12, -7];
  const points = [];
  for (let heading = 0; heading < 720; heading += 5) {
    const [f, l] = worldToVehicle(WORLD_FIELD, heading);
    points.push([softIron[0][0] * f + softIron[0][1] * l + offset[0], softIron[1][0] * f + softIron[1][1] * l + offset[1]]);
  }
  const fit = fitHorizontalEllipse(points);
  close(fit.center[0], offset[0], 1e-6);
  close(fit.center[1], offset[1], 1e-6);
  assert.ok(fit.residualRms < 1e-9);
  const corrected = points.map(([x, y]) => {
    const dx = x - fit.center[0];
    const dy = y - fit.center[1];
    return [fit.matrix[0][0] * dx + fit.matrix[0][1] * dy, fit.matrix[1][0] * dx + fit.matrix[1][1] * dy];
  });
  const radii = corrected.map(([x, y]) => Math.hypot(x, y));
  radii.forEach(radius => close(radius, fit.radius, 1e-6));
  assert.throws(() => fitHorizontalEllipse(points.slice(0, 5)), /20 magnetometer samples/);
});

await test("processor maps mounting, removes mount tilt and reports a level vehicle", () => {
  const mountUp = [Math.sin(2 * RAD), Math.sin(3 * RAD), 1];
  const calibration = { gyroBiasDps: [0, 0, 0], mount: mountRotation(mountUp) };
  const processor = new ImuProcessor({ calibration, nominalRateHz: 208 });
  // Sensor axes: x = left, y = up, z = forward.
  const sensorAccel = [mountUp[1], mountUp[2], mountUp[0]];
  for (let t = 0; t <= 20000; t += 20) {
    processor.addImuSamples(Array.from({ length: 4 }, () => ({ gyroDps: [0, 0, 0], accelG: sensorAccel })), 1000 + t);
  }
  const snapshot = processor.snapshot(21000);
  close(snapshot.attitude.rollDeg, 0, 0.05);
  close(snapshot.attitude.pitchDeg, 0, 0.05);
  assert.equal(snapshot.initialized, true);
  assert.equal(snapshot.sampleAtMs, 21000);
  close(snapshot.sampleRateHz, 200, 0.5, "measured FIFO rate");
  const vehicleField = worldToVehicle(WORLD_FIELD, 30);
  const level = mountRotation(mountUp).rotation;
  // Undo the mount rotation to produce raw sensor-axis magnetometer readings.
  const sensorVehicle = [0, 1, 2].map(i => level[0][i] * vehicleField[0] + level[1][i] * vehicleField[1] + level[2][i] * vehicleField[2]);
  processor.addMag([sensorVehicle[1], sensorVehicle[2], sensorVehicle[0]], 21000);
  close(processor.snapshot(21000).mag.headingDeg, 30, 0.1);
  assert.equal(processor.snapshot(22500).mag, null, "stale magnetometer data is not published");
});

await test("calibration save keeps a backup and loading tolerates missing files", async () => {
  const directory = await mkdtemp(join(tmpdir(), "agnerd-imu-"));
  try {
    const path = join(directory, "nested", "imu.json");
    const missing = await loadImuCalibration(path);
    assert.equal(missing.loaded, false);
    assert.equal(missing.error, null);
    await saveImuCalibration(path, { gyroBiasDps: [0.1, 0.2, 0.3] });
    await saveImuCalibration(path, { gyroBiasDps: [1, 2, 3], mag: { center: [1, 2, 0], matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], fieldUt: 50, dipDeg: -65 } });
    const loaded = await loadImuCalibration(path);
    assert.equal(loaded.loaded, true);
    assert.deepEqual(loaded.calibration.gyroBiasDps, [1, 2, 3]);
    assert.equal(loaded.calibration.mag.fieldUt, 50);
    assert.deepEqual(JSON.parse(await readFile(`${path}.bak`, "utf8")).gyroBiasDps, [0.1, 0.2, 0.3]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
