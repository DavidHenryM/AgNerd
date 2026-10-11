import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";

register();
const { startGnssPolling, GNSS_POLL_INTERVAL_MS } = await import("../app/lib/gnss-polling.ts");
const flush = () => new Promise(resolve => setImmediate(resolve));

await test("polls five times per simulated second without overlapping requests", async t => {
  const timers = [];
  let now = 0;
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "setTimeout", (callback, delay) => {
    timers.push({ callback, delay });
    return timers.length;
  });
  t.mock.method(globalThis, "clearTimeout", () => {});
  let count = 0;
  const stop = startGnssPolling(async () => { count++; });
  await flush();
  assert.equal(GNSS_POLL_INTERVAL_MS, 200);
  for (let i = 0; i < 4; i++) {
    const timer = timers.shift();
    assert.equal(timer.delay, 200);
    now += timer.delay;
    timer.callback();
    await flush();
  }
  assert.equal(count, 5);
  stop();
});

await test("slow requests are serialized, and stopping aborts the request and prevents rescheduling", async t => {
  const timers = [];
  let now = 0;
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "setTimeout", (callback, delay) => {
    timers.push({ callback, delay });
    return timers.length;
  });
  t.mock.method(globalThis, "clearTimeout", () => {});
  let release;
  let signal;
  let count = 0;
  const stop = startGnssPolling(async incoming => {
    signal = incoming;
    count++;
    await new Promise(resolve => { release = resolve; });
  });
  assert.equal(timers.length, 0);
  now = 600;
  release();
  await flush();
  assert.equal(timers[0].delay, 0);
  timers.shift().callback();
  assert.equal(count, 2);
  stop();
  assert.equal(signal.aborted, true);
  release();
  await flush();
  assert.equal(timers.length, 0);
});
