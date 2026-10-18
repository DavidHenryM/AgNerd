#!/usr/bin/env node
import { createConnection } from "node:net";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { rename } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { v4 as uuidv4 } from "uuid";
import readline from 'node:readline';
import { createCorrectionStatus, readCorrectionConfig, startCorrectionInput } from "./gnss-corrections.mjs";
import { parseNmeaGga, parseNmeaGst, resolveFixMetadata } from "./gnss-fix.mjs";
import { buildGnssDisplay, HeadingFusion } from "./heading-fusion.mjs";

let correctionConfig;
try {
  correctionConfig = readCorrectionConfig();
} catch (error) {
  console.error(`Invalid GNSS correction configuration: ${error.message}`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const required = ["GNSS_READ_DEVICE"];
const options = ["GNSS_SOURCE", "GPSD_HOST", "GPSD_PORT", "GPSD_RECONNECT_MS", "GNSS_READ_BAUDRATE", "GNSS_POST_INTERVAL_MS", "GNSS_INGEST_URL", "GNSS_INTERNAL_TOKEN", "GNSS_STATUS_FILE", "GNSS_STATUS_FALLBACK_FILE"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

for (const key of options) {
  if (!process.env[key]) {
    console.warn(`Missing optional environment variable: ${key} Using default`);
  }
}

const GNSS_SOURCE = (process.env.GNSS_SOURCE || "gpsd").toLowerCase();
const GPSD_HOST = process.env.GPSD_HOST || "127.0.0.1";
const GPSD_PORT = Number.parseInt(process.env.GPSD_PORT || "2947", 10);
const GPSD_RECONNECT_MS = Number.parseInt(process.env.GPSD_RECONNECT_MS || "3000", 10);
const GNSS_READ_DEVICE = process.env.GNSS_READ_DEVICE || process.env.GNSS_DEVICE;
const GNSS_READ_BAUDRATE = Number.parseInt(process.env.GNSS_READ_BAUDRATE || process.env.GNSS_BAUDRATE || "460800", 10);
const GNSS_POST_INTERVAL_MS = Number(process.env.GNSS_POST_INTERVAL_MS || "200");
const GNSS_INGEST_URL = process.env.GNSS_INGEST_URL || "http://localhost:3000/api/gnss/position";
let GNSS_INTERNAL_TOKEN = process.env.GNSS_INTERNAL_TOKEN;
const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json";
const GNSS_STATUS_FALLBACK_FILE = process.env.GNSS_STATUS_FALLBACK_FILE || "/var/tmp/agnerd-gnss-status.json";

// 20 Hz display publication with optional IMU heading fusion; 0 disables it.
const GNSS_DISPLAY_INTERVAL_MS = Number(process.env.GNSS_DISPLAY_INTERVAL_MS ?? "50");
const GNSS_DISPLAY_FILE = process.env.GNSS_DISPLAY_FILE || "/tmp/agnerd-gnss-display.json";
const GNSS_DISPLAY_FALLBACK_FILE = process.env.GNSS_DISPLAY_FALLBACK_FILE || "/var/tmp/agnerd-gnss-display.json";
const GNSS_IMU_ENABLED = (process.env.GNSS_IMU_ENABLED || "true").toLowerCase() !== "false";
const GNSS_IMU_STATUS_FILE = process.env.IMU_STATUS_FILE || "/tmp/agnerd-imu-status.json";
const GNSS_FUSION_STATE_FILE = process.env.GNSS_FUSION_STATE_FILE || "/var/lib/agnerd/heading-fusion.json";
const GNSS_FUSION_MIN_COURSE_SPEED_MPS = Number(process.env.GNSS_FUSION_MIN_COURSE_SPEED_MPS || "0.8");
const GNSS_FUSION_MAG_ENABLED = (process.env.GNSS_FUSION_MAG_ENABLED || "true").toLowerCase() !== "false";
const GNSS_FUSION_MAG_DECLINATION_DEG = Number(process.env.GNSS_FUSION_MAG_DECLINATION_DEG || "0");

let statusFilePathInUse = GNSS_STATUS_FILE;
let displayFilePathInUse = GNSS_DISPLAY_FILE;

if (!Number.isInteger(GNSS_DISPLAY_INTERVAL_MS) || (GNSS_DISPLAY_INTERVAL_MS !== 0 &&
  (GNSS_DISPLAY_INTERVAL_MS < 20 || GNSS_DISPLAY_INTERVAL_MS > 1000))) {
  console.error("GNSS_DISPLAY_INTERVAL_MS must be 0 (disabled) or an integer from 20 to 1000.");
  process.exit(1);
}
if (!Number.isFinite(GNSS_FUSION_MIN_COURSE_SPEED_MPS) || GNSS_FUSION_MIN_COURSE_SPEED_MPS <= 0) {
  console.error("GNSS_FUSION_MIN_COURSE_SPEED_MPS must be a positive number.");
  process.exit(1);
}
if (!Number.isFinite(GNSS_FUSION_MAG_DECLINATION_DEG) || Math.abs(GNSS_FUSION_MAG_DECLINATION_DEG) > 180) {
  console.error("GNSS_FUSION_MAG_DECLINATION_DEG must be a number from -180 to 180.");
  process.exit(1);
}

if (GNSS_SOURCE !== "gpsd" && GNSS_SOURCE !== "serial") {
  console.error(`Unsupported GNSS_SOURCE '${GNSS_SOURCE}'. Use 'gpsd' or 'serial'.`);
  process.exit(1);
}

if (GNSS_SOURCE === "serial" && !GNSS_READ_DEVICE) {
  console.error("Missing GNSS_READ_DEVICE (or GNSS_DEVICE) environment variable for serial source.");
  process.exit(1);
}

if (!Number.isFinite(GPSD_PORT) || GPSD_PORT <= 0) {
  console.error(`Invalid GPSD_PORT '${process.env.GPSD_PORT}'.`);
  process.exit(1);
}

if (!Number.isInteger(GNSS_POST_INTERVAL_MS) || GNSS_POST_INTERVAL_MS < 100 || GNSS_POST_INTERVAL_MS > 60000) {
  console.error("GNSS_POST_INTERVAL_MS must be an integer from 100 to 60000.");
  process.exit(1);
}

if (!GNSS_INTERNAL_TOKEN) {
  console.warn("No GNSS_INTERNAL_TOKEN provided. Ingest requests will be unauthenticated.");
  rl.question(`Generate a new token? (y/n) `, answer => {
    if (answer.toLowerCase() === 'y') {
      console.log("Generating new token...");
      GNSS_INTERNAL_TOKEN = uuidv4();
      console.log(`Generated new token: ${GNSS_INTERNAL_TOKEN}\n Please set this as the GNSS_INTERNAL_TOKEN environment variable in your agnerd .env file and your gnss.env file.`);
    }
    rl.close();
  });
}

const state = {
  latest: null,
  latestReceivedAtMs: null,
  display: null,
  displaySeq: 0,
  fusion: new HeadingFusion({
    minCourseSpeedMps: GNSS_FUSION_MIN_COURSE_SPEED_MPS,
    magEnabled: GNSS_FUSION_MAG_ENABLED,
    initialMagOffsetDeg: GNSS_FUSION_MAG_DECLINATION_DEG,
  }),
  nmea: null,
  gst: null,
  lastUbxAt: null,
  ubx: {
    fixType: null,
    flags: null,
    numSV: null,
    hAccMeters: null,
    vAccMeters: null,
  },
  receivingUbx: false,
  ubxBuffer: Buffer.alloc(0),
  status: {
    source: GNSS_SOURCE,
    startedAt: new Date().toISOString(),
    lastReadAt: null,
    lastPostAt: null,
    lastPostStatus: null,
    lastGpsdConnectAt: null,
    lastGpsdDisconnectAt: null,
    parseErrors: 0,
    corrections: createCorrectionStatus(correctionConfig),
  },
};

function toDecimalDegrees(raw, hemi, isLatitude) {
  if (!raw || !hemi) {
    return null;
  }

  const degreeDigits = isLatitude ? 2 : 3;
  if (raw.length <= degreeDigits) {
    return null;
  }

  const degrees = Number.parseInt(raw.slice(0, degreeDigits), 10);
  const minutes = Number.parseFloat(raw.slice(degreeDigits));

  if (!Number.isFinite(degrees) || !Number.isFinite(minutes)) {
    return null;
  }

  const decimal = degrees + minutes / 60;
  if (hemi === "S" || hemi === "W") {
    return -decimal;
  }

  return decimal;
}

function parseUtcDateTime(datePart, timePart) {
  if (!datePart || !timePart || datePart.length !== 6 || timePart.length < 6) {
    return new Date().toISOString();
  }

  const day = Number.parseInt(datePart.slice(0, 2), 10);
  const month = Number.parseInt(datePart.slice(2, 4), 10) - 1;
  const yy = Number.parseInt(datePart.slice(4, 6), 10);
  const year = yy >= 80 ? 1900 + yy : 2000 + yy;

  const hour = Number.parseInt(timePart.slice(0, 2), 10);
  const minute = Number.parseInt(timePart.slice(2, 4), 10);
  const secondsFloat = Number.parseFloat(timePart.slice(4));
  const second = Math.trunc(secondsFloat);
  const millisecond = Math.round((secondsFloat - second) * 1000);

  const dt = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
  if (Number.isNaN(dt.getTime())) {
    return new Date().toISOString();
  }

  return dt.toISOString();
}

function parseNmeaRmc(line) {
  const content = line.startsWith("$") ? line.slice(1) : line;
  const [payload] = content.split("*");
  const fields = payload.split(",");

  if (!(fields[0] === "GPRMC" || fields[0] === "GNRMC")) {
    return null;
  }

  const status = fields[2];
  if (status !== "A") {
    return null;
  }

  const latitude = toDecimalDegrees(fields[3], fields[4], true);
  const longitude = toDecimalDegrees(fields[5], fields[6], false);
  const speedKnots = Number.parseFloat(fields[7]);
  const heading = Number.parseFloat(fields[8]);
  const timestamp = parseUtcDateTime(fields[9], fields[1]);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    timestamp,
    latitude,
    longitude,
    speedKnots: Number.isFinite(speedKnots) ? speedKnots : null,
    heading: Number.isFinite(heading) ? heading : null,
  };
}

function parseUbxNavPvt(frame) {
  if (frame.length < 92) {
    return null;
  }

  const fixType = frame.readUInt8(20);
  const flags = frame.readUInt8(21);
  const numSV = frame.readUInt8(23);
  const hAccMillimeters = frame.readUInt32LE(40);
  const vAccMillimeters = frame.readUInt32LE(44);

  return {
    fixType,
    flags,
    numSV,
    hAccMeters: hAccMillimeters / 1000,
    vAccMeters: vAccMillimeters / 1000,
    speedAccMetersPerSecond: frame.readUInt32LE(68) / 1000,
    headingAccDegrees: frame.readUInt32LE(72) / 1e5,
  };
}

function checksumOk(ubxPacket) {
  const payload = ubxPacket.subarray(2, ubxPacket.length - 2);
  let ckA = 0;
  let ckB = 0;

  for (const byte of payload) {
    ckA = (ckA + byte) & 0xff;
    ckB = (ckB + ckA) & 0xff;
  }

  return ckA === ubxPacket[ubxPacket.length - 2] && ckB === ubxPacket[ubxPacket.length - 1];
}

function parseUbxFromChunk(chunk) {
  state.ubxBuffer = Buffer.concat([state.ubxBuffer, chunk]);

  while (state.ubxBuffer.length >= 8) {
    const syncIndex = state.ubxBuffer.indexOf(Buffer.from([0xb5, 0x62]));
    if (syncIndex < 0) {
      state.ubxBuffer = Buffer.alloc(0);
      return;
    }

    if (syncIndex > 0) {
      state.ubxBuffer = state.ubxBuffer.subarray(syncIndex);
    }

    if (state.ubxBuffer.length < 8) {
      return;
    }

    const payloadLength = state.ubxBuffer.readUInt16LE(4);
    const fullLength = 6 + payloadLength + 2;
    if (state.ubxBuffer.length < fullLength) {
      return;
    }

    const packet = state.ubxBuffer.subarray(0, fullLength);
    state.ubxBuffer = state.ubxBuffer.subarray(fullLength);

    if (!checksumOk(packet)) {
      state.status.parseErrors += 1;
      continue;
    }

    const classId = packet[2];
    const msgId = packet[3];
    const payload = packet.subarray(6, 6 + payloadLength);

    if (classId === 0x01 && msgId === 0x07) {
      const navPvt = parseUbxNavPvt(payload);
      if (navPvt) {
        state.ubx = navPvt;
        state.lastUbxAt = new Date().toISOString();
      }
    }
  }
}

function acceptFix(fix) {
  const now = Date.now();
  state.latest = fix;
  state.latestReceivedAtMs = now;
  const ubxFresh = state.lastUbxAt !== null && now - Date.parse(state.lastUbxAt) < 1500;
  state.fusion.updateGnss({
    courseDeg: fix.heading,
    speedMps: Number.isFinite(fix.speedKnots) ? fix.speedKnots * 0.514444 : null,
    courseAccDeg: ubxFresh ? state.ubx.headingAccDegrees : null,
  }, now);
}

function setLatestFix(next) {
  state.status.lastReadAt = new Date().toISOString();
  acceptFix({
    timestamp: next.timestamp,
    latitude: next.latitude,
    longitude: next.longitude,
    heading: next.heading,
    speedKnots: next.speedKnots,
  });
}

function parseGpsdMessage(line) {
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    state.status.parseErrors += 1;
    return;
  }

  if (!message || typeof message !== "object") {
    return;
  }

  if (message.class === "TPV") {
    const mode = Number.isFinite(message.mode) ? Number(message.mode) : null;
    const latitude = Number.isFinite(message.lat) ? Number(message.lat) : null;
    const longitude = Number.isFinite(message.lon) ? Number(message.lon) : null;
    const heading = Number.isFinite(message.track) ? Number(message.track) : null;
    const speedKnots = Number.isFinite(message.speed)
      ? Number(message.speed) * 1.9438444924406
      : null;
    const timestamp =
      typeof message.time === "string" && !Number.isNaN(Date.parse(message.time))
        ? new Date(message.time).toISOString()
        : new Date().toISOString();

    if (mode !== null) {
      state.ubx.fixType = mode;
    }
    state.ubx.hAccMeters = Number.isFinite(message.epx) ? Number(message.epx) : null;
    state.ubx.vAccMeters = Number.isFinite(message.epv) ? Number(message.epv) : null;

    if (mode !== null && mode >= 2 && latitude !== null && longitude !== null) {
      setLatestFix({
        timestamp,
        latitude,
        longitude,
        heading,
        speedKnots,
      });
    }
    return;
  }

  if (message.class === "SKY") {
    if (Number.isFinite(message.uSat)) {
      state.ubx.numSV = Number(message.uSat);
      return;
    }
    if (Array.isArray(message.satellites)) {
      state.ubx.numSV = message.satellites.filter((sat) => sat && sat.used === true).length;
    }
  }
}

function startSerialReader() {
  console.log(`Starting GNSS serial source on ${GNSS_READ_DEVICE} @ ${GNSS_READ_BAUDRATE}`);
  const port = new SerialPort({ path: GNSS_READ_DEVICE, baudRate: GNSS_READ_BAUDRATE });
  const lineParser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  lineParser.on("data", (line) => {
    state.status.lastReadAt = new Date().toISOString();
    // A binary UBX packet can precede the next NMEA sentence in this line buffer.
    const sentence = line.slice(line.lastIndexOf("$")).trim();
    try {
      const gga = parseNmeaGga(sentence);
      if (gga) state.nmea = gga;
      const gst = parseNmeaGst(sentence);
      if (gst) state.gst = gst;
    } catch (error) {
      state.status.parseErrors += 1;
      console.error(`GNSS NMEA parse error: ${error.message}`);
    }
    const parsed = parseNmeaRmc(sentence);
    if (parsed) {
      acceptFix(parsed);
    }
  });

  port.on("data", (chunk) => {
    state.receivingUbx = true;
    parseUbxFromChunk(Buffer.from(chunk));
  });

  port.on("open", () => {
    console.log("GNSS serial port opened.");
  });

  port.on("error", (error) => {
    console.error(`GNSS serial error: ${error.message}`);
  });

  return port;
}

function startGpsdReader() {
  console.log(`Starting GNSS gpsd source on ${GPSD_HOST}:${GPSD_PORT}`);

  let socket = null;
  let reconnectTimer = null;
  let buffer = "";
  let shuttingDown = false;

  function scheduleReconnect() {
    if (shuttingDown || reconnectTimer) {
      return;
    }
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, GPSD_RECONNECT_MS);
  }

  function connect() {
    socket = createConnection({ host: GPSD_HOST, port: GPSD_PORT });

    socket.on("connect", () => {
      state.status.lastGpsdConnectAt = new Date().toISOString();
      buffer = "";
      socket.write('?WATCH={"enable":true,"json":true};\n');
      console.log("Connected to gpsd.");
    });

    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        parseGpsdMessage(trimmed);
      }
    });

    socket.on("error", (error) => {
      console.error(`gpsd socket error: ${error.message}`);
    });

    socket.on("close", () => {
      state.status.lastGpsdDisconnectAt = new Date().toISOString();
      if (!shuttingDown) {
        console.error("gpsd connection closed. Reconnecting...");
        scheduleReconnect();
      }
    });
  }

  connect();

  return () => {
    shuttingDown = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      socket.destroy();
      socket = null;
    }
  };
}

