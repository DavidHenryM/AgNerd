import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import net from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";
import { SerialPortMock } from "serialport";
import { createCorrectionStatus, readCorrectionConfig, startCorrectionInput } from "./gnss-corrections.mjs";

const quietLogger = { log() {}, warn() {}, error() {} };
let serialNumber = 0;

async function waitFor(predicate) {
  const deadline = Date.now() + 3000;
  while (!predicate()) {
    if (Date.now() >= deadline) throw new Error("Timed out waiting for correction state");
    await delay(5);
  }
}

async function setup(t, overrides = {}) {
  const device = `GNSS-MOCK-${serialNumber++}`;
  SerialPortMock.binding.createPort(device, { record: true });
  const port = new SerialPortMock({ path: device, baudRate: 38400, autoOpen: false });
  const clients = new Set();
  const server = net.createServer((client) => {
    clients.add(client);
    client.on("error", () => {});
    client.on("close", () => clients.delete(client));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const config = { host: "127.0.0.1", port: server.address().port, reconnectMs: 20, timeoutMs: 1000, ...overrides };
  const status = createCorrectionStatus(config);
  const stop = startCorrectionInput(port, config, status, quietLogger);
  t.after(async () => {
    stop();
    for (const client of clients) client.destroy();
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    if (port.isOpen) await new Promise((resolve, reject) => port.close((error) => error ? reject(error) : resolve()));
  });
  const opened = once(port, "open");
  port.open();
  await opened;
  return { port, server, clients, config, status, stop };
}

await test("corrections are opt-in, serial-only, and validated", () => {
  assert.equal(readCorrectionConfig({}), null);
  assert.equal(readCorrectionConfig({ GNSS_CORRECTIONS_ENABLED: "false", GNSS_CORRECTION_PORT: "bad" }), null);
  assert.throws(() => readCorrectionConfig({ GNSS_CORRECTIONS_ENABLED: "maybe" }), /must be true or false/);
  assert.throws(() => readCorrectionConfig({ GNSS_CORRECTIONS_ENABLED: "true", GNSS_SOURCE: "gpsd" }), /requires GNSS_SOURCE=serial/);
  const env = { GNSS_SOURCE: "serial", GNSS_CORRECTIONS_ENABLED: "true" };
  assert.deepEqual(readCorrectionConfig(env), { host: "localhost", port: 2101, reconnectMs: 3000, timeoutMs: 30000 });
  for (const [name, value] of [
    ["GNSS_CORRECTION_PORT", "65536"],
    ["GNSS_CORRECTION_PORT", "2101extra"],
    ["GNSS_CORRECTION_RECONNECT_MS", "0"],
    ["GNSS_CORRECTION_TIMEOUT_MS", "-1"],
    ["GNSS_CORRECTION_HOST", "http://localhost"],
  ]) {
    assert.throws(() => readCorrectionConfig({ ...env, [name]: value }), new RegExp(name));
  }
  assert.equal(createCorrectionStatus(null).enabled, false);
});

await test("forwards binary TCP data through the existing UART while serial reads continue", async (t) => {
  const { port, clients, status } = await setup(t);
  assert.equal(status.bytesForwarded, 0);
  await waitFor(() => status.connected && clients.size === 1);
  const bytes = Buffer.from([0xd3, 0x00, 0x03, 0x00, 0xff, 0x0d, 0x0a, 0x80]);
  const serialData = once(port, "data");
  port.port.emitData("$GNRMC,test\r\n");
  clients.values().next().value.write(bytes.subarray(0, 3));
  clients.values().next().value.write(bytes.subarray(3));
  await waitFor(() => status.bytesForwarded === bytes.length);
  assert.deepEqual(port.port.recording, bytes);
  assert.equal((await serialData)[0].toString(), "$GNRMC,test\r\n");
  assert.ok(status.lastConnectedAt);
  assert.ok(status.lastForwardedAt);
  assert.equal(status.lastError, null);
});

await test("waits for the UART drain before counting bytes or forwarding the next TCP chunk", async (t) => {
  const { port, clients, status } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  let completeDrain;
  const originalDrain = port.drain.bind(port);
  t.mock.method(port, "drain", (callback) => { completeDrain = () => originalDrain(callback); });
  const client = clients.values().next().value;
  client.write(Buffer.from([0xd3, 1]));
  await waitFor(() => Boolean(completeDrain));
  client.write(Buffer.from([0xd3, 2]));
  await delay(40);
  assert.deepEqual(port.port.recording, Buffer.from([0xd3, 1]));
  assert.equal(status.bytesForwarded, 0);
  const firstDrain = completeDrain;
  completeDrain = null;
  firstDrain();
  await waitFor(() => status.bytesForwarded === 2 && Boolean(completeDrain));
  assert.deepEqual(port.port.recording, Buffer.from([0xd3, 1, 0xd3, 2]));
  completeDrain();
  await waitFor(() => status.bytesForwarded === 4);
});

await test("reconnects after the correction TCP stream disconnects", async (t) => {
  const { clients, status } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  clients.values().next().value.end();
  await waitFor(() => Boolean(status.lastDisconnectedAt));
  await waitFor(() => status.connected && clients.size === 1);
  assert.equal(status.lastError, "Correction TCP stream ended.");
  clients.values().next().value.write(Buffer.from([0xd3, 0x01]));
  await waitFor(() => status.bytesForwarded === 2);
  assert.equal(status.lastError, null);
});

await test("retries when the forwarder starts after the serial reader", async (t) => {
  const fixture = await setup(t, { host: "127.0.0.2" });
  const { server, clients, config, status } = fixture;
  await waitFor(() => Boolean(status.lastError));
  assert.match(status.lastError, /ECONNREFUSED/);
  await new Promise((resolve) => server.close(resolve));
  server.listen(config.port, "127.0.0.2");
  await once(server, "listening");
  await waitFor(() => status.connected && clients.size === 1);
  clients.values().next().value.write(Buffer.from([0xd3, 3]));
  await waitFor(() => status.bytesForwarded === 2);
});

await test("records serial write errors without claiming successful delivery", async (t) => {
  const { port, clients, status, stop } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  t.mock.method(port, "write", (_chunk, callback) => { callback(new Error("mock UART write failure")); return false; });
  clients.values().next().value.write(Buffer.from([0xd3, 4]));
  await waitFor(() => status.lastError?.includes("mock UART write failure"));
  assert.equal(status.bytesForwarded, 0);
  assert.equal(status.lastForwardedAt, null);
  stop();
});

await test("records serial drain errors without claiming successful delivery", async (t) => {
  const { port, clients, status, stop } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  t.mock.method(port, "drain", (callback) => { callback(new Error("mock UART drain failure")); });
  clients.values().next().value.write(Buffer.from([0xd3, 5]));
  await waitFor(() => status.lastError?.includes("mock UART drain failure"));
  assert.equal(status.bytesForwarded, 0);
  stop();
});

await test("times out stalled TCP streams and attempts reconnection", async (t) => {
  const { status } = await setup(t, { timeoutMs: 80 });
  await waitFor(() => status.connected);
  const firstConnection = status.lastConnectedAt;
  await waitFor(() => Boolean(status.lastDisconnectedAt));
  assert.match(status.lastError, /No correction TCP activity/);
  await waitFor(() => status.connected && status.lastConnectedAt !== firstConnection);
});

await test("closing the UART disconnects corrections until the UART reopens", async (t) => {
  const { port, clients, status } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  await new Promise((resolve, reject) => port.close((error) => error ? reject(error) : resolve()));
  await waitFor(() => clients.size === 0);
  await delay(60);
  assert.equal(status.connected, false);
  assert.equal(status.lastError, "Serial port closed.");
  const opened = once(port, "open");
  port.open();
  await opened;
  await waitFor(() => status.connected && clients.size === 1);
});

await test("shutdown disconnects the correction stream without closing the UART or reconnecting", async (t) => {
  const { port, clients, status, stop } = await setup(t);
  await waitFor(() => status.connected && clients.size === 1);
  stop();
  await waitFor(() => clients.size === 0);
  await delay(60);
  assert.equal(status.connected, false);
  assert.equal(port.isOpen, true);
  assert.equal(port.listenerCount("open"), 0);
});

await test("installer deploys the correction helper alongside the GNSS reader", async () => {
  const installer = await readFile(new URL("../install.sh", import.meta.url), "utf8");
  assert.match(installer, /sudo cp scripts\/gnss-corrections\.mjs \/opt\/agnerd\/scripts\/gnss-corrections\.mjs/);
});
