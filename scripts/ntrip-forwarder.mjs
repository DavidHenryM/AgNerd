#!/usr/bin/env node
import { spawn } from "node:child_process";

function resolveInputVar(primaryKey, fallbackKey) {
  return process.env[primaryKey] || process.env[fallbackKey] || "";
}

function asBool(value, defaultValue = false) {
  if (value === undefined || value === null || value === "") return defaultValue;
  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return defaultValue;
}

const gaNtripUser = resolveInputVar("GA_NTRIP_USER", "NTRIP_USER");
const gaNtripPassword = resolveInputVar("GA_NTRIP_PASSWORD", "NTRIP_PASSWORD");
const gaNtripHost = resolveInputVar("GA_NTRIP_HOST", "NTRIP_HOST");
const gaNtripPort = resolveInputVar("GA_NTRIP_PORT", "NTRIP_PORT");
const gaNtripMount = resolveInputVar("GA_NTRIP_MOUNT", "NTRIP_MOUNT");

const secure = (process.env.GA_NTRIP_SECURE || process.env.NTRIP_SECURE || "false").toLowerCase() === "true";
const scheme = secure ? "ntrips" : "ntrip";

const useClosestNtrip = asBool(process.env.GA_NTRIP_USE_CLOSEST, true);
const closestNtripEndpoint =
  process.env.GA_NTRIP_CLOSEST_ENDPOINT ||
  process.env.GNSS_CORS_CLOSEST_ENDPOINT ||
  "http://localhost:3000/api/gnss/cors?closestNtripPath=true";

const hasFallbackConfig =
  Boolean(gaNtripUser) &&
  Boolean(gaNtripPassword) &&
  Boolean(gaNtripHost) &&
  Boolean(gaNtripPort) &&
  Boolean(gaNtripMount);

if (!useClosestNtrip && !hasFallbackConfig) {
  console.error("Missing GA_NTRIP_* configuration for static mount mode.");
  process.exit(1);
}

async function resolveClosestNtripUri() {
  const response = await fetch(closestNtripEndpoint, {
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
  if (typeof ntripPath !== "string" || !(ntripPath.startsWith("ntrip://") || ntripPath.startsWith("ntrips://"))) {
    throw new Error("closest ntrip endpoint did not return a valid result.ntripPath");
  }

  return ntripPath;
}

const fallbackInUri = hasFallbackConfig
  ? `${scheme}://${gaNtripUser}:${gaNtripPassword}@${gaNtripHost}:${gaNtripPort}/${gaNtripMount}`
  : "";

let inUri = fallbackInUri;
if (useClosestNtrip) {
  try {
    inUri = await resolveClosestNtripUri();
    console.log(`Resolved closest NTRIP URI from ${closestNtripEndpoint}`);
  } catch (error) {
    if (!hasFallbackConfig) {
      console.error(`Failed to resolve closest NTRIP URI: ${error instanceof Error ? error.message : String(error)}`);
      console.error("No static GA_NTRIP fallback config available.");
      process.exit(1);
    }
    console.warn(`Failed to resolve closest NTRIP URI, falling back to GA_NTRIP_MOUNT: ${error instanceof Error ? error.message : String(error)}`);
  }
}

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
