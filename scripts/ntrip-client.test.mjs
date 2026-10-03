import assert from "node:assert/strict";
import { once } from "node:events";
import net from "node:net";
import test from "node:test";
import {
  ChunkedDecoder,
  connectAndStream,
  createNtripRequest,
  parseNtripUri,
} from "./ntrip-client.mjs";
import { openOutput, readConfig, resolveNtripEndpoint } from "./ntrip-forwarder.mjs";

void test("parses NTRIP URIs and builds a credential-bearing caster request", () => {
  const endpoint = parseNtripUri("ntrip://field%40user:p%3A%23ss@example.test:2101/COMA00AUS0");
  assert.deepEqual(endpoint, {
    host: "example.test",
    port: 2101,
    username: "field@user",
    password: "p:#ss",
    mount: "COMA00AUS0",
    secure: false,
  });

  const request = createNtripRequest(endpoint);
  assert.match(request, /^GET \/COMA00AUS0 HTTP\/1\.1\r\n/);
  assert.ok(request.includes(`Authorization: Basic ${Buffer.from("field@user:p:#ss").toString("base64")}`));
  assert.match(request, /Ntrip-Version: Ntrip\/2\.0/);
  assert.equal(parseNtripUri("ntrip://user:pass@example.test/MOUNT", true).secure, true);
  assert.throws(() => parseNtripUri("ntrips://user:pass@example.test/MOUNT"), /must use ntrip:\/\//);
});

void test("streams binary RTCM following an ICY success response unchanged", async (t) => {
  const receivedRequest = [];
  let requestResolved;
  const requestSeen = new Promise((resolve) => {
    requestResolved = resolve;
  });
  const server = net.createServer((client) => {
    let request = Buffer.alloc(0);
    client.on("data", (data) => {
      request = Buffer.concat([request, data]);
      const end = request.indexOf("\r\n\r\n");
      if (end < 0) return;
      receivedRequest.push(request.subarray(0, end).toString("latin1"));
      requestResolved();
      const rtcM = Buffer.from([0xd3, 0x00, 0x04, 0x3e, 0xd0, 0x00, 0x00, 0x7f]);
      client.end(Buffer.concat([Buffer.from("ICY 200 OK\r\n"), rtcM]));
    });
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  const chunks = [];
  await connectAndStream({
    host: "127.0.0.1",
    port: server.address().port,
    username: "receiver",
    password: "secret",
    mount: "TEST",
    secure: false,
  }, async (chunk) => chunks.push(Buffer.from(chunk)));
  await requestSeen;

  assert.match(receivedRequest[0], /^GET \/TEST HTTP\/1\.1\r\n/);
  assert.match(receivedRequest[0], /Authorization: Basic cmVjZWl2ZXI6c2VjcmV0/);
  assert.deepEqual(Buffer.concat(chunks), Buffer.from([0xd3, 0x00, 0x04, 0x3e, 0xd0, 0x00, 0x00, 0x7f]));
});

void test("decodes chunked HTTP response bodies without changing binary data", () => {
  const frame = Buffer.from([0xd3, 0x00, 0x04, 0x03, 0xff, 0x00]);
  const encoded = Buffer.concat([
    Buffer.from(`${frame.length.toString(16)}\r\n`),
    frame,
    Buffer.from("\r\n0\r\n\r\n"),
  ]);
  const decoder = new ChunkedDecoder();
  const output = [];
  output.push(...decoder.push(encoded.subarray(0, 5)));
  output.push(...decoder.push(encoded.subarray(5)));
  assert.deepEqual(Buffer.concat(output), frame);
});

void test("rejects non-success caster responses", async (t) => {
  const server = net.createServer((client) => {
    client.once("data", () => client.end("HTTP/1.1 401 Unauthorized\r\n\r\n"));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  await assert.rejects(connectAndStream({
    host: "127.0.0.1",
    port: server.address().port,
    username: "receiver",
    password: "secret",
    mount: "TEST",
    secure: false,
  }, async () => {}), /caster rejected.*401 Unauthorized/);
});

void test("validates NTRIP configuration and defaults to the configured static mount", () => {
  const config = readConfig({
    GA_NTRIP_USER: "receiver",
    GA_NTRIP_PASSWORD: "secret",
    GA_NTRIP_HOST: "caster.example",
    GA_NTRIP_MOUNT: "TEST",
  });
  assert.equal(config.useClosest, false);
  assert.equal(config.secure, true);
  assert.equal(config.port, 443);
  assert.equal(config.outputMode, "serial");
  assert.throws(() => readConfig({
    GA_NTRIP_USER: "receiver",
    GA_NTRIP_PASSWORD: "secret",
    GA_NTRIP_HOST: "caster.example",
    GA_NTRIP_PORT: "not-a-port",
  }), /GA_NTRIP_PORT must be a positive integer/);
  assert.equal(readConfig({
    GA_NTRIP_USER: "receiver",
    GA_NTRIP_PASSWORD: "secret",
    GA_NTRIP_HOST: "caster.example",
    GA_NTRIP_MOUNT: "TEST",
    GA_NTRIP_SECURE: "false",
  }).port, 2101);
});

void test("falls back to a configured static mount when closest lookup fails", async () => {
  const config = readConfig({
    GA_NTRIP_USER: "receiver",
    GA_NTRIP_PASSWORD: "secret",
    GA_NTRIP_HOST: "caster.example",
    GA_NTRIP_MOUNT: "STATIC",
    GA_NTRIP_USE_CLOSEST: "true",
  });
  const warnings = [];
  const endpoint = await resolveNtripEndpoint(config, { warn: (message) => warnings.push(message) }, async () => ({
    ok: false,
    status: 503,
  }));

  assert.equal(endpoint.mount, "STATIC");
  assert.equal(endpoint.host, "caster.example");
  assert.equal(endpoint.username, "receiver");
  assert.equal(warnings.length, 1);
  assert.doesNotMatch(warnings[0], /secret/);
});

void test("forwards RTCM bytes to connected TCP output clients", async (t) => {
  const probe = net.createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  await new Promise((resolve, reject) => {
    probe.close((error) => (error ? reject(error) : resolve()));
  });

  let fatalError;
  const output = await openOutput({
    outputMode: "tcp",
    outputHost: "127.0.0.1",
    outputPort: port,
  }, (error) => {
    fatalError = error;
  }, { log() {}, warn() {} });
  const client = net.createConnection(port, "127.0.0.1");
  t.after(() => {
    client.destroy();
    return output.close();
  });
  await once(client, "connect");

  const frame = Buffer.from([0xd3, 0x00, 0x04, 0x3e, 0xd0, 0x00, 0x00, 0x7f]);
  const received = once(client, "data");
  await output.write(frame);
  const [chunk] = await received;
  assert.deepEqual(chunk, frame);
  assert.equal(fatalError, undefined);
});
