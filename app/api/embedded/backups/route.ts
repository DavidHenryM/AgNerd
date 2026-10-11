import { timingSafeEqual } from "node:crypto";
import { auth } from "@lib/auth";
import { deploymentMode, isSyncOperator } from "@lib/deployment";
import { decodeSnapshot, MAX_SNAPSHOT_BYTES, snapshotChecksum } from "@lib/embedded-snapshot";
import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic";
export const maxDuration = 90;

export async function POST(request: Request) {
  if (deploymentMode() !== "online") return Response.json({ error: "Cloud backup ingestion is unavailable." }, { status: 404 });
  const token = process.env.EMBEDDED_SYNC_TOKEN;
  const provided = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token || token.length < 32 || !provided || Buffer.byteLength(token) !== Buffer.byteLength(provided) ||
    !timingSafeEqual(Buffer.from(token), Buffer.from(provided))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const deviceId = request.headers.get("x-device-id");
  const id = request.headers.get("x-backup-id");
  const checksum = request.headers.get("x-snapshot-checksum");
  const devices = (process.env.EMBEDDED_ALLOWED_DEVICE_IDS ?? "").split(",").map(value => value.trim());
  if (!deviceId || !devices.includes(deviceId)) return Response.json({ error: "Device not registered." }, { status: 403 });
  if (!id || !/^[0-9a-f-]{36}$/.test(id) || !checksum || !/^[0-9a-f]{64}$/.test(checksum) ||
    request.headers.get("content-type") !== "application/gzip") return Response.json({ error: "Invalid backup metadata." }, { status: 400 });
  try {
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: "Missing backup data." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const item = await reader.read();
      if (item.done) break;
      bytes += item.value.length;
      if (bytes > MAX_SNAPSHOT_BYTES) {
        await reader.cancel();
        return Response.json({ error: "Backup exceeds 16 MiB." }, { status: 413 });
      }
      chunks.push(item.value);
    }
    const payload = Buffer.concat(chunks);
    if (snapshotChecksum(payload) !== checksum) return Response.json({ error: "Backup checksum mismatch." }, { status: 400 });
    let snapshot;
    try { snapshot = await decodeSnapshot(payload); } catch {
      return Response.json({ error: "Invalid, oversized or incompatible business snapshot." }, { status: 400 });
    }
    const saved = await prisma.embeddedBackup.upsert({
      where: { id },
      create: { id, deviceId, checksum, capturedAt: new Date(snapshot.capturedAt), payload },
      update: {},
      select: { deviceId: true, checksum: true },
    });
    if (saved.deviceId !== deviceId || saved.checksum !== checksum) return Response.json({ error: "Backup ID already belongs to different content." }, { status: 409 });
    return Response.json({ id, checksum });
  } catch (error) {
    console.error("Cloud backup storage failed:", error);
    return Response.json({ error: "Cloud backup storage is unavailable." }, { status: 503 });
  }
}

export async function GET(request: Request) {
  if (deploymentMode() !== "online") return Response.json({ error: "Cloud backups are unavailable." }, { status: 404 });
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (!isSyncOperator(session.user.email)) return Response.json({ error: "Backup operator access required." }, { status: 403 });
    const backups = await prisma.embeddedBackup.findMany({
      orderBy: { createdAt: "desc" }, take: 50,
      select: { id: true, deviceId: true, checksum: true, createdAt: true, capturedAt: true },
    });
    return Response.json({ backups }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Cloud backup listing failed:", error);
    return Response.json({ error: "Cloud backup storage is unavailable." }, { status: 503 });
  }
}
