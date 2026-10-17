import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { gzipSync } from "node:zlib";

const { bootstrapEmbeddedDatabase } = await import("./bootstrap-embedded-database.mjs");
const { businessDatabaseIsEmpty, captureSnapshot, decodeSnapshot, restoreSnapshot } = await import("../app/lib/embedded-snapshot.ts");
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
    assert.equal(await businessDatabaseIsEmpty(destination), true);
    await source.query('INSERT INTO "Farm" (id,name,"lotSectionPlan") VALUES ($1,$2,$3)', ["farm-1", "Farm", ["Lot 1"]]);
    await source.query('INSERT INTO "user" (id,email,"firstName","lastName",name,"farmId","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,NOW())',
      ["user-1", "operator@example.test", "Test", "User", "Test User", "farm-1"]);
    await source.query('INSERT INTO account (id,"accountId","providerId","userId",password,"updatedAt") VALUES ($1,$2,$3,$4,$5,NOW())',
      ["account-1", "user-1", "credential", "user-1", "do-not-export"]);
    await source.query('INSERT INTO "Stud" (id,name) VALUES ($1,$2)', ["stud-1", "Test"]);
    await source.query('INSERT INTO "_FarmToStud" ("A","B") VALUES ($1,$2)', ["farm-1", "stud-1"]);
    await source.query('INSERT INTO "SprayTrack" (id,"userId","updatedAt","widthMeters","offsetMeters","forwardOffsetMeters","totalAreaSqMeters") VALUES ($1,$2,NOW(),6,0,-1.5,6)',
      ["track-1", "user-1"]);
    await source.query('INSERT INTO "SprayTrackStrip" ("trackId",sequence,coordinates,"areaSqMeters") VALUES ($1,0,$2,6)',
      ["track-1", [148, -36, 148.0001, -36, 148.0001, -35.9999, 148, -35.9999]]);
    assert.equal(await businessDatabaseIsEmpty(source), false);
    const snapshot = await captureSnapshot(source);
    const decoded = await decodeSnapshot(snapshot);
    assert.equal(decoded.tables.Farm[0].id, "farm-1");
    assert.equal(decoded.tables.user[0].id, "user-1");
    assert.equal(decoded.tables._FarmToStud.length, 1);
    assert.equal(decoded.tables.SprayTrack[0].totalAreaSqMeters, 6);
    assert.equal(decoded.tables.SprayTrackStrip[0].coordinates.length, 8);
    assert.equal(decoded.tables.account, undefined);
    assert.ok(!JSON.stringify(decoded).includes("do-not-export"));
    const incomplete = structuredClone(decoded);
    delete incomplete.tables.Gate;
    await assert.rejects(restoreSnapshot(destination, gzipSync(JSON.stringify(incomplete))), /Missing from snapshot: Gate/);
    const extra = structuredClone(decoded);
    extra.tables._FarmToMob = [];
    await assert.rejects(restoreSnapshot(destination, gzipSync(JSON.stringify(extra))), /Missing from local database: _FarmToMob/);
    const incompatible = structuredClone(decoded);
    incompatible.tables.Farm[0].unexpectedColumn = "must-not-be-dropped";
    await assert.rejects(restoreSnapshot(destination, gzipSync(JSON.stringify(incompatible))), /columns do not match/);
    assert.equal((await destination.query('SELECT * FROM "Farm"')).rowCount, 0);
    const env = { AGNERD_DEPLOYMENT_MODE: "embedded", LOCAL_DATABASE_URL: restoreURL, DATABASE_URL: sourceURL };
    const temporary = await mkdtemp(path.join(tmpdir(), "agnerd-bootstrap-"));
    try {
      const filename = path.join(temporary, ".env");
      await writeFile(filename, `DATABASE_URL=${JSON.stringify(sourceURL)}\n`);
      const environment = { ...process.env, NODE_OPTIONS: "" };
      for (const key of ["PRISMA_DATABASE_POSTGRES_URL", "DATABASE_URL", "PRISMA_DATABASE_URL"]) delete environment[key];
      const result = spawnSync(process.execPath, [
        fileURLToPath(new URL("bootstrap-embedded-database.mjs", import.meta.url)), filename,
      ], {
        input: `AGNERD_DEPLOYMENT_MODE=embedded\nLOCAL_DATABASE_URL=${JSON.stringify(restoreURL)}\n`,
        encoding: "utf8",
        env: environment,
      });
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /Initial cloud import completed/);
      assert.ok(!result.stdout.includes(sourceURL));
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
    assert.equal((await destination.query('SELECT * FROM "_FarmToStud"')).rowCount, 1);
    assert.equal((await destination.query('SELECT * FROM "SprayTrackStrip" WHERE "trackId"=$1', ["track-1"])).rowCount, 1);
    assert.equal((await destination.query("SELECT * FROM account")).rowCount, 0);
    await assert.rejects(restoreSnapshot(destination, snapshot), /empty business database/);
    assert.equal((await destination.query('SELECT * FROM "Farm"')).rowCount, 1);
    assert.equal(await bootstrapEmbeddedDatabase(env, { log() {}, warn() {} }), "populated");
  } finally {
    await source.end();
    await destination.end();
  }
});
