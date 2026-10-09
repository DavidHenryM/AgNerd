import assert from "node:assert/strict";
import { register } from "tsx/esm/api";
import test from "node:test";

register();
const { GNSS_STATUS_TTL_MS, parseGnssFixStatus, formatGnssFixStatus } = await import("../app/lib/gnss-status.ts");
const now = Date.parse("2026-10-09T11:00:00Z");
const payload = {
  statusFileUpdatedAt: new Date(now).toISOString(),
  lastReadAt: new Date(now).toISOString(),
  fixType: "RTK_FIXED",
  satellites: 12,
  horizontalAccuracyMeters: null,
};

await test("exposes NMEA fix status and satellites without inventing accuracy", () => {
  assert.deepEqual(parseGnssFixStatus(payload, now), {
    fixType: "RTK_FIXED", satellites: 12, horizontalAccuracyMeters: null, stale: false,
  });
  for (const fixType of ["RTK_FLOAT", "GPS", "DGPS", "NO_FIX", "SIMULATION"]) {
    assert.equal(parseGnssFixStatus({ ...payload, fixType }, now).fixType, fixType);
  }
});

await test("expires both reader heartbeat and input freshness at five seconds", () => {
  assert.equal(parseGnssFixStatus(payload, now + GNSS_STATUS_TTL_MS).stale, false);
  assert.equal(parseGnssFixStatus(payload, now + GNSS_STATUS_TTL_MS + 1).fixType, null);
  for (const key of ["statusFileUpdatedAt", "lastReadAt"]) {
    const result = parseGnssFixStatus({ ...payload, [key]: new Date(now - 5001).toISOString() }, now);
    assert.equal(result.stale, true);
    assert.equal(result.fixType, null);
    assert.equal(result.satellites, null);
  }
});

await test("handles missing legacy metadata and malformed fields as unknown, not RTK", () => {
  assert.equal(parseGnssFixStatus(null, now).stale, true);
  const result = parseGnssFixStatus({ ...payload, fixType: "invalid", satellites: -1, horizontalAccuracyMeters: "0.01" }, now);
  assert.equal(result.fixType, null);
  assert.equal(result.satellites, null);
  assert.equal(result.horizontalAccuracyMeters, null);
  assert.equal(parseGnssFixStatus({ ...payload, satellites: 2.5 }, now).satellites, null);
});

await test("distinguishes fixed, float, no fix, unknown, stale and browser indicators", () => {
  assert.equal(formatGnssFixStatus("RTK_FIXED", false).label, "RTK fixed");
  assert.equal(formatGnssFixStatus("RTK_FLOAT", false).label, "RTK float");
  assert.notEqual(formatGnssFixStatus("RTK_FIXED", false).color, formatGnssFixStatus("RTK_FLOAT", false).color);
  assert.equal(formatGnssFixStatus("NO_FIX", false).label, "No fix");
  assert.equal(formatGnssFixStatus(null, false).label, "Unknown");
  assert.equal(formatGnssFixStatus("RTK_FIXED", true).label, "Stale / unavailable");
  assert.equal(formatGnssFixStatus("RTK_FIXED", false, true).label, "Browser location");
});
