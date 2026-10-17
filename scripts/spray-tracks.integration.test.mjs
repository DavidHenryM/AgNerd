import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import { register } from "tsx/esm/api";
import { register as registerCjs } from "tsx/cjs/api";

registerCjs();
register();
const databaseURL = process.env.AGNERD_SPRAY_TEST_DATABASE_URL;

await test("authenticated track APIs persist, paginate, isolate owners, retry atomically and delete only track coverage", {
  skip: !databaseURL,
}, async () => {
  const url = new URL(databaseURL);
  assert.ok(["127.0.0.1", "localhost"].includes(url.hostname) && url.pathname.endsWith("_test"),
    "Spray integration tests require an explicitly configured loopback database ending in _test");
  process.env.AGNERD_DEPLOYMENT_MODE = "embedded";
  process.env.LOCAL_DATABASE_URL = databaseURL;
  process.env.BETTER_AUTH_SECRET = randomUUID() + randomUUID();
  process.env.BETTER_AUTH_URL = "http://localhost:3001";
  const pool = new Pool({ connectionString: databaseURL });
  const { prisma } = await import("../app/lib/prisma.ts");
  const { auth } = await import("../app/lib/auth.ts");
  const { hashPassword } = await import("better-auth/crypto");
  const collection = await import("../app/api/spray-tracks/route.ts");
  const detail = await import("../app/api/spray-tracks/[id]/route.ts");
  const farmId = randomUUID();
  const users = [randomUUID(), randomUUID()];
  const geoId = randomUUID();
  const settings = { widthMeters: 6, offsetMeters: 0, forwardOffsetMeters: -1.5 };
  const context = id => ({ params: Promise.resolve({ id }) });
  const request = (method, body, cookie, suffix = "") => new Request(`http://localhost:3001/api/spray-tracks${suffix}`, {
    method, headers: { ...(cookie ? { cookie } : {}), "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: typeof body === "string" ? body : JSON.stringify(body) }),
  });
  try {
    const table = await pool.query(`SELECT to_regclass('public."Farm"') AS name`);
    if (!table.rows[0].name) await pool.query(await readFile(new URL("../prisma/embedded-schema.sql", import.meta.url), "utf8"));
    const patch = await readFile(new URL("../prisma/patches/add-spray-tracks.sql", import.meta.url), "utf8");
    await pool.query(patch);
    await pool.query(patch);
    await prisma.farm.create({ data: { id: farmId, name: "Spray API test", lotSectionPlan: [] } });
    const password = `Test-only-${randomUUID()}!`;
    const cookies = [];
    for (const id of users) {
      const email = `${id}@example.test`;
      await prisma.user.create({
        data: { id, farmId, name: "Test", firstName: "Test", lastName: "Operator", email,
          accounts: { create: { id: randomUUID(), providerId: "credential", accountId: id, password: await hashPassword(password) } } },
      });
      const response = await auth.api.signInEmail({ body: { email, password }, asResponse: true });
      assert.equal(response.status, 200);
      const cookie = response.headers.getSetCookie().find(value => value.startsWith("better-auth.session_token="));
      assert.ok(cookie, "sign-in issues an authenticated session cookie");
      cookies.push(cookie.split(";")[0]);
    }
    const [owner, other] = cookies;
    const id = randomUUID();
    assert.equal((await collection.GET(request("GET"))).status, 401);
    assert.equal((await detail.GET(request("GET"), context(id))).status, 401);
    assert.equal((await detail.DELETE(request("DELETE", undefined, undefined, `/${id}?revision=0`), context(id))).status, 401);
    assert.equal((await collection.POST(request("POST", { id, ...settings }, owner))).status, 200);
    assert.equal((await collection.POST(request("POST", { id, ...settings }, other))).status, 404);
    assert.equal((await detail.GET(request("GET", undefined, other), context(id))).status, 404);
    const coordinates = [148, -36, 148.0001, -36, 148.0001, -35.9999, 148, -35.9999];
    const save = { ...settings, saveId: randomUUID(), revision: 0,
      strips: Array.from({ length: 64 }, (_, sequence) => ({ sequence, coordinates, areaSqMeters: 6 })) };
    const saved = await detail.PATCH(request("PATCH", save, owner), context(id));
    assert.equal(saved.status, 200);
    assert.equal((await saved.json()).track.totalAreaSqMeters, 384);
    assert.equal((await detail.PATCH(request("PATCH", save, owner), context(id))).status, 200);
    assert.equal(await prisma.sprayTrackStrip.count({ where: { trackId: id } }), 64);
    assert.equal((await detail.PATCH(request("PATCH", save, other), context(id))).status, 404);
    const next = { ...save, saveId: randomUUID(), revision: 1, widthMeters: 12,
      strips: [{ sequence: 64, coordinates, areaSqMeters: 12 }] };
    const concurrent = await Promise.all([
      detail.PATCH(request("PATCH", next, owner), context(id)),
      detail.PATCH(request("PATCH", { ...next, saveId: randomUUID() }, owner), context(id)),
    ]);
    assert.deepEqual(concurrent.map(response => response.status).sort(), [200, 409]);
    const page = await (await detail.GET(request("GET", undefined, owner), context(id))).json();
    assert.equal(page.strips.length, 64);
    assert.equal(page.nextSequence, 63);
    assert.equal(page.track.totalAreaSqMeters, 396);
    assert.equal(page.track.widthMeters, 12);
    const last = await (await detail.GET(request("GET", undefined, owner, `/${id}?after=63&revision=2`), context(id))).json();
    assert.equal(last.strips.length, 1);
    assert.deepEqual(last.strips[0].coordinates, coordinates);
    assert.equal(last.nextSequence, null);
    assert.equal((await detail.GET(request("GET", undefined, owner, `/${id}?after=63&revision=1`), context(id))).status, 409);
    assert.equal((await detail.PATCH(request("PATCH", { ...next, revision: 2, strips: [{ sequence: 66, coordinates, areaSqMeters: 1 }] }, owner), context(id))).status, 409);
    for (let index = 0; index < 21; index++) {
      assert.equal((await collection.POST(request("POST", { id: randomUUID(), ...settings }, owner))).status, 200);
    }
    await collection.POST(request("POST", { id: randomUUID(), ...settings }, other));
    const list = await (await collection.GET(request("GET", undefined, owner))).json();
    assert.equal(list.tracks.length, 20);
    assert.ok(list.nextCursor);
    const remaining = await (await collection.GET(request("GET", undefined, owner, `?cursor=${list.nextCursor}`))).json();
    assert.equal(remaining.tracks.length, 2);
    assert.equal(remaining.nextCursor, null);
    assert.equal(new Set([...list.tracks, ...remaining.tracks].map(track => track.id)).size, 22);
    assert.equal((await (await collection.GET(request("GET", undefined, other))).json()).tracks.length, 1);
    assert.equal((await collection.POST(request("POST", "bad-json", owner))).status, 400);
    assert.equal((await collection.POST(request("POST", " ".repeat(65537), owner))).status, 413);
    assert.equal((await collection.POST(request("POST", { id: randomUUID(), ...settings, widthMeters: -1 }, owner))).status, 400);
    assert.equal((await collection.GET(request("GET", undefined, owner, "?cursor=bad"))).status, 400);
    assert.equal((await detail.GET(request("GET", undefined, owner, "?after=NaN"), context(id))).status, 400);
    await prisma.geoPoint.create({ data: { id: geoId, latitude: -36, longitude: 148 } });
    assert.equal((await detail.DELETE(request("DELETE", undefined, owner, `/${id}?revision=0`), context(id))).status, 409);
    assert.equal((await detail.DELETE(request("DELETE", undefined, other, `/${id}?revision=2`), context(id))).status, 200);
    assert.equal(await prisma.sprayTrack.count({ where: { id } }), 1);
    assert.equal((await detail.DELETE(request("DELETE", undefined, owner, `/${id}?revision=2`), context(id))).status, 200);
    assert.equal(await prisma.sprayTrackStrip.count({ where: { trackId: id } }), 0);
    assert.equal(await prisma.geoPoint.count({ where: { id: geoId } }), 1);
    assert.equal((await detail.DELETE(request("DELETE", undefined, owner, `/${id}?revision=2`), context(id))).status, 200);
  } finally {
    await prisma.user.deleteMany({ where: { id: { in: users } } });
    await prisma.geoPoint.deleteMany({ where: { id: geoId } });
    await prisma.farm.deleteMany({ where: { id: farmId } });
    await prisma.$disconnect();
    await pool.end();
  }
});
