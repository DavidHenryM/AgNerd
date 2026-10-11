import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import { gzipSync } from "node:zlib";
import { register } from "tsx/esm/api";

register();
const { captureSnapshot, decodeSnapshot, restoreSnapshot } = await import("../app/lib/embedded-snapshot.ts");
const sourceURL = process.env.AGNERD_TEST_DATABASE_URL;
const restoreURL = process.env.AGNERD_TEST_RESTORE_DATABASE_URL;

await test("PostgreSQL snapshot captures business relationships, excludes credentials and restores atomically", {
  skip: !sourceURL || !restoreURL,
}, async () => {
  for (const value of [sourceURL, restoreURL]) {
    const url = new URL(value);
    assert.ok(["127.0.0.1", "localhost"].includes(url.hostname) && url.pathname.endsWith("_test"),
      "Integration tests require explicitly configured loopback databases ending in _test");
  }
  const source = new Pool({ connectionString: sourceURL });
  const destination = new Pool({ connectionString: restoreURL });
  try {
    const schema = await readFile(new URL("../prisma/embedded-schema.sql", import.meta.url), "utf8");
    await source.query(schema);
    await destination.query(schema);
    await source.query('INSERT INTO "Farm" (id,name,"lotSectionPlan") VALUES ($1,$2,$3)', ["farm-1", "Farm", ["Lot 1"]]);
    await source.query('INSERT INTO "user" (id,email,"firstName","lastName",name,"farmId","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,NOW())',
      ["user-1", "operator@example.test", "Test", "User", "Test User", "farm-1"]);
    await source.query('INSERT INTO account (id,"accountId","providerId","userId",password,"updatedAt") VALUES ($1,$2,$3,$4,$5,NOW())',
      ["account-1", "user-1", "credential", "user-1", "do-not-export"]);
    await source.query('INSERT INTO "Stud" (id,name) VALUES ($1,$2)', ["stud-1", "Test"]);
    await source.query('INSERT INTO "_FarmToStud" ("A","B") VALUES ($1,$2)', ["farm-1", "stud-1"]);
    const snapshot = await captureSnapshot(source);
    const decoded = await decodeSnapshot(snapshot);
    assert.equal(decoded.tables.Farm[0].id, "farm-1");
    assert.equal(decoded.tables.user[0].id, "user-1");
    assert.equal(decoded.tables._FarmToStud.length, 1);
    assert.equal(decoded.tables.account, undefined);
    assert.ok(!JSON.stringify(decoded).includes("do-not-export"));
    const incomplete = structuredClone(decoded);
    delete incomplete.tables.Gate;
    await assert.rejects(restoreSnapshot(destination, gzipSync(JSON.stringify(incomplete))), /schema does not match/);
    const incompatible = structuredClone(decoded);
    incompatible.tables.Farm[0].unexpectedColumn = "must-not-be-dropped";
    await assert.rejects(restoreSnapshot(destination, gzipSync(JSON.stringify(incompatible))), /columns do not match/);
    assert.equal((await destination.query('SELECT * FROM "Farm"')).rowCount, 0);
    await restoreSnapshot(destination, snapshot);
    assert.equal((await destination.query('SELECT * FROM "_FarmToStud"')).rowCount, 1);
    assert.equal((await destination.query("SELECT * FROM account")).rowCount, 0);
    await assert.rejects(restoreSnapshot(destination, snapshot), /empty business database/);
    assert.equal((await destination.query('SELECT * FROM "Farm"')).rowCount, 1);
  } finally {
    await source.end();
    await destination.end();
  }
});
