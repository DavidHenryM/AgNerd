import assert from "node:assert/strict";
import test from "node:test";
import { magCalibrationFromCircles, maxStdDev, meanVector, mountFromParks, vehicleGyroBias } from "./imu-calibration.mjs";
import { mountRotation, normalize } from "./imu-fusion.mjs";

const RAD = Math.PI / 180;
const close = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message ?? ""} expected ${expected} ± ${tolerance}, got ${actual}`);

await test("averaging opposite parks separates mount tilt from ground slope", () => {
  const mountUp = normalize([Math.tan(2 * RAD), Math.tan(-3 * RAD), 1]);
  const slope = [Math.tan(4 * RAD), Math.tan(1 * RAD), 0];
  const first = normalize([mountUp[0] + slope[0], mountUp[1] + slope[1], mountUp[2]]);
  const reversed = normalize([mountUp[0] - slope[0], mountUp[1] - slope[1], mountUp[2]]);
  const mount = mountFromParks(first, reversed);
  const expected = mountRotation(mountUp);
  close(mount.pitchDeg, expected.pitchDeg, 0.05);
  close(mount.rollDeg, expected.rollDeg, 0.05);
  close(mount.groundSlopeDeg, Math.atan(Math.hypot(Math.tan(4 * RAD), Math.tan(1 * RAD))) / RAD, 0.1);
  const single = mountFromParks(first);
  assert.equal(single.groundSlopeDeg, null);
  assert.ok(single.pitchDeg > 5, "single park includes the slope");
});

await test("gyro bias is converted from sensor axes to the vehicle frame", () => {
  assert.deepEqual(vehicleGyroBias([1, 2, 3], "+z,+x,+y", mountRotation([0, 0, 1])), [3, 1, 2]);
  assert.deepEqual(meanVector([[1, 2, 3], [3, 4, 5]]), [2, 3, 4]);
  assert.equal(meanVector([]), null);
  close(maxStdDev([[0, 0, 1], [0, 0, 1.2]]), 0.1, 1e-12);
});

function circles({ turnDeg = 760, direction = 1, softIron = [[1.2, 0.15], [0.05, 0.85]], center = [15, -8] } = {}) {
  const horizontal = 24 * Math.cos(65 * RAD);
  // Southern hemisphere: the field points upwards, which is a negative dip.
  const vertical = 24 * Math.sin(65 * RAD);
  const samples = [];
  for (let heading = 0; heading <= turnDeg; heading += 4) {
    const h = heading * RAD;
    const f = horizontal * Math.cos(h);
    const l = horizontal * Math.sin(h);
    samples.push({
      field: [softIron[0][0] * f + softIron[0][1] * l + center[0], softIron[1][0] * f + softIron[1][1] * l + center[1], vertical],
      up: [0, 0, 1],
      yawDeg: direction * heading,
    });
  }
  return samples;
}

await test("magnetometer calibration from slow circles recovers field strength and dip", () => {
  const { mag, report } = magCalibrationFromCircles(circles());
  close(mag.center[0], 15, 1e-6);
  close(mag.center[1], -8, 1e-6);
  assert.equal(mag.center[2], 0);
  close(report.magTurnDeg / report.yawTurnDeg, 1, 0.05);
  assert.ok(report.residualPercent < 1e-6);
  close(mag.dipDeg, -65, 4, "dip with soft iron normalised to the mean radius");
  assert.ok(mag.fieldUt > 20 && mag.fieldUt < 30);
});

await test("magnetometer calibration rejects short turns and mirrored axes", () => {
  assert.throws(() => magCalibrationFromCircles(circles({ turnDeg: 300 })), /drive at least 400°/);
  assert.throws(() => magCalibrationFromCircles(circles({ direction: -1 })), /opposite way to the gyro/);
  assert.throws(() => magCalibrationFromCircles(circles().slice(0, 10)), /drive the circles for longer/);
});
