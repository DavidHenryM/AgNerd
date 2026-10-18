import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";

register();
const { DisplayPosePredictor, formatHeading, formatTilt, parseGnssDisplay } = await import("../app/lib/gnss-display.ts");
const { createGnssDisplayStream } = await import("../app/lib/gnss-display-stream.ts");

const M_PER_DEG = 6378137 * Math.PI / 180;
const close = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message ?? ""} expected ${expected} ± ${tolerance}, got ${actual}`);

function packet(overrides = {}) {
  return parseGnssDisplay({
    version: 1,
    seq: 1,
    publishedAtMs: 1000,
    fix: { timestamp: "2026-01-01T00:00:00.000Z", latitude: 0, longitude: 0, ageMs: 0, fixType: "RTK fixed" },
    headingDeg: 0,
    headingStdDeg: 1,
    headingSource: "gnss+imu",
    yawRateDps: 0,
    direction: "forward",
    rollDeg: 1,
    pitchDeg: -2,
    imu: { state: "ok", gyroBiasDps: 0 },
    mag: { used: true, disturbance: 0.2, offsetDeg: 10, offsetStdDeg: 2 },
    speedMps: 5,
    ...overrides,
  });
}

await test("display parser validates and normalises the reader payload", () => {
  const display = packet({ headingDeg: 370 });
  assert.equal(display.headingDeg, 10);
  assert.equal(display.imuState, "ok");
  assert.equal(display.magUsed, true);
  assert.equal(display.fix.fixType, "RTK fixed");
  assert.equal(parseGnssDisplay({ version: 2, seq: 1, publishedAtMs: 1 }), null);
  assert.equal(parseGnssDisplay(null), null);
  const degraded = packet({ fix: { latitude: 200, longitude: 0 }, headingSource: "bogus", direction: 3, imu: null });
  assert.equal(degraded.fix, null);
  assert.equal(degraded.headingSource, "none");
  assert.equal(degraded.direction, "stationary");
  assert.equal(degraded.imuState, "missing");
});

await test("predictor dead-reckons straight, reversing and turning motion with a 500 ms cap", () => {
  const predictor = new DisplayPosePredictor();
  predictor.ingest(packet({ fix: { latitude: 0, longitude: 0, ageMs: 100 } }), 0);
  let pose = predictor.pose(100);
  close(pose.latitude * M_PER_DEG, 1, 1e-6, "5 m/s for 200 ms north");
  close(pose.longitude, 0, 1e-12);
  pose = predictor.pose(900);
  close(pose.latitude * M_PER_DEG, 2.5, 1e-6, "prediction is capped at 500 ms");
  assert.equal(predictor.pose(1001), null, "stale packets stop rendering a predicted pose");

  const reverse = new DisplayPosePredictor();
  reverse.ingest(packet({ headingDeg: 90, direction: "reverse", speedMps: -2 }), 0);
  pose = reverse.pose(250);
  close(pose.longitude * M_PER_DEG, -0.5, 1e-6, "reversing moves opposite to heading");
  assert.equal(pose.headingDeg, 90);

  const turning = new DisplayPosePredictor();
  turning.ingest(packet({ yawRateDps: 90, speedMps: 2 }), 0);
  pose = turning.pose(500);
  close(pose.headingDeg, 45, 1e-9);
  const radius = 2 / (Math.PI / 2);
  close(pose.longitude * M_PER_DEG, radius * (1 - Math.cos(Math.PI / 4)), 1e-6, "arc east offset");
  close(pose.latitude * M_PER_DEG, radius * Math.sin(Math.PI / 4), 1e-6, "arc north offset");
});

await test("predictor holds still when stationary and hides untrusted heading", () => {
  const predictor = new DisplayPosePredictor();
  predictor.ingest(packet({ direction: "stationary", speedMps: 0.05, headingDeg: 33 }), 0);
  assert.deepEqual(predictor.pose(400), { latitude: 0, longitude: 0, headingDeg: 33 });
  const uncertain = new DisplayPosePredictor();
  uncertain.ingest(packet({ headingStdDeg: 60 }), 0);
  assert.deepEqual(uncertain.pose(400), { latitude: 0, longitude: 0, headingDeg: null });
  const noFix = new DisplayPosePredictor();
  assert.equal(noFix.ingest(packet({ fix: null }), 0), false);
  assert.equal(noFix.pose(0), null);
});

await test("new packets blend small corrections, snap large ones and ignore duplicates", () => {
  const predictor = new DisplayPosePredictor();
  predictor.ingest(packet({ speedMps: 0, direction: "stationary" }), 0);
  const shifted = packet({ seq: 2, publishedAtMs: 1050, speedMps: 0, direction: "stationary", fix: { latitude: 1 / M_PER_DEG, longitude: 0, ageMs: 0 } });
  assert.equal(predictor.ingest(shifted, 50), true);
  close(predictor.pose(50).latitude * M_PER_DEG, 0, 1e-9, "correction starts at the old pose");
  close(predictor.pose(300).latitude * M_PER_DEG, 1 - Math.exp(-1), 1e-6, "decays with a 250 ms time constant");
  close(predictor.pose(1050).latitude * M_PER_DEG, 1 - Math.exp(-4), 1e-6, "correction has almost fully decayed");
  assert.equal(predictor.ingest(shifted, 60), false, "duplicate sequence");
  assert.equal(predictor.ingest(packet({ seq: 3, publishedAtMs: 900 }), 70), false, "older packet from slower polling path");
  predictor.ingest(packet({ seq: 4, publishedAtMs: 1100, speedMps: 0, direction: "stationary", fix: { latitude: 10 / M_PER_DEG, longitude: 0, ageMs: 0 } }), 100);
  close(predictor.pose(100).latitude * M_PER_DEG, 10, 1e-6, "large jumps snap");
});

async function readEvents(stream, count) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (text.split("\n\n").length - 1 < count) {
    const { value, done } = await reader.read();
    if (done) break;
    text += decoder.decode(value);
  }
  reader.releaseLock();
  return text.split("\n\n").filter(Boolean);
}

await test("display stream forwards new packets once, sends keepalives and ends on logout or abort", async () => {
  const displays = [packet({ seq: 1 }), packet({ seq: 1 }), null, packet({ seq: 2, publishedAtMs: 1050 })];
  let now = 0;
  let sessionValid = true;
  const controller = new AbortController();
  const stream = createGnssDisplayStream({
    readDisplay: async () => displays.length ? displays.shift() : null,
    checkSession: async () => sessionValid,
    signal: controller.signal,
    pollIntervalMs: 1,
    keepaliveMs: 0,
    sessionCheckMs: 1000,
    now: () => now,
  });
  const events = await readEvents(stream, 5);
  assert.equal(events[0], "retry: 1000");
  assert.match(events[1], /^event: display\ndata: \{"seq":1,/);
  assert.ok(events.slice(2, 4).every(event => event === ": keepalive"), "unchanged packets are not resent");
  assert.match(events[4], /^event: display\ndata: \{"seq":2,/);
  now = 2000;
  sessionValid = false;
  const tail = await readEvents(stream, 10);
  assert.ok(tail.includes("event: unauthorized\ndata: {}"));

  const aborted = new AbortController();
  const second = createGnssDisplayStream({ readDisplay: async () => null, checkSession: async () => true, signal: aborted.signal, pollIntervalMs: 1 });
  const reader = second.getReader();
  await reader.read();
  aborted.abort();
  assert.equal((await reader.read()).done, true);
  controller.abort();
});

await test("heading and tilt text for the GPS panel", () => {
  assert.equal(formatHeading(359.6, 0.4, "gnss+imu"), "0° ±1° (GNSS + gyro)");
  assert.equal(formatHeading(91.2, 6.6, "imu+mag"), "91° ±7° (Gyro + compass)");
  assert.equal(formatHeading(null, null, "none"), "No heading");
  assert.deepEqual(formatTilt(3.04, -1.26), { text: "Roll 3.0° right down · Pitch 1.3° nose down", color: "inherit" });
  assert.equal(formatTilt(-14, 0).color, "#FFC107");
  assert.equal(formatTilt(0, 21).color, "#FF5252");
  assert.equal(formatTilt(0, 0).text, "Roll level · Pitch level");
  assert.equal(formatTilt(null, 2), null);
});
