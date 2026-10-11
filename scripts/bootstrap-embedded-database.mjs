import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parse } from "dotenv";
import { Pool } from "pg";
import { register } from "tsx/esm/api";

register();
const { databaseURL, deploymentMode } = await import("../app/lib/deployment.ts");
const { businessDatabaseIsEmpty, captureSnapshot, restoreSnapshot, SnapshotCompatibilityError } = await import("../app/lib/embedded-snapshot.ts");

function databaseIdentity(value) {
  const url = new URL(value);
  const host = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ? "loopback" : url.hostname;
  return `${host}:${url.port || "5432"}${url.pathname}`;
}

export async function bootstrapEmbeddedDatabase(env, {
  createPool = options => new Pool(options),
  isEmpty = businessDatabaseIsEmpty,
  capture = captureSnapshot,
  restore = restoreSnapshot,
  log = console.log,
  warn = console.warn,
} = {}) {
  if (deploymentMode(env) !== "embedded") {
    log("Initial cloud import skipped: online deployment.");
    return "online";
  }
  const localURL = databaseURL(env);
  const local = createPool({ connectionString: localURL, max: 1, connectionTimeoutMillis: 5000 });
  try {
    if (!await isEmpty(local)) {
      log("Initial cloud import skipped: local business data already exists; no records were changed.");
      return "populated";
    }
    if (!env.PRISMA_DATABASE_POSTGRES_URL && !env.DATABASE_URL && !env.PRISMA_DATABASE_URL) {
      log("Initial cloud import skipped: no cloud PostgreSQL URL configured.");
      return "unconfigured";
    }
    const cloudURL = databaseURL({ ...env, AGNERD_DEPLOYMENT_MODE: "online" });
    if (databaseIdentity(cloudURL) === databaseIdentity(localURL)) {
      warn("Initial cloud import skipped: the configured cloud URL points to the local database.");
      return "same-database";
    }
    const cloud = createPool({ connectionString: cloudURL, max: 1, connectionTimeoutMillis: 5000, query_timeout: 45000 });
    try {
      try {
        await cloud.query("SELECT 1");
      } catch {
        warn("Initial cloud import skipped: cloud PostgreSQL is unreachable or login failed. Local installation will continue; retry the installer or import manually when available.");
        return "unavailable";
      }
      log("Importing cloud business data into the empty local database...");
      const payload = await capture(cloud);
      await restore(local, payload);
      log("Initial cloud import completed. Credentials, sessions and radio keys were excluded. Run the embedded-database.mjs user command to set a local password.");
      return "imported";
    } finally {
      await cloud.end();
    }
  } finally {
    await local.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const filename = process.argv[2];
    if (!filename) throw new Error("Specify the application environment file.");
    let input = "";
    for await (const chunk of process.stdin) input += chunk;
    const database = parse(input);
    if (database.AGNERD_DEPLOYMENT_MODE !== "embedded" || !database.LOCAL_DATABASE_URL) {
      throw new Error("Invalid provisioned database environment.");
    }
    const application = parse(await readFile(filename, "utf8"));
    await bootstrapEmbeddedDatabase({ ...application, ...process.env, ...database });
  } catch (error) {
    // Driver errors can contain credentials; never print them in installer output.
    if (error instanceof SnapshotCompatibilityError) console.error(error.message);
    console.error("Initial cloud import failed. Check local PostgreSQL, cloud read permissions, snapshot limits and matching schemas. The installer stopped; restore is transactional and existing local data is never overwritten.");
    process.exitCode = 1;
  }
}
