import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import test from "node:test";
import { readFileSync } from "node:fs";
import { register } from "tsx/esm/api";

register();
const { databaseURL, deploymentMode, isSyncOperator } = await import("../app/lib/deployment.ts");
const { validateSnapshot, decodeSnapshot, snapshotChecksum, MAX_SNAPSHOT_BYTES } = await import("../app/lib/embedded-snapshot.ts");
const data = { version: 1, capturedAt: "2026-10-11T00:00:00Z", tables: { Farm: [{ id: "farm-1", name: "Test farm" }], user: [] } };

await test("online stays cloud-backed; embedded cannot silently fall back to cloud", () => {
  assert.equal(deploymentMode({}), "online");
  assert.equal(databaseURL({ DATABASE_URL: "postgresql://user@cloud.example/db" }), "postgresql://user@cloud.example/db");
  assert.throws(() => deploymentMode({ AGNERD_DEPLOYMENT_MODE: "typo" }), /must be online or embedded/);
  assert.throws(() => databaseURL({ AGNERD_DEPLOYMENT_MODE: "embedded", DATABASE_URL: "postgresql://cloud/db" }), /LOCAL_DATABASE_URL/);
  assert.throws(() => databaseURL({ AGNERD_DEPLOYMENT_MODE: "embedded", LOCAL_DATABASE_URL: "postgresql://user@cloud.example/db" }), /localhost/);
  assert.equal(databaseURL({ AGNERD_DEPLOYMENT_MODE: "embedded", LOCAL_DATABASE_URL: "postgresql://user@127.0.0.1/db", DATABASE_URL: "postgresql://user@cloud.example/db" }), "postgresql://user@127.0.0.1/db");
  assert.equal(isSyncOperator("Operator@Example.test", { EMBEDDED_SYNC_ADMIN_EMAILS: " operator@example.test " }), true);
  assert.equal(isSyncOperator("other@example.test", {}), false);
});

await test("snapshot format is versioned, checksum-protected and excludes credentials", async () => {
  assert.deepEqual(validateSnapshot(data), data);
  const encoded = gzipSync(JSON.stringify(data));
  assert.deepEqual(await decodeSnapshot(encoded), data);
  assert.equal(snapshotChecksum(encoded).length, 64);
  for (const table of ["account", "session", "verification", "invitation", "LoraDevice", "EmbeddedSyncState", "Unknown", "_AccountToUser"]) {
    assert.throws(() => validateSnapshot({ ...data, tables: { [table]: [] } }), /unsupported table/);
  }
  for (const key of ["password", "token", "accessToken", "refreshToken", "idToken"]) {
    assert.throws(() => validateSnapshot({ ...data, tables: { user: [{ [key]: "secret" }] } }), /authentication secrets/);
  }
  assert.throws(() => validateSnapshot({ ...data, version: 2 }), /incompatible/);
  await assert.rejects(decodeSnapshot(new Uint8Array(MAX_SNAPSHOT_BYTES + 1)), /16 MiB/);
  await assert.rejects(decodeSnapshot(Buffer.from("not gzip")));
});

await test("online installer returns before embedded provisioning and runtime file overrides source settings", () => {
  const installer = readFileSync(new URL("../install.sh", import.meta.url), "utf8");
  assert.match(installer, /online\)[\s\S]*exit 0[\s\S]*sudo apt update/);
  assert.match(installer, /BUILD_STATUS[\s\S]*bash scripts\/setup-embedded-database.sh/);
  assert.match(installer, /Installing \$example_file[\s\S]*bash scripts\/setup-embedded-database.sh[\s\S]*configure-embedded-env.mjs "\$SCRIPT_DIR\/.env"[\s\S]*configure-embedded-env.mjs \/etc\/agnerd\/.env/);
  assert.match(installer, /basename "\$file"\)" = "database.env" \] && continue/);
  const service = readFileSync(new URL("agnerd.service", import.meta.url), "utf8");
  assert.match(service, /EnvironmentFile=\/etc\/agnerd\/.env\s+EnvironmentFile=\/etc\/agnerd\/database.env/);
});
