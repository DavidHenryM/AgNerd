import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { gzip, gunzip } from "node:zlib";
import type { Pool, PoolClient } from "pg";

const compress = promisify(gzip);
const decompress = promisify(gunzip);
export const MAX_SNAPSHOT_BYTES = 16 * 1024 * 1024;
export const MAX_SNAPSHOT_JSON_BYTES = 64 * 1024 * 1024;
export const SNAPSHOT_VERSION = 1;

// Explicit allowlist: never export authentication secrets or operational sync state.
export const BUSINESS_TABLES = [
  "Farm", "user", "Address", "Graze", "Breed", "Mob", "GrazeMob", "LivestockUnit",
  "OnFarm", "Ownership", "Stud", "StudSocietyRegistration", "StudSociety", "Pregnancy",
  "LivestockUnitPregnancy", "PregnancyTest", "ChemicalTreatment", "ChemicalProduct",
  "ActiveIngredient", "EstimatedBreedingValueDefinition", "EstimatedBreedingValueResult",
  "Paddock", "LivestockUnitPosition", "GeoPoint", "Gate", "GateStateChange",
  "MobMembership", "MobMovement", "PaddockFeedRecord", "PaddockWorkEvent", "WeightRecord",
  "Organization", "member", "SprayTrack", "SprayTrackStrip",
];

export interface BusinessSnapshot {
  version: number;
  capturedAt: string;
  tables: Record<string, Record<string, unknown>[]>;
}

export class SnapshotCompatibilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SnapshotCompatibilityError";
  }
}

const secretFields = new Set(["password", "token", "accessToken", "refreshToken", "idToken", "appKey"]);
function allowedTable(name: string) {
  if (BUSINESS_TABLES.includes(name)) return true;
  const join = /^_([A-Za-z][A-Za-z0-9]*)To([A-Za-z][A-Za-z0-9]*)$/.exec(name);
  return !!join && join.slice(1).every(model => BUSINESS_TABLES.includes(model === "User" ? "user" : model));
}

export function validateSnapshot(value: unknown): BusinessSnapshot {
  if (!value || typeof value !== "object" || !("version" in value) || value.version !== SNAPSHOT_VERSION ||
    !("capturedAt" in value) || typeof value.capturedAt !== "string" || !Number.isFinite(Date.parse(value.capturedAt)) ||
    !("tables" in value) || !value.tables || typeof value.tables !== "object" || Array.isArray(value.tables)) {
    throw new Error("Invalid or incompatible business snapshot.");
  }
  for (const [name, rows] of Object.entries(value.tables)) {
    if (!allowedTable(name) || !Array.isArray(rows)) throw new Error("Snapshot contains an unsupported table.");
    if (rows.length > 250000) throw new Error("Snapshot exceeds the per-table row limit.");
    for (const row of rows) {
      if (!row || typeof row !== "object" || Array.isArray(row) || Object.keys(row).some(key => secretFields.has(key))) {
        throw new Error("Snapshot contains invalid data or authentication secrets.");
      }
    }
  }
  return value as BusinessSnapshot;
}

function identifier(name: string) {
  return `"${name.replaceAll('"', '""')}"`;
}

