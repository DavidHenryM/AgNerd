import net from "node:net";
import tls from "node:tls";

const HEADER_END = Buffer.from("\r\n\r\n");
const MAX_HEADER_BYTES = 64 * 1024;

export function parseNtripUri(uri, secureOverride = false) {
  const parsed = new URL(uri);
  if (parsed.protocol !== "ntrip:") {
    throw new Error("NTRIP URI must use ntrip://");
  }
  if (!parsed.hostname || !parsed.username || !parsed.password) {
    throw new Error("NTRIP URI must include a host, username, and password");
  }

  const mount = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  if (!mount || /[\r\n]/.test(mount)) {
    throw new Error("NTRIP URI must include a valid mount point");
  }

  return {
    host: parsed.hostname.replace(/^\[|\]$/g, ""),
    port: parsed.port ? Number(parsed.port) : 2101,
    username: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    mount,
    secure: secureOverride,
  };
}

export function createNtripRequest(endpoint) {
  const host = net.isIP(endpoint.host) === 6 ? `[${endpoint.host}]` : endpoint.host;
  const mount = encodeURIComponent(endpoint.mount);
  const authorization = Buffer.from(`${endpoint.username}:${endpoint.password}`).toString("base64");
  return [
    `GET /${mount} HTTP/1.1`,
    `Host: ${host}:${endpoint.port}`,
    "User-Agent: NTRIP AgNerd/1.0",
    "Ntrip-Version: Ntrip/2.0",
    "Accept: */*",
    `Authorization: Basic ${authorization}`,
    "Connection: keep-alive",
    "",
    "",
  ].join("\r\n");
}

export function parseNtripResponse(buffer) {
  const firstLineEnd = buffer.indexOf("\r\n");
  if (firstLineEnd < 0) {
    if (buffer.length > MAX_HEADER_BYTES) throw new Error("NTRIP response header exceeded the size limit");
    return null;
  }

  const statusLine = buffer.subarray(0, firstLineEnd).toString("latin1");
  if (/^ICY 200(?:\s|$)/i.test(statusLine)) {
    return {
      remainder: buffer.subarray(firstLineEnd + 2),
      chunked: false,
    };
  }

  const headerEnd = buffer.indexOf(HEADER_END);
  if (headerEnd < 0) {
    if (buffer.length > MAX_HEADER_BYTES) throw new Error("NTRIP response header exceeded the size limit");
    if (!/^HTTP\/1\.[01] \d{3}(?:\s|$)/i.test(statusLine)) {
      throw new Error(`Unexpected NTRIP response: ${statusLine.slice(0, 120)}`);
    }
    if (!/^HTTP\/1\.[01] 200(?:\s|$)/i.test(statusLine)) {
      throw new Error(`NTRIP caster rejected the request: ${statusLine.slice(0, 120)}`);
    }
    return null;
  }

  if (!/^HTTP\/1\.[01] 200(?:\s|$)/i.test(statusLine)) {
    throw new Error(`NTRIP caster rejected the request: ${statusLine.slice(0, 120)}`);
  }

  const headers = buffer.subarray(firstLineEnd + 2, headerEnd).toString("latin1");
  const transferEncoding = headers
    .split("\r\n")
    .find((header) => /^transfer-encoding\s*:/i.test(header))
    ?.split(":", 2)[1]
    .trim()
    .toLowerCase();

  return {
    remainder: buffer.subarray(headerEnd + HEADER_END.length),
    chunked: transferEncoding?.split(/\s*,\s*/).includes("chunked") ?? false,
  };
}

export class ChunkedDecoder {
  #buffer = Buffer.alloc(0);
  #remaining = 0;
  #state = "size";
  #done = false;

