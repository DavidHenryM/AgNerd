import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { parse } from "dotenv";
import test from "node:test";

const script = fileURLToPath(new URL("configure-embedded-env.mjs", import.meta.url));
const database = {
  AGNERD_DEPLOYMENT_MODE: "embedded",
  LOCAL_DATABASE_URL: "postgresql://agnerd:test-password@127.0.0.1:5432/agnerd",
};
function configure(filename, values = database) {
  return spawnSync(process.execPath, [script, filename], {
    input: Object.entries(values).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join("\n"),
    encoding: "utf8",
    env: { ...process.env, NODE_OPTIONS: "" },
  });
}

await test("embedded installer persists actual runtime credentials and preserves unrelated settings", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "agnerd-env-"));
  const filename = path.join(directory, ".env");
  try {
    const original = '# Keep cloud settings for online use\r\nDATABASE_URL="postgresql://cloud.example/farm"\r\nEMBEDDED_SYNC_TOKEN=keep-me\r\n';
    await writeFile(filename, original);
    const result = configure(filename);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, "");
    const saved = await readFile(filename, "utf8");
    assert.ok(saved.startsWith(original.replaceAll("\r\n", "\n")));
    assert.deepEqual(parse(saved), {
      DATABASE_URL: "postgresql://cloud.example/farm",
      EMBEDDED_SYNC_TOKEN: "keep-me",
      ...database,
    });
    assert.equal(configure(filename).status, 0);
    assert.equal(await readFile(filename, "utf8"), saved, "reinstall must be idempotent");
    if (process.platform !== "win32") assert.equal((await stat(filename)).mode & 0o777, 0o600);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

await test("replaces duplicate/exported deployment values and creates missing environment files", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "agnerd-env-"));
  const filename = path.join(directory, ".env");
  try {
    assert.equal(configure(filename).status, 0);
    assert.deepEqual(parse(await readFile(filename, "utf8")), database);
    await writeFile(filename, 'export AGNERD_DEPLOYMENT_MODE=online\nLOCAL_DATABASE_URL=postgresql://build-only@localhost/db\nLOCAL_DATABASE_URL=postgresql://wrong@localhost/db\n# LOCAL_DATABASE_URL is managed by installer\n');
    const result = configure(filename);
    assert.equal(result.status, 0, result.stderr);
    const saved = await readFile(filename, "utf8");
    assert.deepEqual(parse(saved), database);
    assert.equal(saved.match(/^LOCAL_DATABASE_URL=/gm).length, 1);
    assert.ok(saved.includes("# LOCAL_DATABASE_URL is managed by installer"));
    assert.ok(!saved.includes("build-only"));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

await test("invalid provisioning input leaves application environment untouched", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "agnerd-env-"));
  const filename = path.join(directory, ".env");
  try {
    await writeFile(filename, "UNCHANGED=true\n");
    for (const values of [
      { AGNERD_DEPLOYMENT_MODE: "online", LOCAL_DATABASE_URL: database.LOCAL_DATABASE_URL },
      { AGNERD_DEPLOYMENT_MODE: "embedded" },
      { ...database, LOCAL_DATABASE_URL: "postgresql://cloud.example/db" },
    ]) {
      assert.notEqual(configure(filename, values).status, 0);
      assert.equal(await readFile(filename, "utf8"), "UNCHANGED=true\n");
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
