import { createConnection } from "node:net";

function readInteger(env, name, fallback, max) {
  const value = env[name];
  if (value === undefined || value === "") return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > max) {
    throw new Error(`${name} must be an integer between 1 and ${max}`);
  }
  return Number(value);
}

export function readCorrectionConfig(env = process.env) {
  const enabled = (env.GNSS_CORRECTIONS_ENABLED || "false").trim().toLowerCase();
  if (!["true", "false", "1", "0", "yes", "no", "on", "off"].includes(enabled)) {
    throw new Error("GNSS_CORRECTIONS_ENABLED must be true or false");
  }
  if (["false", "0", "no", "off"].includes(enabled)) return null;
  if ((env.GNSS_SOURCE || "gpsd").toLowerCase() !== "serial") {
    throw new Error("GNSS_CORRECTIONS_ENABLED requires GNSS_SOURCE=serial");
  }
  const host = (env.GNSS_CORRECTION_HOST || "localhost").trim();
  if (!host || /[\s\0/\\]/.test(host)) {
    throw new Error("GNSS_CORRECTION_HOST must be a hostname or IP address");
  }
  return {
    host,
    port: readInteger(env, "GNSS_CORRECTION_PORT", 2101, 65535),
    reconnectMs: readInteger(env, "GNSS_CORRECTION_RECONNECT_MS", 3000, 300000),
    timeoutMs: readInteger(env, "GNSS_CORRECTION_TIMEOUT_MS", 30000, 300000),
  };
}

export function createCorrectionStatus(config) {
  return {
    enabled: Boolean(config),
    host: config?.host ?? null,
    port: config?.port ?? null,
    connected: false,
    bytesForwarded: 0,
    lastConnectedAt: null,
    lastDisconnectedAt: null,
    lastForwardedAt: null,
    lastError: null,
  };
}

export function startCorrectionInput(port, config, status, logger = console) {
  let socket = null;
  let reconnectTimer = null;
  let stopped = false;

  function scheduleReconnect() {
    if (stopped || !port.isOpen || reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, config.reconnectMs);
  }

  function connect() {
    if (stopped || !port.isOpen || socket) return;
    const connection = createConnection({ host: config.host, port: config.port });
    socket = connection;
    connection.setTimeout(config.timeoutMs);

    function fail(message) {
      status.lastError = message;
      status.connected = false;
      logger.error(`GNSS correction input: ${message}`);
      connection.destroy();
    }

    connection.on("connect", () => {
      status.connected = true;
      status.lastConnectedAt = new Date().toISOString();
      logger.log(`GNSS correction input connected to ${config.host}:${config.port}`);
    });
    connection.on("timeout", () => fail(`No correction TCP activity for ${config.timeoutMs} ms; reconnecting.`));
    connection.on("error", (error) => fail(error.message));
    connection.on("end", () => {
      status.lastError = "Correction TCP stream ended.";
      logger.warn("GNSS correction input: TCP stream ended; reconnecting.");
    });
    connection.on("data", (chunk) => {
      if (stopped || !port.isOpen || connection !== socket) return;
      // Pause TCP reads until this chunk is flushed so slow UART writes stay ordered and bounded.
      connection.pause();
      port.write(chunk, (writeError) => {
        if (stopped || connection !== socket) return;
        if (writeError) {
          fail(`Serial correction write failed: ${writeError.message}`);
          return;
        }
        port.drain((drainError) => {
          if (stopped || connection !== socket) return;
          if (drainError) {
            fail(`Serial correction drain failed: ${drainError.message}`);
            return;
          }
          status.bytesForwarded += chunk.length;
          status.lastForwardedAt = new Date().toISOString();
          status.lastError = null;
          if (!stopped && !connection.destroyed) connection.resume();
        });
      });
    });
    connection.on("close", () => {
      if (socket !== connection) return;
      socket = null;
      status.connected = false;
      status.lastDisconnectedAt = new Date().toISOString();
      scheduleReconnect();
    });
  }

  function disconnectForSerialClose() {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
    if (socket) socket.destroy();
    status.connected = false;
    status.lastError = "Serial port closed.";
    logger.error("GNSS correction input stopped because the serial port closed.");
  }

  port.on("open", connect);
  port.on("close", disconnectForSerialClose);
  if (port.isOpen) connect();

  return () => {
    stopped = true;
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
    port.off("open", connect);
    port.off("close", disconnectForSerialClose);
    if (socket) socket.destroy();
    status.connected = false;
  };
}