async function snapshotTables(client: PoolClient) {
  const result = await client.query<{ name: string }>(
    `SELECT tablename AS name FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
  );
  return result.rows.map(row => row.name).filter(allowedTable);
}

export async function businessDatabaseIsEmpty(pool: Pool) {
  const client = await pool.connect();
  try {
    for (const name of await snapshotTables(client)) {
      const result = await client.query(`SELECT 1 FROM public.${identifier(name)} LIMIT 1`);
      if (result.rowCount) return false;
    }
    return true;
  } finally {
    client.release();
  }
}

export async function captureSnapshot(pool: Pool): Promise<Buffer> {
  const client = await pool.connect();
  const started = Date.now();
  try {
    await client.query("BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY");
    await client.query("SET LOCAL statement_timeout = '45000'");
    const tables: BusinessSnapshot["tables"] = {};
    let bytes = 0;
    for (const name of await snapshotTables(client)) {
      if (Date.now() - started > 60000) throw new Error("Snapshot capture timed out. Reduce local history size before retrying.");
      const result = await client.query<{ row: Record<string, unknown> }>(
        `SELECT to_jsonb(t) AS row FROM public.${identifier(name)} t LIMIT 250001`,
      );
      if (result.rowCount && result.rowCount > 250000) throw new Error("Snapshot exceeds the per-table row limit.");
      tables[name] = result.rows.map(row => row.row);
      bytes += Buffer.byteLength(JSON.stringify(tables[name]));
      if (bytes > MAX_SNAPSHOT_JSON_BYTES) throw new Error("Snapshot exceeds the 64 MiB data limit.");
    }
    const data = validateSnapshot({ version: SNAPSHOT_VERSION, capturedAt: new Date().toISOString(), tables });
    const json = Buffer.from(JSON.stringify(data));
    if (json.length > MAX_SNAPSHOT_JSON_BYTES) throw new Error("Snapshot exceeds the 64 MiB data limit.");
    const payload = await compress(json);
    if (payload.length > MAX_SNAPSHOT_BYTES) throw new Error("Snapshot exceeds the 16 MiB compressed limit.");
    await client.query("COMMIT");
    return payload;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function decodeSnapshot(payload: Uint8Array) {
  if (payload.length > MAX_SNAPSHOT_BYTES) throw new Error("Snapshot exceeds the 16 MiB compressed limit.");
  const json = await decompress(payload, { maxOutputLength: MAX_SNAPSHOT_JSON_BYTES });
  return validateSnapshot(JSON.parse(json.toString("utf8")));
}

export function snapshotChecksum(payload: Uint8Array) {
  return createHash("sha256").update(payload).digest("hex");
}

export async function restoreSnapshot(pool: Pool, payload: Uint8Array) {
  const snapshot = await decodeSnapshot(payload);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const tables = await snapshotTables(client);
    for (const name of tables) {
      await client.query(`LOCK TABLE public.${identifier(name)} IN ACCESS EXCLUSIVE MODE`);
      const result = await client.query(`SELECT 1 FROM public.${identifier(name)} LIMIT 1`);
      if (result.rowCount) throw new Error("Restore requires an empty business database; existing data will not be overwritten.");
    }
    const missing = tables.filter(name => !Object.hasOwn(snapshot.tables, name));
    const extra = Object.keys(snapshot.tables).filter(name => !tables.includes(name));
    if (missing.length || extra.length) {
      throw new SnapshotCompatibilityError(
        `Snapshot schema does not match this database. Missing from snapshot: ${missing.join(", ") || "none"}. ` +
        `Missing from local database: ${extra.join(", ") || "none"}. Align the business schemas and export a fresh snapshot; no data was restored.`,
      );
    }
    const columns = await client.query<{ table: string; column: string }>(
      `SELECT table_name AS "table", column_name AS "column" FROM information_schema.columns
       WHERE table_schema='public'`,
    );
    for (const [name, rows] of Object.entries(snapshot.tables)) {
      const expected = columns.rows.filter(column => column.table === name).map(column => column.column);
      if (rows.some(row => Object.keys(row).length !== expected.length ||
        expected.some(column => !Object.hasOwn(row, column)))) {
        throw new SnapshotCompatibilityError(
          `Snapshot columns do not match this database for table ${name}. Expected columns: ${expected.join(", ")}. ` +
          "Align the business schemas and export a fresh snapshot; no data was restored.",
        );
      }
    }
    const constraints = await client.query<{ table: string; name: string; deferrable: boolean; deferred: boolean }>(
      `SELECT c.relname AS "table", k.conname AS name, k.condeferrable AS deferrable, k.condeferred AS deferred
       FROM pg_constraint k JOIN pg_class c ON c.oid=k.conrelid
       JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND k.contype='f'`,
    );
    // Farm/User and other business relationships can form cycles during bootstrap.
    for (const key of constraints.rows) {
      if (tables.includes(key.table)) {
        await client.query(`ALTER TABLE public.${identifier(key.table)} ALTER CONSTRAINT ${identifier(key.name)} DEFERRABLE INITIALLY DEFERRED`);
      }
    }
    for (const [name, rows] of Object.entries(snapshot.tables)) {
      if (rows.length) await client.query(
        `INSERT INTO public.${identifier(name)} SELECT * FROM jsonb_populate_recordset(NULL::public.${identifier(name)}, $1::jsonb)`,
        [JSON.stringify(rows)],
      );
    }
    await client.query("SET CONSTRAINTS ALL IMMEDIATE");
    for (const key of constraints.rows) {
      if (tables.includes(key.table)) await client.query(
        `ALTER TABLE public.${identifier(key.table)} ALTER CONSTRAINT ${identifier(key.name)} ${key.deferrable
          ? `DEFERRABLE INITIALLY ${key.deferred ? "DEFERRED" : "IMMEDIATE"}` : "NOT DEFERRABLE"}`,
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
