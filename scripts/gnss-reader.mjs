#!/usr/bin/env node
import { createConnection } from "node:net";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { writeFile } from "node:fs/promises";
import { rename } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { v4 as uuidv4 } from "uuid";
import readline from 'node:readline';

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
const GNSS_POST_INTERVAL_MS = Number.parseInt(process.env.GNSS_POST_INTERVAL_MS || "1000", 10);
const GNSS_INGEST_URL = process.env.GNSS_INGEST_URL || "http://localhost:3000/api/gnss/position";
let GNSS_INTERNAL_TOKEN = process.env.GNSS_INTERNAL_TOKEN;
const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json";
const GNSS_STATUS_FALLBACK_FILE = process.env.GNSS_STATUS_FALLBACK_FILE || "/var/tmp/agnerd-gnss-status.json";

let statusFilePathInUse = GNSS_STATUS_FILE;

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
      }
    }
  }
}

function deriveFixLabel(fixType, flags) {
  if (!Number.isFinite(fixType)) {
    return null;
  }

  const rtkFixed = (flags & 0x80) === 0x80;
  const rtkFloat = (flags & 0x40) === 0x40;

  if (rtkFixed) {
    return "RTK_FIXED";
  }

  if (rtkFloat) {
    return "RTK_FLOAT";
  }

  if (fixType === 3) {
    return "3D";
  }

  if (fixType === 2) {
    return "2D";
  }

  if (fixType === 1) {
    return "DEAD_RECKONING";
  }

  return "NO_FIX";
}

function setLatestFix(next) {
  state.status.lastReadAt = new Date().toISOString();
  state.latest = {
    timestamp: next.timestamp,
    latitude: next.latitude,
    longitude: next.longitude,
    heading: next.heading,
    speedKnots: next.speedKnots,
  };
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
    const parsed = parseNmeaRmc(line.trim());
    if (parsed) {
      state.latest = parsed;
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
    fixType: deriveFixLabel(state.ubx.fixType, state.ubx.flags),
    satellites: state.ubx.numSV,
    horizontalAccuracyMeters: state.ubx.hAccMeters,
    verticalAccuracyMeters: state.ubx.vAccMeters,
  };

  try {
    const response = await fetch(GNSS_INGEST_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(GNSS_INTERNAL_TOKEN ? { "x-gnss-token": GNSS_INTERNAL_TOKEN } : {}),
      },
      body: JSON.stringify(payload),
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

const serialPort = GNSS_SOURCE === "serial" ? startSerialReader() : null;
const stopGpsdReader = GNSS_SOURCE === "gpsd" ? startGpsdReader() : null;

setInterval(() => {
  postLatest().catch((error) => {
    console.error(`Unexpected post error: ${error instanceof Error ? error.message : String(error)}`);
  });
}, GNSS_POST_INTERVAL_MS);

setInterval(() => {
  writeStatusFile().catch((error) => {
    console.error(`Unexpected status write error: ${error instanceof Error ? error.message : String(error)}`);
  });
}, GNSS_POST_INTERVAL_MS);

process.on("SIGINT", async () => {
  console.log("Shutting down GNSS reader...");
  if (typeof stopGpsdReader === "function") {
    stopGpsdReader();
  }
  if (serialPort && serialPort.isOpen) {
    await new Promise((resolve) => serialPort.close(resolve));
  }
  process.exit(0);
});
