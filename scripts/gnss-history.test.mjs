import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";

register();
const { recordGnssHistory } = await import("../app/lib/gnss-history.ts");
const point = { latitude: -36.5601857, longitude: 148.8247819, heading: 90, timestamp: "2026-10-11T00:00:00Z" };
function request(body, token) {
  return new Request("http://localhost/api/gnss/position", {
    method: "POST", headers: { "Content-Type": "application/json", ...(token ? { "x-gnss-token": token } : {}) },
    body: JSON.stringify(body),
  });
}

await test("reader and paused updates never touch the database or session service", async () => {
  const dependencies = {
    hasSession: async () => { throw Error("Session should not be queried"); },
    save: async () => { throw Error("Database should not be queried"); },
  };
  for (const body of [point, { ...point, spraying: false }]) {
    const response = await recordGnssHistory(request(body), dependencies);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, recorded: false, reason: "Spraying is not enabled." });
  }
});

await test("reader token is still checked, but cannot authorize spray history writes", async () => {
  const dependencies = {
    internalToken: "reader-token", hasSession: async () => false,
    save: async () => { throw Error("Unexpected write"); },
  };
  assert.equal((await recordGnssHistory(request(point), dependencies)).status, 401);
  assert.equal((await recordGnssHistory(request(point, "reader-token"), dependencies)).status, 200);
  assert.equal((await recordGnssHistory(request({ ...point, spraying: true }, "reader-token"), dependencies)).status, 401);
});

await test("only explicit spraying true with a valid session saves a point", async () => {
  const writes = [];
  const response = await recordGnssHistory(request({ ...point, spraying: true }), {
    internalToken: "reader-token", hasSession: async () => true,
    save: async data => { writes.push(data); return { id: "point-1", ...data }; },
  });
  assert.deepEqual(writes, [{ latitude: point.latitude, longitude: point.longitude, heading: 90 }]);
  const result = await response.json();
  assert.equal(result.recorded, true);
  assert.equal(result.saved.id, "point-1");
});

await test("invalid flags, payloads, coordinates and timestamps cannot write history", async () => {
  const dependencies = {
    hasSession: async () => true, save: async () => { throw Error("Unexpected write"); },
  };
  for (const body of [null, [], { ...point, spraying: "true" }, { ...point, latitude: 91, spraying: true },
    { ...point, longitude: null, spraying: true }, { ...point, timestamp: "bad", spraying: true }]) {
    assert.equal((await recordGnssHistory(request(body), dependencies)).status, 400);
  }
});

await test("database failures are propagated, never acknowledged as recorded", async () => {
  await assert.rejects(recordGnssHistory(request({ ...point, spraying: true }), {
    hasSession: async () => true, save: async () => { throw Error("planLimitReached"); },
  }), /planLimitReached/);
});