  push(input) {
    if (this.#done && input.length > 0) throw new Error("Unexpected data after chunked NTRIP stream");
    this.#buffer = Buffer.concat([this.#buffer, input]);
    const output = [];

    while (!this.#done) {
      if (this.#state === "size") {
        const lineEnd = this.#buffer.indexOf("\r\n");
        if (lineEnd < 0) {
          if (this.#buffer.length > 8192) throw new Error("Invalid chunked NTRIP response");
          break;
        }
        const sizeText = this.#buffer.subarray(0, lineEnd).toString("ascii").split(";", 1)[0].trim();
        if (!/^[\da-f]+$/i.test(sizeText)) throw new Error("Invalid chunk size in NTRIP response");
        this.#remaining = Number.parseInt(sizeText, 16);
        if (!Number.isSafeInteger(this.#remaining)) throw new Error("NTRIP chunk size is out of range");
        this.#buffer = this.#buffer.subarray(lineEnd + 2);
        this.#state = this.#remaining === 0 ? "trailers" : "data";
      } else if (this.#state === "data") {
        if (this.#buffer.length === 0) break;
        const count = Math.min(this.#remaining, this.#buffer.length);
        output.push(this.#buffer.subarray(0, count));
        this.#buffer = this.#buffer.subarray(count);
        this.#remaining -= count;
        if (this.#remaining === 0) this.#state = "data-end";
      } else if (this.#state === "data-end") {
        if (this.#buffer.length < 2) break;
        if (this.#buffer[0] !== 13 || this.#buffer[1] !== 10) {
          throw new Error("Invalid chunk terminator in NTRIP response");
        }
        this.#buffer = this.#buffer.subarray(2);
        this.#state = "size";
      } else if (this.#state === "trailers") {
        if (this.#buffer.length >= 2 && this.#buffer[0] === 13 && this.#buffer[1] === 10) {
          this.#buffer = this.#buffer.subarray(2);
          this.#done = true;
          continue;
        }
        const trailerEnd = this.#buffer.indexOf(HEADER_END);
        if (trailerEnd < 0) {
          if (this.#buffer.length > 8192) throw new Error("Invalid chunk trailers in NTRIP response");
          break;
        }
        this.#buffer = this.#buffer.subarray(trailerEnd + HEADER_END.length);
        this.#done = true;
      }
    }

    if (this.#done && this.#buffer.length > 0) throw new Error("Unexpected data after chunked NTRIP stream");
    return output;
  }
}

export function connectAndStream(endpoint, onData, { signal, timeoutMs = 15_000 } = {}) {
  if (signal?.aborted) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const socketOptions = { host: endpoint.host, port: endpoint.port };
    let socket;
    if (endpoint.secure) {
      if (net.isIP(endpoint.host) === 0) socketOptions.servername = endpoint.host;
      socket = tls.connect({ ...socketOptions, rejectUnauthorized: true });
    } else {
      socket = net.createConnection(socketOptions);
    }

    let settled = false;
    let responseAccepted = false;
    let responseBuffer = Buffer.alloc(0);
    let decoder;
    const connectEvent = endpoint.secure ? "secureConnect" : "connect";

    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onAbort);
      if (error) reject(error);
      else resolve();
    };
    const onAbort = () => {
      socket.destroy();
      finish();
    };
    const timeout = setTimeout(() => {
      socket.destroy(new Error(`Timed out connecting to NTRIP caster ${endpoint.host}:${endpoint.port}`));
    }, timeoutMs);
    timeout.unref?.();

    signal?.addEventListener("abort", onAbort, { once: true });
    socket.once(connectEvent, () => {
      socket.write(createNtripRequest(endpoint));
    });
    socket.on("error", (error) => finish(error));
    socket.on("close", () => {
      if (signal?.aborted || responseAccepted) finish();
      else finish(new Error("NTRIP caster closed the connection before accepting the request"));
    });
    socket.on("data", async (data) => {
      socket.pause();
      try {
        let body = data;
        if (!responseAccepted) {
          responseBuffer = Buffer.concat([responseBuffer, data]);
          const response = parseNtripResponse(responseBuffer);
          if (!response) {
            socket.resume();
            return;
          }
          responseAccepted = true;
          clearTimeout(timeout);
          responseBuffer = Buffer.alloc(0);
          if (response.chunked) decoder = new ChunkedDecoder();
          body = response.remainder;
        }

        const chunks = decoder ? decoder.push(body) : [body];
        for (const chunk of chunks) {
          if (chunk.length > 0) await onData(chunk);
        }
        if (!settled && !socket.destroyed) socket.resume();
      } catch (error) {
        socket.destroy(error instanceof Error ? error : new Error(String(error)));
      }
    });
  });
}
