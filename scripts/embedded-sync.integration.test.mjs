import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";
import { register as registerCjs } from "tsx/cjs/api";

register();
registerCjs();
const url = process.env.AGNERD_TEST_DATABASE_URL;

await test("manual backup is durable, retries identical bytes and prevents concurrent runs", { skip: !url }, async t => {
  const parsed = new URL(url);
  assert.ok(["localhost", "127.0.0.1"].includes(parsed.hostname) && parsed.pathname.endsWith("_test"));
  process.env.AGNERD_DEPLOYMENT_MODE = "embedded";
  process.env.LOCAL_DATABASE_URL = url;
  process.env.EMBEDDED_DEVICE_ID = "test-pi";
  process.env.EMBEDDED_SYNC_TOKEN = "integration-test-token-at-least-32-characters";
  process.env.EMBEDDED_SYNC_URL = "https://test.example/api/embedded/backups";
  const { prisma } = await import("../app/lib/prisma.ts");
  const { manualSync } = await import("../app/lib/embedded-sync.ts");
  const requests = [];
  try {
    const fetch = t.mock.method(globalThis, "fetch", async (_input, init) => {
      requests.push(init);
      return Response.json({ error: "Offline" }, { status: 503 });
    });
    await assert.rejects(manualSync(), /HTTP 503/);
    const pending = await prisma.embeddedSyncState.findUniqueOrThrow({ where: { id: "manual" } });
    assert.ok(pending.pendingData && pending.pendingId && pending.lastError);
    assert.equal(pending.leaseUntil, null);
    fetch.mock.mockImplementation(async (_input, init) => {
      requests.push(init);
      return Response.json({ id: init.headers["X-Backup-Id"], checksum: init.headers["X-Snapshot-Checksum"] });
    });
    await manualSync();
    assert.equal(requests[0].headers["X-Backup-Id"], requests[1].headers["X-Backup-Id"]);
    assert.deepEqual(requests[0].body, requests[1].body);
    const completed = await prisma.embeddedSyncState.findUniqueOrThrow({ where: { id: "manual" } });
    assert.equal(completed.pendingData, null);
    assert.ok(completed.lastSyncedAt);
    await prisma.embeddedSyncState.update({ where: { id: "manual" }, data: { leaseUntil: new Date(Date.now() + 60000) } });
    assert.deepEqual(await manualSync(), { busy: true });
    assert.equal(requests.length, 2);
  } finally {
    await prisma.embeddedSyncState.deleteMany({ where: { id: "manual" } });
    await prisma.$disconnect();
  }
});
