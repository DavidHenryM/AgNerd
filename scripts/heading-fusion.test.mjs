import assert from "node:assert/strict";
import test from "node:test";
import { HeadingFusion, buildGnssDisplay } from "./heading-fusion.mjs";

const close = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message ?? ""} expected ${expected} ± ${tolerance}, got ${actual}`);
const angleClose = (actual, expected, tolerance, message) =>
  close(((actual - expected + 540) % 360) - 180, 0, tolerance, message);

function imuStatus(atMs, yawDeg, extra = {}) {
  return {
    healthy: true,
    startedAt: "start-1",
    updatedAtMs: atMs,
    sampleAtMs: atMs,
    attitude: { rollDeg: 1.5, pitchDeg: -2, yawDeg, yawRateDps: extra.yawRateDps ?? 0 },
    stationary: false,
    mag: extra.mag ?? null,
  };
}

await test("GNSS-only heading follows course above the minimum speed", () => {
  const fusion = new HeadingFusion();
  assert.equal(fusion.snapshot(0).headingSource, "none");
  fusion.updateGnss({ courseDeg: 40, speedMps: 0.5 }, 0);
  assert.equal(fusion.snapshot(0).headingDeg, null, "slow course is ignored");
  fusion.updateGnss({ courseDeg: 40, speedMps: 3 }, 100);
  fusion.updateGnss({ courseDeg: 80, speedMps: 3 }, 200);
  const snapshot = fusion.snapshot(200);
  assert.equal(snapshot.headingDeg, 80);
  assert.equal(snapshot.headingSource, "gnss");
  assert.equal(snapshot.imu.state, "missing");
  assert.equal(snapshot.rollDeg, null);
});

await test("gyro propagates heading between GNSS fixes and keeps it while stopped", () => {
  const fusion = new HeadingFusion({ magEnabled: false });
  fusion.updateImu(imuStatus(0, 1000), 0);
  fusion.updateGnss({ courseDeg: 350, speedMps: 4, courseAccDeg: 1 }, 0);
  // Turn right 30 degrees over 3 s between fixes; yaw is an unwrapped integral.
  for (let t = 50; t <= 3000; t += 50) fusion.updateImu(imuStatus(t, 1000 + t / 100, { yawRateDps: 10 }), t);
  let snapshot = fusion.snapshot(3000);
  angleClose(snapshot.headingDeg, 20, 0.01, "heading wraps through north");
  assert.equal(snapshot.headingSource, "gnss+imu");
  assert.equal(snapshot.yawRateDps, 10);
  assert.equal(snapshot.rollDeg, 1.5);
  // Stopped: no usable course, the gyro holds heading.
  fusion.updateGnss({ courseDeg: 200, speedMps: 0 }, 3100);
  for (let t = 3100; t <= 10000; t += 50) fusion.updateImu(imuStatus(t, 1030), t);
  snapshot = fusion.snapshot(10000);
  angleClose(snapshot.headingDeg, 20, 0.01);
  assert.equal(snapshot.headingSource, "imu");
  assert.equal(snapshot.direction, "stationary");
  assert.ok(snapshot.headingStdDeg > 1 && snapshot.headingStdDeg < 5, `uncertainty grows slowly (${snapshot.headingStdDeg})`);
});

await test("reversing is detected and sustained fast reversing flips a backwards initialisation", () => {
  const fusion = new HeadingFusion({ magEnabled: false });
  fusion.updateImu(imuStatus(0, 0), 0);
  fusion.updateGnss({ courseDeg: 90, speedMps: 3, courseAccDeg: 1 }, 0);
  let t = 0;
  const step = (course, speed) => {
    t += 100;
    fusion.updateImu(imuStatus(t, 0), t);
    fusion.updateGnss({ courseDeg: course, speedMps: speed, courseAccDeg: 1 }, t);
  };
  step(270, 1.2);
  let snapshot = fusion.snapshot(t);
  assert.equal(snapshot.direction, "reverse");
  angleClose(snapshot.headingDeg, 90, 0.5, "body heading stays forward while reversing");
  const display = buildGnssDisplay({ seq: 1, nowMs: t, latest: { latitude: 1, longitude: 2, speedKnots: 1.2 / 0.514444, timestamp: "x" }, latestReceivedAtMs: t, fixType: "3D", fusion });
  close(display.speedMps, -1.2, 0.001, "reverse speed is signed");
  while (t < 22000) step(270, 2);
  snapshot = fusion.snapshot(t);
  assert.equal(snapshot.direction, "forward");
  angleClose(snapshot.headingDeg, 270, 0.5);
});

await test("a stopped receiver's opposite course does not reverse fused heading, with or without an IMU", () => {
  for (const useImu of [false, true]) {
    const fusion = new HeadingFusion({ magEnabled: false });
    if (useImu) fusion.updateImu(imuStatus(0, 0), 0);
    fusion.updateGnss({ courseDeg: 90, speedMps: 2 }, 0);
    for (let t = 100; t <= 3000; t += 100) {
      if (useImu) fusion.updateImu({ ...imuStatus(t, 0), stationary: true }, t);
      fusion.updateGnss({ courseDeg: 270, speedMps: t < 500 ? 0.5 : 0 }, t);
      angleClose(fusion.snapshot(t).headingDeg, 90, 0.01);
    }
    assert.equal(fusion.snapshot(3000).direction, "stationary");
  }
});

await test("magnetometer initialises heading, learns its offset and is gated when disturbed", () => {
  const fusion = new HeadingFusion({ initialMagOffsetDeg: 0 });
  const mag = (headingDeg, disturbance = 0) => ({ headingDeg, disturbance, fieldUt: 55, dipDeg: -65, calibrated: true });
  fusion.updateImu(imuStatus(0, 0, { mag: mag(100) }), 0);
  let snapshot = fusion.snapshot(0);
  assert.equal(snapshot.headingDeg, 100);
  assert.equal(snapshot.headingSource, "imu+mag");
  assert.ok(snapshot.headingStdDeg > 25, "mag-only heading starts uncertain");
  // True heading is 110 (mag reads 10 low because of declination and mount yaw).
  let t = 0;
  for (let i = 0; i < 300; i++) {
    t += 200;
    fusion.updateImu(imuStatus(t, 0, { mag: mag(100) }), t);
    fusion.updateGnss({ courseDeg: 110, speedMps: 3, courseAccDeg: 0.5 }, t);
  }
  snapshot = fusion.snapshot(t);
  angleClose(snapshot.headingDeg, 110, 0.5);
  close(snapshot.mag.offsetDeg, 10, 1, "offset learned");
  assert.ok(snapshot.mag.offsetStdDeg < 3);
  const learned = fusion.exportState();
  // Disturbed and outlier readings must not pull heading.
  for (let i = 0; i < 20; i++) {
    t += 200;
    fusion.updateImu(imuStatus(t, 0, { mag: mag(170, 3) }), t);
  }
  t += 200;
  fusion.updateImu(imuStatus(t, 0, { mag: mag(300) }), t);
  angleClose(fusion.snapshot(t).headingDeg, 110, 0.5);
  assert.equal(fusion.snapshot(t).mag.used, false);
  const restored = new HeadingFusion();
  restored.importState(learned);
  close(restored.exportState().magOffsetDeg, learned.magOffsetDeg, 1e-9);
});

await test("persistent course disagreement re-initialises heading", () => {
  const fusion = new HeadingFusion({ magEnabled: false });
  fusion.updateImu(imuStatus(0, 0), 0);
  fusion.updateGnss({ courseDeg: 0, speedMps: 3, courseAccDeg: 0.5 }, 0);
  for (let t = 100; t <= 500; t += 100) {
    fusion.updateImu(imuStatus(t, 0), t);
    fusion.updateGnss({ courseDeg: 60, speedMps: 3, courseAccDeg: 0.5 }, t);
  }
  angleClose(fusion.snapshot(500).headingDeg, 60, 0.01);
});

await test("display payload exposes fix age and stale IMU state", () => {
  const fusion = new HeadingFusion();
  fusion.updateImu(imuStatus(0, 0), 0);
  fusion.updateGnss({ courseDeg: 45, speedMps: 2 }, 0);
  const display = buildGnssDisplay({
    seq: 7,
    nowMs: 1000,
    latest: { timestamp: "2026-01-01T00:00:00.000Z", latitude: -35, longitude: 147, speedKnots: 2 / 0.514444 },
    latestReceivedAtMs: 850,
    fixType: "RTK fixed",
    fusion,
  });
  assert.equal(display.version, 1);
  assert.equal(display.seq, 7);
  assert.deepEqual(display.fix, { timestamp: "2026-01-01T00:00:00.000Z", latitude: -35, longitude: 147, ageMs: 150, fixType: "RTK fixed" });
  assert.equal(display.headingSource, "gnss");
  assert.equal(display.imu.state, "stale");
  assert.equal(display.rollDeg, null);
  close(display.speedMps, 2, 0.001);
  assert.equal(buildGnssDisplay({ seq: 8, nowMs: 1000, latest: null, latestReceivedAtMs: null, fixType: null, fusion }).fix, null);
});
