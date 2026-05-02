#!/usr/bin/env node
import { spawn } from "node:child_process";

const required = ["NTRIP_USER", "NTRIP_PASSWORD", "NTRIP_HOST", "NTRIP_PORT", "NTRIP_MOUNT"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const secure = (process.env.NTRIP_SECURE || "false").toLowerCase() === "true";
const scheme = secure ? "ntrips" : "ntrip";

const inUri = `${scheme}://${process.env.NTRIP_USER}:${process.env.NTRIP_PASSWORD}@${process.env.NTRIP_HOST}:${process.env.NTRIP_PORT}/${process.env.NTRIP_MOUNT}`;

const outputMode = process.env.NTRIP_OUTPUT_MODE || "serial";
let outUri = "";

if (outputMode === "serial") {
  const correctionDevice = process.env.GNSS_CORRECTION_DEVICE || process.env.GNSS_DEVICE;
  const correctionBaudrate = process.env.GNSS_CORRECTION_BAUDRATE || process.env.GNSS_BAUDRATE || "460800";

  if (!correctionDevice) {
    console.error("Set GNSS_CORRECTION_DEVICE (or GNSS_DEVICE) when NTRIP_OUTPUT_MODE=serial.");
    process.exit(1);
  }

  outUri = `serial://${correctionDevice}:${correctionBaudrate}:8:n:1:off`;
} else if (outputMode === "tcp") {
  const outHost = process.env.NTRIP_OUTPUT_HOST || "localhost";
  const outPort = process.env.NTRIP_OUTPUT_PORT || "2101";
  outUri = `tcpsvr://${outHost}:${outPort}`;
} else {
  console.error(`Unsupported NTRIP_OUTPUT_MODE: ${outputMode}. Use serial or tcp.`);
  process.exit(1);
}

console.log("Starting str2str forwarder");
console.log(`  in : ${inUri}`);
console.log(`  out: ${outUri}`);

const child = spawn("str2str", ["-in", inUri, "-out", outUri], {
  stdio: "inherit",
  shell: false,
});

child.on("error", (err) => {
  console.error(`Failed to start str2str: ${err.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`str2str exited due to signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    if (!child.killed) {
      child.kill(sig);
    }
  });
}
