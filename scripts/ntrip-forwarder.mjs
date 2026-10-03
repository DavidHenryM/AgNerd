#!/usr/bin/env node
import { spawn } from "node:child_process";

function asBool(value, defaultValue = false) {
  if (value === undefined || value === null || value === "") return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return defaultValue;
}

const required = ["GA_NTRIP_USER", "GA_NTRIP_PASSWORD", "GA_NTRIP_HOST"];
const options = [
  "GA_NTRIP_PORT",
  "GA_NTRIP_MOUNT",
  "GA_NTRIP_SECURE",
  "GA_NTRIP_USE_CLOSEST",
  "GA_NTRIP_OUTPUT_MODE",
  "GA_NTRIP_OUTPUT_DEVICE",
  "GA_NTRIP_OUTPUT_BAUDRATE",
  "GA_NTRIP_OUTPUT_HOST",
  "GA_NTRIP_OUTPUT_PORT",
  "API_BASE_URL"
];
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

const GA_NTRIP_USER = process.env.GA_NTRIP_USER;
const GA_NTRIP_PASSWORD = process.env.GA_NTRIP_PASSWORD;
const GA_NTRIP_HOST = (process.env.GA_NTRIP_HOST).trim().toLocaleLowerCase();
const GA_NTRIP_PORT = Number.parseInt(process.env.GA_NTRIP_PORT || "2101", 10);
const GA_NTRIP_MOUNT = process.env.GA_NTRIP_MOUNT;
const GA_NTRIP_USE_CLOSEST = asBool(process.env.GA_NTRIP_USE_CLOSEST, GA_NTRIP_MOUNT ? false : true);
const GA_NTRIP_OUTPUT_MODE = process.env.GA_NTRIP_OUTPUT_MODE || "serial";
const GA_NTRIP_OUTPUT_DEVICE = process.env.GA_NTRIP_OUTPUT_DEVICE || "/dev/serial0";
const GA_NTRIP_OUTPUT_BAUDRATE = Number.parseInt(process.env.GA_NTRIP_OUTPUT_BAUDRATE || "38400", 10);
const GA_NTRIP_OUTPUT_HOST = process.env.GA_NTRIP_OUTPUT_HOST || "localhost";
const GA_NTRIP_OUTPUT_PORT = Number.parseInt(process.env.GA_NTRIP_OUTPUT_PORT || "2101", 10);
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";

const scheme = "ntrip";

if (!GA_NTRIP_USE_CLOSEST && !GA_NTRIP_MOUNT) {
  console.error("Missing GA_NTRIP_MOUNT configuration for static mount mode.");
  process.exit(1);
}

async function resolveClosestNtripUri() {
  const response = await fetch(`${API_BASE_URL}/gnss/cors?closestNtripPath=true`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`closest ntrip endpoint returned ${response.status}`);
  }

  const payload = await response.json();
  const ntripPath = payload?.result?.ntripPath;
  if (typeof ntripPath !== "string" || !(ntripPath.startsWith("ntrip://") || ntripPath.startsWith("ntrip://"))) {
    throw new Error("closest ntrip endpoint did not return a valid result.ntripPath");
  }

  return ntripPath;
}

let ntripUrl = ""
let ntripUrlRedacted = "";

if (GA_NTRIP_USE_CLOSEST) {
  try {
    ntripUrl = await resolveClosestNtripUri();
    ntripUrlRedacted = ntripUrl.replace(/:(.*)@/, ":*****@");
    console.log(`Resolved closest NTRIP URI from ${ntripUrlRedacted}`);
  } catch (error) {
    if (!GA_NTRIP_MOUNT) {
      console.error(`Failed to resolve closest NTRIP URI: ${error instanceof Error ? error.message : String(error)}`);
      console.error("No static GA_NTRIP manual fallback config available.");
      process.exit(1);
    }
    console.error(`Failed to resolve closest NTRIP URI: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
} else {
  ntripUrl = `${scheme}://${GA_NTRIP_USER}:${GA_NTRIP_PASSWORD}@127.0.0.1:2101/${GA_NTRIP_MOUNT}`;
  ntripUrlRedacted = `${scheme}://${GA_NTRIP_USER}:*****@127.0.0.1:2101/${GA_NTRIP_MOUNT}`;
}


let outUri = "";

if (GA_NTRIP_OUTPUT_MODE === "serial") {
  if (!GA_NTRIP_OUTPUT_DEVICE) {
    console.error("Set GA_NTRIP_OUTPUT_DEVICE when NTRIP_OUTPUT_MODE=serial.");
    process.exit(1);
  }

  outUri = `serial://${GA_NTRIP_OUTPUT_DEVICE}:${GA_NTRIP_OUTPUT_BAUDRATE}:8:n:1:off`;
} else if (GA_NTRIP_OUTPUT_MODE === "tcp") {
  outUri = `tcpsvr://${GA_NTRIP_OUTPUT_HOST}:${GA_NTRIP_OUTPUT_PORT}`;
} else {
  console.error(`Unsupported GA_NTRIP_OUTPUT_MODE: ${GA_NTRIP_OUTPUT_MODE}. Use serial or tcp.`);
  process.exit(1);
}

console.log("Starting str2str forwarder");
console.log(`  in : ${ntripUrlRedacted}`);
console.log(`  out: ${outUri}`);

const child = spawn("str2str", ["-in", ntripUrl, "-out", outUri], {
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
