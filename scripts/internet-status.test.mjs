import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";

register();
const { probeInternet } = await import("../app/lib/internet-status.ts");

await test("internet probe separates normal and slow responses at 1500ms", async () => {
  for (const latency of [0, 1499, 1500, 3000]) {
    let calls = 0;
    const result = await probeInternet(async (url, options) => {
      assert.equal(url, "https://www.gstatic.com/generate_204");
      assert.equal(options.method, "HEAD");
      assert.equal(options.redirect, "error");
      return new Response(null, { status: 204 });
    }, () => calls++ === 0 ? 0 : latency);
    assert.equal(result.state, latency >= 1500 ? "slow" : "online");
    assert.equal(result.latencyMs, latency);
  }
});

await test("failed, timed out, and captive-portal checks remain explicit failures", async () => {
  for (const request of [
    async () => { throw new Error("DNS failed"); },
    async () => { throw new DOMException("Timed out", "TimeoutError"); },
    async () => new Response(null, { status: 200 }),
    async () => new Response(null, { status: 503 }),
  ]) {
    const result = await probeInternet(request);
    assert.equal(result.state, "unavailable");
    assert.equal(result.latencyMs, null);
    assert.ok(result.error);
  }
});
