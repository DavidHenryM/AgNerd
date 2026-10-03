#!/usr/bin/env node
import net from "node:net";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { SerialPort } from "serialport";
import { connectAndStream, parseNtripUri } from "./ntrip-client.mjs";

const INITIAL_RECONNECT_MS = 1_000;
const MAX_RECONNECT_MS = 60_000;
const STABLE_CONNECTION_MS = 30_000;

function parseBoolean(name, value, defaultValue) {
  if (value === undefined || value === "") return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  throw new Error(`${name} must be true or false`);
}

function parseInteger(name, value, defaultValue, min, max) {
  if (value === undefined || value === "") return defaultValue;
  if (!/^\d+$/.test(value)) throw new Error(`${name} must be a positive integer`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${name} must be between ${min} and ${max}`);
  }
  return parsed;
}

export function readConfig(env = process.env) {
  for (const key of ["GA_NTRIP_USER", "GA_NTRIP_PASSWORD", "GA_NTRIP_HOST"]) {
    if (!env[key]?.trim()) throw new Error(`Missing required environment variable: ${key}`);
  }

  const mount = env.GA_NTRIP_MOUNT?.trim() || "";
  const secure = parseBoolean("GA_NTRIP_SECURE", env.GA_NTRIP_SECURE, true);
  const config = {
    user: env.GA_NTRIP_USER,
    password: env.GA_NTRIP_PASSWORD,
    host: env.GA_NTRIP_HOST.trim(),
    port: parseInteger("GA_NTRIP_PORT", env.GA_NTRIP_PORT, secure ? 443 : 2101, 1, 65535),
    mount,
    secure,
    useClosest: parseBoolean("GA_NTRIP_USE_CLOSEST", env.GA_NTRIP_USE_CLOSEST, !mount),
    outputMode: (env.GA_NTRIP_OUTPUT_MODE || "serial").trim().toLowerCase(),
    outputDevice: env.GA_NTRIP_OUTPUT_DEVICE?.trim() || "/dev/serial0",
    outputBaudRate: parseInteger("GA_NTRIP_OUTPUT_BAUDRATE", env.GA_NTRIP_OUTPUT_BAUDRATE, 38400, 1, 4_000_000),
    outputHost: env.GA_NTRIP_OUTPUT_HOST?.trim() || "localhost",
    outputPort: parseInteger("GA_NTRIP_OUTPUT_PORT", env.GA_NTRIP_OUTPUT_PORT, 2101, 1, 65535),
    apiBaseUrl: (env.API_BASE_URL || "http://localhost:3000/api").replace(/\/+$/, ""),
    connectTimeoutMs: parseInteger("NTRIP_CONNECT_TIMEOUT_MS", env.NTRIP_CONNECT_TIMEOUT_MS, 15_000, 1, 300_000),
  };

  if (net.isIP(config.host) === 0 && !/^(?=.{1,253}$)(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)(?:\.(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?))*\.?$/i.test(config.host)) {
    throw new Error("GA_NTRIP_HOST must be a valid hostname or IP address");
  }
  if (/[\0\r\n]/.test(config.outputDevice) || /[\0\r\n]/.test(config.outputHost)) {
    throw new Error("NTRIP output configuration contains invalid characters");
  }
  if (!["serial", "tcp"].includes(config.outputMode)) {
    throw new Error("GA_NTRIP_OUTPUT_MODE must be serial or tcp");
  }
  if (!config.useClosest && !config.mount) {
    throw new Error("GA_NTRIP_MOUNT is required when closest-station mode is disabled");
  }

  return config;
}

function makeStaticNtripUri(config) {
  const host = net.isIP(config.host) === 6 ? `[${config.host}]` : config.host;
  return `ntrip://${encodeURIComponent(config.user)}:${encodeURIComponent(config.password)}@${host}:${config.port}/${encodeURIComponent(config.mount)}`;
}

async function resolveClosestUri(config, fetchImpl = fetch) {
  const response = await fetchImpl(`${config.apiBaseUrl}/gnss/cors?closestNtripPath=true`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`closest-station endpoint returned ${response.status}`);
  const payload = await response.json();
  if (typeof payload?.result?.ntripPath !== "string") {
    throw new Error("closest-station endpoint did not return result.ntripPath");
  }
  return payload.result.ntripPath;
}

export async function resolveNtripEndpoint(config, logger = console, fetchImpl = fetch) {
  if (!config.useClosest) return parseNtripUri(makeStaticNtripUri(config), config.secure);

  try {
    return parseNtripUri(await resolveClosestUri(config, fetchImpl), config.secure);
  } catch (error) {
    if (!config.mount) {
      throw new Error(
        `Unable to resolve closest NTRIP mount and no static mount is configured: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    logger.warn(`Closest-station lookup failed; using the configured static mount: ${error instanceof Error ? error.message : String(error)}`);
    return parseNtripUri(makeStaticNtripUri(config), config.secure);
  }
}

function waitForDrain(stream) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      stream.removeListener("drain", onDrain);
      stream.removeListener("close", onClose);
      stream.removeListener("error", onError);
    };
    const onDrain = () => {
      cleanup();
      resolve();
    };
    const onClose = () => {
      cleanup();
      resolve();
    };
    const onError = (error) => {
      cleanup();
      reject(error);
    };
    stream.once("drain", onDrain);
    stream.once("close", onClose);
    stream.once("error", onError);
  });
}

async function writeSerial(port, chunk) {
  if (!port.write(chunk)) await waitForDrain(port);
}

export async function openOutput(config, onFatal, logger = console) {
  if (config.outputMode === "serial") {
    const port = new SerialPort({
      path: config.outputDevice,
      baudRate: config.outputBaudRate,
      autoOpen: false,
    });
    port.on("error", onFatal);
    port.once("close", () => {
      if (!closing) onFatal(new Error("Correction serial port closed unexpectedly"));
    });
    let closing = false;
    await new Promise((resolve, reject) => {
      port.open((error) => (error ? reject(error) : resolve()));
    });
    logger.log(`Correction output: serial ${config.outputDevice} at ${config.outputBaudRate} baud`);
    return {
      write: (chunk) => writeSerial(port, chunk),
      close: async () => {
        if (!port.isOpen) return;
        closing = true;
        await new Promise((resolve, reject) => {
          port.drain((drainError) => {
            if (drainError) {
              reject(drainError);
              return;
            }
            port.close((closeError) => (closeError ? reject(closeError) : resolve()));
          });
        });
      },
    };
  }

  const clients = new Set();
  const server = net.createServer((client) => {
    client.setNoDelay(true);
    clients.add(client);
    client.on("close", () => clients.delete(client));
    client.on("error", (error) => {
      clients.delete(client);
      logger.warn(`Removing NTRIP TCP output client: ${error.message}`);
      client.destroy();
    });
  });
  server.on("error", onFatal);
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
    server.listen(config.outputPort, config.outputHost);
  });
  logger.log(`Correction output: TCP listener ${config.outputHost}:${config.outputPort}`);

  return {
    write: async (chunk) => {
      await Promise.all([...clients].map(async (client) => {
        try {
          if (!client.destroyed && !client.write(chunk)) await waitForDrain(client);
        } catch (error) {
          logger.warn(`Closing NTRIP TCP output client after write failure: ${error instanceof Error ? error.message : String(error)}`);
          client.destroy();
        }
      }));
    },
    close: async () => {
      for (const client of clients) client.destroy();
      await new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    },
  };
}

function delay(ms, signal) {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const timer = setTimeout(done, ms);
    const onAbort = () => {
      clearTimeout(timer);
      done();
    };
    function done() {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

export async function runForwarder({ env = process.env, logger = console } = {}) {
  const config = readConfig(env);
  const endpoint = await resolveNtripEndpoint(config, logger);
  const controller = new AbortController();
  let fatalError;
  let output;
  const abortForError = (error) => {
    fatalError = error;
    controller.abort(error);
  };
  const onSignal = () => controller.abort();
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);

  try {
    output = await openOutput(config, abortForError, logger);
    logger.log(`NTRIP mount ${endpoint.mount} at ${endpoint.host}:${endpoint.port} (${endpoint.secure ? "TLS" : "plain TCP"})`);
    let backoffMs = INITIAL_RECONNECT_MS;

    while (!controller.signal.aborted) {
      const startedAt = Date.now();
      try {
        await connectAndStream(endpoint, (chunk) => output.write(chunk), {
          signal: controller.signal,
          timeoutMs: config.connectTimeoutMs,
        });
        if (!controller.signal.aborted) logger.warn("NTRIP caster disconnected");
      } catch (error) {
        if (controller.signal.aborted) break;
        logger.error(`NTRIP connection failed: ${error instanceof Error ? error.message : String(error)}`);
      }

      if (controller.signal.aborted) break;
      if (Date.now() - startedAt >= STABLE_CONNECTION_MS) backoffMs = INITIAL_RECONNECT_MS;
      logger.log(`Retrying NTRIP connection in ${backoffMs} ms`);
      await delay(backoffMs, controller.signal);
      backoffMs = Math.min(backoffMs * 2, MAX_RECONNECT_MS);
    }
    if (fatalError) throw fatalError;
  } finally {
    controller.abort();
    process.removeListener("SIGINT", onSignal);
    process.removeListener("SIGTERM", onSignal);
    if (output) await output.close();
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  runForwarder().catch((error) => {
    console.error(`NTRIP forwarder stopped: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
