#!/usr/bin/env node
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { writeFile } from "node:fs/promises";

const GNSS_READ_DEVICE = process.env.GNSS_READ_DEVICE || process.env.GNSS_DEVICE;
const GNSS_READ_BAUDRATE = Number.parseInt(process.env.GNSS_READ_BAUDRATE || process.env.GNSS_BAUDRATE || "460800", 10);
const GNSS_POST_INTERVAL_MS = Number.parseInt(process.env.GNSS_POST_INTERVAL_MS || "1000", 10);
const GNSS_INGEST_URL = process.env.GNSS_INGEST_URL || "http://localhost:3000/api/gnss/position";
const GNSS_INTERNAL_TOKEN = process.env.GNSS_INTERNAL_TOKEN;
const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json";

if (!GNSS_READ_DEVICE) {
  console.error("Missing GNSS_READ_DEVICE (or GNSS_DEVICE) environment variable.");
  process.exit(1);
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
    startedAt: new Date().toISOString(),
    lastReadAt: null,
    lastPostAt: null,
    lastPostStatus: null,
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

async function writeStatusFile() {
  const payload = {
    ...state.status,
    latest: state.latest,
    ubx: state.ubx,
    statusFileUpdatedAt: new Date().toISOString(),
  };

  try {
    await writeFile(GNSS_STATUS_FILE, JSON.stringify(payload, null, 2), "utf8");
  } catch (error) {
    console.error(`Status file write failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`Opening GNSS read port ${GNSS_READ_DEVICE} @ ${GNSS_READ_BAUDRATE}`);
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
  if (port.isOpen) {
    await new Promise((resolve) => port.close(resolve));
  }
  process.exit(0);
});
