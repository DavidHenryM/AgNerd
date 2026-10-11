import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { bootstrapEmbeddedDatabase } from "./bootstrap-embedded-database.mjs";

const env = {
  AGNERD_DEPLOYMENT_MODE: "embedded",
  LOCAL_DATABASE_URL: "postgresql://local@127.0.0.1:5432/agnerd",
  DATABASE_URL: "postgresql://cloud@cloud.example/farm",
};

function fixture(options = {}) {
  const events = [];
  const messages = [];
  const pools = [];
  const payload = Buffer.from("snapshot");
  const dependencies = {
    createPool(config) {
      const pool = {
        config,
        async query(sql) {
          events.push(sql);
          if (options.offline) throw new Error("synthetic connection failure");
        },
        async end() { events.push(`end-${pools.indexOf(pool)}`); },
      };
      pools.push(pool);
      return pool;
    },
    async isEmpty(pool) {
      assert.equal(pool, pools[0]);
      events.push("empty");
      if (options.localFailure) throw new Error("local unavailable");
      return !options.populated;
    },
    async capture(pool) {
      assert.equal(pool, pools[1]);
      events.push("capture");
      if (options.captureFailure) throw new Error("capture failed");
      return payload;
    },
    async restore(pool, data) {
      assert.equal(pool, pools[0]);
      assert.equal(data, payload);
      events.push("restore");
      if (options.restoreFailure) throw new Error("restore failed");
    },
    log(message) { messages.push(message); },
    warn(message) { messages.push(message); },
  };
  return { events, messages, pools, dependencies };
}

await test("initial embedded import checks emptiness and cloud availability before read-only capture and restore", async () => {
  const f = fixture();
  assert.equal(await bootstrapEmbeddedDatabase(env, f.dependencies), "imported");
  assert.deepEqual(f.events, ["empty", "SELECT 1", "capture", "restore", "end-1", "end-0"]);
  assert.equal(f.pools[0].config.connectionString, env.LOCAL_DATABASE_URL);
  assert.equal(f.pools[1].config.connectionString, env.DATABASE_URL);
  assert.ok(f.messages.some(message => message.includes("set a local password")));
  assert.ok(!f.messages.some(message => message.includes("postgresql://")));
});

await test("online and populated embedded installs never access the cloud or restore", async () => {
  const online = fixture();
  assert.equal(await bootstrapEmbeddedDatabase({ ...env, AGNERD_DEPLOYMENT_MODE: "online" }, online.dependencies), "online");
  assert.deepEqual(online.events, []);
  const populated = fixture({ populated: true });
  assert.equal(await bootstrapEmbeddedDatabase(env, populated.dependencies), "populated");
  assert.deepEqual(populated.events, ["empty", "end-0"]);
  assert.equal(populated.pools.length, 1);
});

await test("missing cloud configuration and unavailable cloud explicitly skip without blocking offline installation", async () => {
  const missing = fixture();
  assert.equal(await bootstrapEmbeddedDatabase({ ...env, DATABASE_URL: undefined }, missing.dependencies), "unconfigured");
  assert.deepEqual(missing.events, ["empty", "end-0"]);
  const offline = fixture({ offline: true });
  assert.equal(await bootstrapEmbeddedDatabase(env, offline.dependencies), "unavailable");
  assert.deepEqual(offline.events, ["empty", "SELECT 1", "end-1", "end-0"]);
  assert.ok(offline.messages.some(message => message.includes("unreachable")));
});

await test("uses cloud URL precedence and refuses importing the same loopback database", async () => {
  const preferred = fixture();
  await bootstrapEmbeddedDatabase({ ...env, PRISMA_DATABASE_POSTGRES_URL: "postgresql://preferred.example/farm" }, preferred.dependencies);
  assert.equal(preferred.pools[1].config.connectionString, "postgresql://preferred.example/farm");
  const same = fixture();
  assert.equal(await bootstrapEmbeddedDatabase({ ...env, DATABASE_URL: "postgresql://other-user@localhost/agnerd" }, same.dependencies), "same-database");
  assert.deepEqual(same.events, ["empty", "end-0"]);
});

await test("local, capture and restore errors fail rather than claiming a successful import and close pools", async () => {
  for (const failure of ["localFailure", "captureFailure", "restoreFailure"]) {
    const f = fixture({ [failure]: true });
    await assert.rejects(bootstrapEmbeddedDatabase(env, f.dependencies));
    assert.equal(f.events.at(-1), "end-0");
    if (failure !== "localFailure") assert.ok(f.events.includes("end-1"));
    assert.ok(!f.messages.some(message => message.includes("import completed")));
  }
});

await test("installer bootstraps after local provisioning and before replacing or starting the application", () => {
  const installer = readFileSync(new URL("../install.sh", import.meta.url), "utf8");
  assert.match(installer, /online\)[\s\S]*exit 0[\s\S]*bootstrap-embedded-database/);
  assert.match(installer, /bash scripts\/setup-embedded-database.sh[\s\S]*configure-embedded-env.mjs \/etc\/agnerd\/.env[\s\S]*sudo cat \/etc\/agnerd\/database.env \|\s+sudo node scripts\/bootstrap-embedded-database.mjs \/etc\/agnerd\/.env[\s\S]*Installing the production application/);
});
