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
    },
    input: `
import assert from "node:assert/strict";
import { mock } from "node:test";
import { PassThrough } from "node:stream";

const timers = [];
globalThis.setInterval = (callback) => { timers.push(callback); return 0; };
const posted = [];
globalThis.fetch = async (_url, options) => {
  posted.push(JSON.parse(options.body));
  return { ok: true };
};
let status;
mock.module("node:fs/promises", { namedExports: {
  writeFile: async (_path, contents) => { status = JSON.parse(contents); },
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

function gga(quality) {
  const payload = "GNGGA,110000.00,3500.000,S,14900.000,E," + quality + ",12,0.7,600.0,M,0.0,M,1.2,0001";
  let checksum = 0;
  for (const char of payload) checksum ^= char.charCodeAt(0);
  return "$" + payload + "*" + checksum.toString(16).padStart(2, "0") + "\\r\\n";
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

serial.write(gga(5));
await tick();
assert.equal(status.fixType, "RTK_FLOAT");
assert.equal(posted.at(-1).fixType, "RTK_FLOAT");
serial.write(gga(0));
await tick();
assert.equal(status.fixType, "NO_FIX");
assert.equal(posted.at(-1).fixType, "NO_FIX");

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
assert.equal(status.nmea.quality, 0);
console.log("READER_GGA_INTEGRATION_OK");
process.exit(0);
`,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /READER_GGA_INTEGRATION_OK/);
  assert.match(result.stderr, /GNSS NMEA parse error: GGA checksum mismatch/);
});
