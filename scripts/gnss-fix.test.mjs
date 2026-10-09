import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { FIX_METADATA_TTL_MS, deriveUbxFixLabel, parseNmeaGga, parseNmeaGst, resolveFixMetadata } from "./gnss-fix.mjs";

const now = Date.parse("2026-10-09T11:00:00Z");
function sentence(quality = 4, talker = "GN", satellites = "12", hdop = "0.7", age = "1.2") {
  const payload = `${talker}GGA,110000.00,3500.000,S,14900.000,E,${quality},${satellites},${hdop},600.0,M,0.0,M,${age},0001`;
  let checksum = 0;
  for (const character of payload) checksum ^= character.charCodeAt(0);
  return `$${payload}*${checksum.toString(16).padStart(2, "0").toUpperCase()}`;
}
function state(nmea = null) {
  return {
    nmea,
    lastUbxAt: null,
    ubx: { fixType: null, flags: null, numSV: null, hAccMeters: null, vAccMeters: null },
  };
}

function gstSentence(latitude = "0.03", longitude = "0.04", altitude = "0.08", talker = "GN") {
  const payload = `${talker}GST,110000.00,0.06,0.05,0.03,45.0,${latitude},${longitude},${altitude}`;
  let checksum = 0;
  for (const character of payload) checksum ^= character.charCodeAt(0);
  return `$${payload}*${checksum.toString(16).padStart(2, "0")}`;
}

await test("GST reports horizontal RMS and vertical sigma in metres for all talkers", () => {
  for (const talker of ["GN", "GP", "GL"]) {
    const gst = parseNmeaGst(gstSentence("0.03", "0.04", "0.08", talker), now);
    assert.equal(gst.horizontalAccuracyMeters, 0.05);
    assert.equal(gst.verticalAccuracyMeters, 0.08);
    assert.equal(gst.lastGstAt, new Date(now).toISOString());
  }
  assert.equal(parseNmeaGst(sentence()), null);
  assert.equal(parseNmeaGst(gstSentence("", "0.04", ""), now).horizontalAccuracyMeters, null);
  assert.equal(parseNmeaGst(gstSentence("", "0.04", ""), now).verticalAccuracyMeters, null);
  assert.equal(parseNmeaGst(gstSentence("0", "0", "0"), now).horizontalAccuracyMeters, 0);
});

await test("GST rejects corrupt checksums and malformed error estimates", () => {
  assert.throws(() => parseNmeaGst(gstSentence().split("*")[0]), /checksum/);
  assert.throws(() => parseNmeaGst(gstSentence().replace("0.08", "0.09")), /checksum mismatch/);
  for (const value of ["-1", "NaN", "1x"]) {
    assert.throws(() => parseNmeaGst(gstSentence(value)), /invalid numeric/);
  }
});

await test("fresh GST feeds accuracy without UBX, expires, and requires a valid live GGA fix", () => {
  const current = state(parseNmeaGga(sentence(), now));
  current.gst = parseNmeaGst(gstSentence(), now);
  assert.equal(resolveFixMetadata(current, "serial", now).horizontalAccuracyMeters, 0.05);
  assert.equal(resolveFixMetadata(current, "serial", now).verticalAccuracyMeters, 0.08);
  assert.equal(resolveFixMetadata(current, "serial", now + 5000).horizontalAccuracyMeters, 0.05);
  assert.equal(resolveFixMetadata(current, "serial", now + 5001).horizontalAccuracyMeters, null);
  current.nmea = parseNmeaGga(sentence(0), now);
  assert.equal(resolveFixMetadata(current, "serial", now).horizontalAccuracyMeters, null);
  current.nmea = parseNmeaGga(sentence(4), now);
  current.lastUbxAt = new Date(now).toISOString();
  current.ubx.hAccMeters = 0.02;
  assert.equal(resolveFixMetadata(current, "serial", now).horizontalAccuracyMeters, 0.02);
  assert.equal(resolveFixMetadata(current, "serial", now).verticalAccuracyMeters, 0.08);
});

await test("maps all standard GGA quality values without requiring UBX or a position", () => {
  const labels = ["NO_FIX", "GPS", "DGPS", "PPS", "RTK_FIXED", "RTK_FLOAT", "DEAD_RECKONING", "MANUAL", "SIMULATION"];
  for (let quality = 0; quality < labels.length; quality++) {
    const parsed = parseNmeaGga(sentence(quality), now);
    assert.equal(parsed.quality, quality);
    assert.equal(parsed.fixType, labels[quality]);
    assert.equal(parsed.lastGgaAt, new Date(now).toISOString());
    assert.equal(resolveFixMetadata(state(parsed), "serial", now).fixType, labels[quality]);
  }
});

