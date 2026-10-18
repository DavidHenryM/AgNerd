import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

await test("reader publishes NMEA RTK quality to both status files and ingest without UBX", () => {
  const readerURL = new URL("gnss-reader.mjs", import.meta.url).href;
  const result = spawnSync(process.execPath, ["--experimental-test-module-mocks", "--input-type=module"], {
    encoding: "utf8",
    timeout: 15000,
    env: {
      ...process.env,
      GNSS_SOURCE: "serial",
      GNSS_READ_DEVICE: "mock-uart",
      GNSS_CORRECTIONS_ENABLED: "false",
      GNSS_INTERNAL_TOKEN: "test-only-token",
      GNSS_POST_INTERVAL_MS: "200",
      GNSS_DISPLAY_INTERVAL_MS: "0",
      NODE_OPTIONS: "",
    },
    input: `
import assert from "node:assert/strict";
import { mock } from "node:test";
import { PassThrough } from "node:stream";

const timers = [];
globalThis.setInterval = (callback, interval) => { assert.equal(interval, 200); timers.push(callback); return 0; };
const posted = [];
globalThis.fetch = async (_url, options) => {
  posted.push(JSON.parse(options.body));
  return { ok: true };
};
let status;
let blockWrite = null;
let writeCount = 0;
mock.module("node:fs/promises", { namedExports: {
  writeFile: async (_path, contents) => { writeCount++; if (blockWrite) await blockWrite; status = JSON.parse(contents); },
  readFile: async () => { throw Object.assign(new Error("missing"), { code: "ENOENT" }); },
  rename: async () => {},
  mkdir: async () => {},
} });
let serial;
class SerialPort extends PassThrough {
  constructor() {
    super();
    this.isOpen = true;
    serial = this;
    queueMicrotask(() => this.emit("open"));
  }
}
mock.module("serialport", { namedExports: { SerialPort } });
await import(${JSON.stringify(readerURL)});
assert.equal(timers.length, 2);

function nmeaSentence(payload) {
  let checksum = 0;
  for (const char of payload) checksum ^= char.charCodeAt(0);
  return "$" + payload + "*" + checksum.toString(16).padStart(2, "0") + "\\r\\n";
}
function gga(quality) {
  return nmeaSentence("GNGGA,110000.00,3500.000,S,14900.000,E," + quality + ",12,0.7,600.0,M,0.0,M,1.2,0001");
}
async function tick() {
  timers.forEach(callback => callback());
  await new Promise(resolve => setImmediate(resolve));
}

serial.write("$GNRMC,110000.00,A,3500.000,S,14900.000,E,0.0,0.0,091026,,,A*00\\r\\n");
serial.write(gga(4));
await tick();
assert.equal(status.fixType, "RTK_FIXED");
assert.equal(status.nmea.quality, 4);
assert.equal(status.satellites, 12);
assert.equal(status.ubx.fixType, null);
assert.equal(posted.at(-1).fixType, "RTK_FIXED");
assert.equal(posted.at(-1).satellites, 12);
assert.equal(posted.at(-1).horizontalAccuracyMeters, null);
assert.equal(posted.at(-1).latitude, -35);
assert.ok(status.latest);

serial.write(nmeaSentence("GNGST,110000.00,0.06,0.05,0.03,45.0,0.03,0.04,0.08"));
await tick();
assert.equal(status.horizontalAccuracyMeters, 0.05);
assert.equal(status.verticalAccuracyMeters, 0.08);
assert.equal(status.gst.latitudeSigmaMeters, 0.03);
assert.equal(posted.at(-1).horizontalAccuracyMeters, 0.05);
assert.equal(posted.at(-1).verticalAccuracyMeters, 0.08);

serial.write(gga(5));
await tick();
assert.equal(status.fixType, "RTK_FLOAT");
assert.equal(posted.at(-1).fixType, "RTK_FLOAT");
serial.write(gga(0));
await tick();
assert.equal(status.fixType, "NO_FIX");
assert.equal(posted.at(-1).fixType, "NO_FIX");
assert.equal(status.horizontalAccuracyMeters, null);

serial.write(gga(4).replace("600.0", "601.0"));
await tick();
assert.equal(status.parseErrors, 1);
assert.equal(status.nmea.quality, 0);
assert.equal(status.fixType, "NO_FIX");

const receivedAt = Date.parse(status.nmea.lastGgaAt);
Date.now = () => receivedAt + 5001;
await tick();
assert.equal(status.fixType, null);
assert.equal(posted.at(-1).fixType, null);
assert.equal(posted.at(-1).horizontalAccuracyMeters, null);
assert.equal(status.nmea.quality, 0);
let releasePost;
let postCount = 0;
globalThis.fetch = async (_url, options) => {
  postCount++;
  assert.ok(options.signal instanceof AbortSignal);
  await new Promise(resolve => { releasePost = resolve; });
  return { ok: true };
};
timers[0]();
timers[0]();
assert.equal(postCount, 1, "slow HTTP requests must not overlap at 5 Hz");
releasePost();
await new Promise(resolve => setImmediate(resolve));
timers[0]();
assert.equal(postCount, 2);
releasePost();
await new Promise(resolve => setImmediate(resolve));
let releaseWrite;
blockWrite = new Promise(resolve => { releaseWrite = resolve; });
const beforeWrites = writeCount;
timers[1]();
await new Promise(resolve => setImmediate(resolve));
const before = status;
timers[1]();
assert.equal(writeCount, beforeWrites + 1, "atomic status writes must not overlap");
releaseWrite();
blockWrite = null;
await new Promise(resolve => setImmediate(resolve));
assert.notEqual(status, before);
console.log("READER_GGA_INTEGRATION_OK");
process.exit(0);
`,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /READER_GGA_INTEGRATION_OK/);
  assert.match(result.stderr, /GNSS NMEA parse error: GGA checksum mismatch/);
});

await test("reader publishes a 20 Hz fused display block while raw fixes stay unchanged", () => {
  const readerURL = new URL("gnss-reader.mjs", import.meta.url).href;
  const result = spawnSync(process.execPath, ["--experimental-test-module-mocks", "--input-type=module"], {
    encoding: "utf8",
    timeout: 15000,
    env: {
      ...process.env,
      GNSS_SOURCE: "serial",
      GNSS_READ_DEVICE: "mock-uart",
      GNSS_CORRECTIONS_ENABLED: "false",
      GNSS_INTERNAL_TOKEN: "test-only-token",
      GNSS_POST_INTERVAL_MS: "200",
      GNSS_DISPLAY_INTERVAL_MS: "50",
      GNSS_DISPLAY_FILE: "/tmp/display.json",
      IMU_STATUS_FILE: "/tmp/imu.json",
      GNSS_FUSION_STATE_FILE: "/tmp/fusion.json",
      NODE_OPTIONS: "",
    },
    input: `
import assert from "node:assert/strict";
import { mock } from "node:test";
import { PassThrough } from "node:stream";

const timers = new Map();
globalThis.setInterval = (callback, interval) => { timers.set(interval, callback); return 0; };
globalThis.fetch = async () => ({ ok: true });
const files = new Map();
let imu = null;
mock.module("node:fs/promises", { namedExports: {
  writeFile: async (path, contents) => { files.set(path.replace(/\\.tmp$/, ""), JSON.parse(contents)); },
  readFile: async path => {
    if (path === "/tmp/imu.json" && imu) return JSON.stringify(imu);
    throw Object.assign(new Error("missing"), { code: "ENOENT" });
  },
  rename: async () => {},
  mkdir: async () => {},
} });
let serial;
class SerialPort extends PassThrough {
  constructor() { super(); this.isOpen = true; serial = this; }
}
mock.module("serialport", { namedExports: { SerialPort } });
await import(${JSON.stringify(readerURL)});
assert.deepEqual([...timers.keys()].sort((a, b) => a - b), [50, 200]);
const flush = () => new Promise(resolve => setTimeout(resolve, 5));
async function display() {
  timers.get(50)();
  await flush();
  return files.get("/tmp/display.json");
}
let start = Date.now();
function imuStatus(yawDeg, offsetMs) {
  return {
    healthy: true, startedAt: "imu-1", updatedAtMs: Date.now(), sampleAtMs: start + offsetMs,
    stationary: false, attitude: { rollDeg: 2.5, pitchDeg: -1, yawDeg, yawRateDps: 10 }, mag: null,
  };
}

let shown = await display();
assert.equal(shown.fix, null);
assert.equal(shown.headingSource, "none");
assert.equal(shown.imu.state, "missing");

imu = imuStatus(0, 0);
await display();
serial.write("$GNRMC,110000.00,A,3500.000,S,14900.000,E,5.0,90.0,091026,,,A*00\\r\\n");
await flush();
shown = await display();
assert.equal(shown.fix.latitude, -35);
assert.equal(shown.fix.longitude, 149);
assert.ok(shown.fix.ageMs >= 0 && shown.fix.ageMs < 1000);
assert.equal(shown.headingDeg, 90);
assert.equal(shown.headingSource, "gnss+imu");
assert.equal(shown.rollDeg, 2.5);
assert.ok(Math.abs(shown.speedMps - 2.572) < 0.01);

imu = imuStatus(5, 500);
shown = await display();
assert.ok(Math.abs(shown.headingDeg - 95) < 0.5, "gyro yaw propagates heading between GNSS fixes");
assert.equal(shown.yawRateDps, 10);

timers.get(200)();
await flush();
const status = files.get(process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json");
assert.equal(status.latest.heading, 90, "raw course is preserved for coverage and history");
assert.equal(status.display.seq, shown.seq);
console.log("READER_DISPLAY_OK");
process.exit(0);
`,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /READER_DISPLAY_OK/);
});