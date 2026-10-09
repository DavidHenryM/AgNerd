export const FIX_METADATA_TTL_MS = 5000;

const GGA_FIX_LABELS = [
  "NO_FIX", "GPS", "DGPS", "PPS", "RTK_FIXED", "RTK_FLOAT",
  "DEAD_RECKONING", "MANUAL", "SIMULATION",
];

function sentenceFields(line, type) {
  if (!new RegExp(`^\\$[A-Z]{2}${type},`).test(line)) return null;
  const match = line.match(/^\$([^*]+)\*([0-9a-f]{2})$/i);
  if (!match) throw new Error(`${type} sentence is missing a valid checksum`);
  let checksum = 0;
  for (const character of match[1]) checksum ^= character.charCodeAt(0);
  if (checksum !== Number.parseInt(match[2], 16)) throw new Error(`${type} checksum mismatch`);
  return match[1].split(",");
}

function optionalNumber(fields, index, type, integer = false) {
  const value = fields[index];
  if (value === "") return null;
  if (!(integer ? /^\d+$/ : /^\d+(?:\.\d+)?$/).test(value) || !Number.isFinite(Number(value))) {
    throw new Error(`${type} sentence has an invalid numeric field at index ${index}`);
  }
  return Number(value);
}

export function parseNmeaGga(line, now = Date.now()) {
  const fields = sentenceFields(line, "GGA");
  if (!fields) return null;
  if (fields.length < 15 || !/^[0-8]$/.test(fields[6])) {
    throw new Error("GGA sentence has invalid fix quality or missing fields");
  }
  const quality = Number(fields[6]);
  return {
    quality,
    fixType: GGA_FIX_LABELS[quality],
    satellites: optionalNumber(fields, 7, "GGA", true),
    hdop: optionalNumber(fields, 8, "GGA"),
    correctionAgeSeconds: optionalNumber(fields, 13, "GGA"),
    lastGgaAt: new Date(now).toISOString(),
  };
}

export function parseNmeaGst(line, now = Date.now()) {
  const fields = sentenceFields(line, "GST");
  if (!fields) return null;
  if (fields.length !== 9) throw new Error("GST sentence has missing or extra fields");
  const latitudeSigmaMeters = optionalNumber(fields, 6, "GST");
  const longitudeSigmaMeters = optionalNumber(fields, 7, "GST");
  const altitudeSigmaMeters = optionalNumber(fields, 8, "GST");
  return {
    latitudeSigmaMeters,
    longitudeSigmaMeters,
    altitudeSigmaMeters,
    // Horizontal RMS error from the two receiver-reported axis standard deviations.
    horizontalAccuracyMeters: latitudeSigmaMeters !== null && longitudeSigmaMeters !== null
      ? Math.hypot(latitudeSigmaMeters, longitudeSigmaMeters) : null,
    verticalAccuracyMeters: altitudeSigmaMeters,
    lastGstAt: new Date(now).toISOString(),
  };
}

function isFresh(timestamp, now) {
  if (!timestamp) return false;
  const age = now - Date.parse(timestamp);
  return Number.isFinite(age) && age >= 0 && age <= FIX_METADATA_TTL_MS;
}

export function deriveUbxFixLabel(fixType, flags) {
  if (!Number.isFinite(fixType)) return null;
  if (Number.isFinite(flags)) {
    if ((flags & 1) === 0) return "NO_FIX";
    const carrierSolution = (flags >> 6) & 3;
    if (carrierSolution === 2) return "RTK_FIXED";
    if (carrierSolution === 1) return "RTK_FLOAT";
  }
  if (fixType === 3) return "3D";
  if (fixType === 2) return "2D";
  if (fixType === 1) return "DEAD_RECKONING";
  return "NO_FIX";
}

export function resolveFixMetadata(state, source, now = Date.now()) {
  const freshGga = source === "serial" && isFresh(state.nmea?.lastGgaAt, now);
  const freshUbx = source !== "serial" || isFresh(state.lastUbxAt, now);
  const freshGst = source === "serial" && isFresh(state.gst?.lastGstAt, now)
    && freshGga && state.nmea.quality >= 1 && state.nmea.quality <= 5;
  return {
    fixType: freshGga ? state.nmea.fixType : freshUbx ? deriveUbxFixLabel(state.ubx.fixType, state.ubx.flags) : null,
    satellites: freshGga ? state.nmea.satellites : freshUbx ? state.ubx.numSV : null,
    horizontalAccuracyMeters: freshUbx && state.ubx.hAccMeters !== null
      ? state.ubx.hAccMeters : freshGst ? state.gst.horizontalAccuracyMeters : null,
    verticalAccuracyMeters: freshUbx && state.ubx.vAccMeters !== null
      ? state.ubx.vAccMeters : freshGst ? state.gst.verticalAccuracyMeters : null,
  };
}