await test("supports GN, GP and other talkers and optional blank numeric fields", () => {
  for (const talker of ["GN", "GP", "GL", "GA", "GB"]) {
    const parsed = parseNmeaGga(sentence(5, talker), now);
    assert.equal(parsed.satellites, 12);
    assert.equal(parsed.hdop, 0.7);
    assert.equal(parsed.correctionAgeSeconds, 1.2);
  }
  const parsed = parseNmeaGga(sentence(0, "GN", "", "", ""), now);
  assert.equal(parsed.satellites, null);
  assert.equal(parsed.hdop, null);
  assert.equal(parsed.correctionAgeSeconds, null);
  assert.equal(parseNmeaGga("$GNRMC,ignored"), null);
});

await test("rejects missing/bad checksums, truncated fields and malformed numbers", () => {
  assert.throws(() => parseNmeaGga(sentence().split("*")[0]), /checksum/);
  assert.throws(() => parseNmeaGga(sentence().replace("600.0", "601.0")), /checksum mismatch/);
  for (const quality of ["", 9, "4x", -1]) {
    assert.throws(() => parseNmeaGga(sentence(quality)), /invalid fix quality/);
  }
  for (const [satellites, hdop, age] of [["12x", "0.7", ""], ["12", "-1", ""], ["12", "NaN", ""], ["12", "0.7", "1x"]]) {
    assert.throws(() => parseNmeaGga(sentence(4, "GN", satellites, hdop, age)), /invalid numeric/);
  }
  assert.throws(() => parseNmeaGga("$GNGGA,*56"), /checksum|missing fields/);
});

await test("GGA transitions from fixed to float to no fix immediately, even with UBX", () => {
  const current = state();
  current.ubx = { fixType: 3, flags: 129, numSV: 20, hAccMeters: 0.02, vAccMeters: 0.04 };
  current.lastUbxAt = new Date(now).toISOString();
  for (const [quality, label] of [[4, "RTK_FIXED"], [5, "RTK_FLOAT"], [0, "NO_FIX"]]) {
    current.nmea = parseNmeaGga(sentence(quality), now);
    const metadata = resolveFixMetadata(current, "serial", now);
    assert.equal(metadata.fixType, label);
    assert.equal(metadata.satellites, 12);
    assert.equal(metadata.horizontalAccuracyMeters, 0.02);
  }
});

await test("expires stale quality at the exact freshness boundary instead of retaining RTK", () => {
  const current = state(parseNmeaGga(sentence(), now));
  assert.equal(resolveFixMetadata(current, "serial", now + FIX_METADATA_TTL_MS).fixType, "RTK_FIXED");
  const metadata = resolveFixMetadata(current, "serial", now + FIX_METADATA_TTL_MS + 1);
  assert.deepEqual(metadata, { fixType: null, satellites: null, horizontalAccuracyMeters: null, verticalAccuracyMeters: null });
  assert.equal(resolveFixMetadata(current, "serial", now - 1).fixType, null);
  current.nmea.lastGgaAt = "invalid";
  assert.equal(resolveFixMetadata(current, "serial", now).fixType, null);
});

await test("uses fresh UBX as fallback and preserves GPSD metadata behavior", () => {
  const current = state(parseNmeaGga(sentence(), now - FIX_METADATA_TTL_MS - 1));
  current.ubx = { fixType: 3, flags: 65, numSV: 10, hAccMeters: 0.4, vAccMeters: 0.8 };
  current.lastUbxAt = new Date(now).toISOString();
  assert.equal(resolveFixMetadata(current, "serial", now).fixType, "RTK_FLOAT");
  current.lastUbxAt = new Date(now - FIX_METADATA_TTL_MS - 1).toISOString();
  assert.equal(resolveFixMetadata(current, "serial", now).fixType, null);
  current.ubx.flags = null;
  assert.equal(resolveFixMetadata(current, "gpsd", now).fixType, "3D");
});

await test("HDOP is not reported as metre accuracy", () => {
  const metadata = resolveFixMetadata(state(parseNmeaGga(sentence(), now)), "serial", now);
  assert.equal(metadata.horizontalAccuracyMeters, null);
  assert.equal(metadata.verticalAccuracyMeters, null);
});

await test("UBX RTK fallback requires a valid fix and does not treat reserved flags as fixed", () => {
  assert.equal(deriveUbxFixLabel(3, 128), "NO_FIX");
  assert.equal(deriveUbxFixLabel(3, 129), "RTK_FIXED");
  assert.equal(deriveUbxFixLabel(3, 65), "RTK_FLOAT");
  assert.equal(deriveUbxFixLabel(3, 193), "3D");
});

await test("reader wires GGA to status and ingest metadata and installer deploys the helper", async () => {
  const reader = await readFile(new URL("gnss-reader.mjs", import.meta.url), "utf8");
  assert.match(reader, /parseNmeaGga\(sentence\)/);
  assert.match(reader, /if \(gga\) state\.nmea = gga/);
  assert.equal((reader.match(/\.\.\.resolveFixMetadata\(state, GNSS_SOURCE\)/g) || []).length, 2);
  const installer = await readFile(new URL("../install.sh", import.meta.url), "utf8");
  assert.match(installer, /sudo cp scripts\/gnss-fix\.mjs \/opt\/agnerd\/scripts\/gnss-fix\.mjs/);
});
