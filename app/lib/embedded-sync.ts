import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { prisma } from "./prisma";
import { databaseURL, deploymentMode } from "./deployment";
import { captureSnapshot, decodeSnapshot, snapshotChecksum } from "./embedded-snapshot";

export function syncConfiguration(env: NodeJS.ProcessEnv = process.env) {
  const deviceId = env.EMBEDDED_DEVICE_ID;
  const token = env.EMBEDDED_SYNC_TOKEN;
  const destination = env.EMBEDDED_SYNC_URL;
  if (!deviceId || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(deviceId)) throw new Error("Configure a valid EMBEDDED_DEVICE_ID.");
  if (!token || token.length < 32) throw new Error("EMBEDDED_SYNC_TOKEN must contain at least 32 characters.");
  if (!destination) throw new Error("Configure EMBEDDED_SYNC_URL.");
  const url = new URL(destination);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("EMBEDDED_SYNC_URL must be an HTTPS URL without embedded credentials, query or fragment.");
  }
  return { deviceId, token, url: url.toString() };
}

export async function manualSync() {
  if (deploymentMode() !== "embedded") throw new Error("Manual sync is available only in embedded mode.");
  const config = syncConfiguration();
  const leaseId = randomUUID();
  await prisma.embeddedSyncState.upsert({ where: { id: "manual" }, create: { id: "manual" }, update: {} });
  const claim = await prisma.embeddedSyncState.updateMany({
    where: { id: "manual", OR: [{ leaseUntil: null }, { leaseUntil: { lt: new Date() } }] },
    data: { leaseUntil: new Date(Date.now() + 180000), leaseId },
  });
  if (claim.count === 0) return { busy: true };
  try {
    let state = await prisma.embeddedSyncState.findUniqueOrThrow({ where: { id: "manual" } });
    if (state.pendingId && state.deviceId !== config.deviceId) throw new Error("Pending backup belongs to a different device ID. Restore the original EMBEDDED_DEVICE_ID before retrying.");
    if (!state.pendingData) {
      const pool = new Pool({ connectionString: databaseURL(), max: 1, connectionTimeoutMillis: 5000 });
      let payload: Buffer;
      try {
        payload = await captureSnapshot(pool);
      } finally {
        await pool.end();
      }
      const snapshot = await decodeSnapshot(payload);
      state = await prisma.embeddedSyncState.update({
        where: { id: "manual", leaseId, leaseUntil: { gt: new Date() } },
        data: { deviceId: config.deviceId, pendingData: new Uint8Array(payload), pendingId: randomUUID(), checksum: snapshotChecksum(payload), capturedAt: new Date(snapshot.capturedAt) },
      });
    }
    if (!state.pendingData || !state.pendingId || !state.checksum) throw new Error("Invalid pending snapshot state.");
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`, "Content-Type": "application/gzip",
        "X-Device-Id": config.deviceId, "X-Backup-Id": state.pendingId, "X-Snapshot-Checksum": state.checksum,
      },
      body: Buffer.from(state.pendingData),
      signal: AbortSignal.timeout(60000),
      redirect: "error",
    });
    if (!response.ok) throw new Error(`Cloud backup rejected: HTTP ${response.status}. Check online configuration and database availability.`);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || result.id !== state.pendingId ||
      !("checksum" in result) || result.checksum !== state.checksum) throw new Error("Cloud backup acknowledgement did not match the pending snapshot.");
    await prisma.embeddedSyncState.update({
      where: { id: "manual", leaseId, leaseUntil: { gt: new Date() } },
      data: { pendingData: null, pendingId: null, checksum: null, capturedAt: null, leaseUntil: null, leaseId: null, lastError: null, lastSyncedAt: new Date() },
    });
    return { busy: false, id: result.id };
  } catch (error) {
    await prisma.embeddedSyncState.updateMany({
      where: { id: "manual", leaseId },
      data: { leaseUntil: null, leaseId: null, lastError: error instanceof Error ? error.message : "Manual backup failed." },
    });
    throw error;
  }
}