async function postLatest() {
  if (!state.latest) {
    return;
  }

  const payload = {
    timestamp: state.latest.timestamp,
    latitude: state.latest.latitude,
    longitude: state.latest.longitude,
    heading: state.latest.heading,
    speedKnots: state.latest.speedKnots,
    ...resolveFixMetadata(state, GNSS_SOURCE),
  };

  try {
    const response = await fetch(GNSS_INGEST_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(GNSS_INTERNAL_TOKEN ? { "x-gnss-token": GNSS_INTERNAL_TOKEN } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    state.status.lastPostAt = new Date().toISOString();
    state.status.lastPostStatus = response.ok ? "ok" : `http_${response.status}`;

    if (!response.ok) {
      const body = await response.text();
      console.error(`GNSS ingest failed: ${response.status} ${body}`);
    }
  } catch (error) {
    state.status.lastPostAt = new Date().toISOString();
    state.status.lastPostStatus = "network_error";
    console.error(`GNSS ingest error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function buildStatusPayload(filePath) {
  return {
    ...state.status,
    latest: state.latest,
    ubx: state.ubx,
    nmea: state.nmea,
    gst: state.gst,
    ...resolveFixMetadata(state, GNSS_SOURCE),
    display: state.display,
    statusFilePath: filePath,
    statusFileUpdatedAt: new Date().toISOString(),
  };
}

async function writeStatusFileTo(filePath) {
  const payload = buildStatusPayload(filePath);
  const tempPath = `${filePath}.tmp`;
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(tempPath, JSON.stringify(payload, null, 2), "utf8");
  await rename(tempPath, filePath);
}

async function writeStatusFile() {

  try {
    await writeStatusFileTo(statusFilePathInUse);
  } catch (error) {
    const primaryError = error instanceof Error ? error.message : String(error);

    if (statusFilePathInUse !== GNSS_STATUS_FALLBACK_FILE) {
      try {
        await writeStatusFileTo(GNSS_STATUS_FALLBACK_FILE);
        statusFilePathInUse = GNSS_STATUS_FALLBACK_FILE;
        console.error(
          `Status file write failed at '${GNSS_STATUS_FILE}': ${primaryError}. ` +
          `Fell back to '${GNSS_STATUS_FALLBACK_FILE}'.`
        );
        return;
      } catch (fallbackError) {
        const fallbackMessage =
          fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        console.error(
          `Status file write failed at '${GNSS_STATUS_FILE}' (${primaryError}) and fallback ` +
          `'${GNSS_STATUS_FALLBACK_FILE}' (${fallbackMessage}).`
        );
        return;
      }
    }

    console.error(`Status file write failed at '${statusFilePathInUse}': ${primaryError}`);
  }
}

async function writeAtomic(filePath, contents) {
  const tempPath = `${filePath}.tmp`;
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(tempPath, contents, "utf8");
  await rename(tempPath, filePath);
}

let lastImuReadError = null;
async function readImuStatus() {
  try {
    const status = JSON.parse(await readFile(GNSS_IMU_STATUS_FILE, "utf8"));
    lastImuReadError = null;
    return status;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const missing = error && typeof error === "object" && "code" in error && error.code === "ENOENT";
    if (!missing && message !== lastImuReadError) console.error(`IMU status read failed: ${message}`);
    lastImuReadError = message;
    return null;
  }
}

let fusionStateSavedAt = Date.now();
async function persistFusionState(now) {
  const exported = state.fusion.exportState();
  // Only keep a magnetometer offset that GNSS has actually constrained.
  if (now - fusionStateSavedAt < 60000 || !(exported.magOffsetSigmaDeg < 5)) return;
  fusionStateSavedAt = now;
  try {
    await writeAtomic(GNSS_FUSION_STATE_FILE, `${JSON.stringify({ ...exported, savedAt: new Date(now).toISOString() })}\n`);
  } catch (error) {
    console.error(`Heading fusion state save failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function publishDisplay() {
  if (GNSS_IMU_ENABLED) state.fusion.updateImu(await readImuStatus(), Date.now());
  const now = Date.now();
  state.displaySeq += 1;
  state.display = buildGnssDisplay({
    seq: state.displaySeq,
    nowMs: now,
    latest: state.latest,
    latestReceivedAtMs: state.latestReceivedAtMs,
    fixType: resolveFixMetadata(state, GNSS_SOURCE).fixType,
    fusion: state.fusion,
  });
  const contents = JSON.stringify(state.display);
  try {
    await writeAtomic(displayFilePathInUse, contents);
  } catch (error) {
    if (displayFilePathInUse === GNSS_DISPLAY_FALLBACK_FILE) throw error;
    displayFilePathInUse = GNSS_DISPLAY_FALLBACK_FILE;
    console.error(`Display file write failed at '${GNSS_DISPLAY_FILE}': ${error instanceof Error ? error.message : String(error)}. Falling back to '${GNSS_DISPLAY_FALLBACK_FILE}'.`);
    await writeAtomic(displayFilePathInUse, contents);
  }
  await persistFusionState(now);
}

async function loadFusionState() {
  try {
    state.fusion.importState(JSON.parse(await readFile(GNSS_FUSION_STATE_FILE, "utf8")));
  } catch (error) {
    if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
      console.error(`Heading fusion state ignored: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

const serialPort = GNSS_SOURCE === "serial" ? startSerialReader() : null;
const stopGpsdReader = GNSS_SOURCE === "gpsd" ? startGpsdReader() : null;
const stopCorrections = correctionConfig && serialPort
  ? startCorrectionInput(serialPort, correctionConfig, state.status.corrections)
  : null;

let postInFlight = false;
setInterval(() => {
  if (postInFlight) return;
  postInFlight = true;
  postLatest().catch((error) => {
    console.error(`Unexpected post error: ${error instanceof Error ? error.message : String(error)}`);
  }).finally(() => { postInFlight = false; });
}, GNSS_POST_INTERVAL_MS);

let statusWriteInFlight = false;
setInterval(() => {
  if (statusWriteInFlight) return;
  statusWriteInFlight = true;
  writeStatusFile().catch((error) => {
    console.error(`Unexpected status write error: ${error instanceof Error ? error.message : String(error)}`);
  }).finally(() => { statusWriteInFlight = false; });
}, GNSS_POST_INTERVAL_MS);

if (GNSS_DISPLAY_INTERVAL_MS > 0) {
  await loadFusionState();
  let displayInFlight = false;
  setInterval(() => {
    if (displayInFlight) return;
    displayInFlight = true;
    publishDisplay().catch((error) => {
      console.error(`Display publish error: ${error instanceof Error ? error.message : String(error)}`);
    }).finally(() => { displayInFlight = false; });
  }, GNSS_DISPLAY_INTERVAL_MS);
}

let shuttingDown = false;
async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("Shutting down GNSS reader...");
  stopCorrections?.();
  if (typeof stopGpsdReader === "function") {
    stopGpsdReader();
  }
  if (serialPort && serialPort.isOpen) {
    const closeError = await new Promise((resolve) => serialPort.close(resolve));
    if (closeError) {
      console.error(`GNSS serial shutdown failed: ${closeError.message}`);
      process.exit(1);
    }
  }
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
