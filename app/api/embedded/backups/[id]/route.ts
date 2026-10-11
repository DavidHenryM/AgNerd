import { auth } from "@lib/auth";
import { deploymentMode, isSyncOperator } from "@lib/deployment";
import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (deploymentMode() !== "online") return Response.json({ error: "Cloud backups are unavailable." }, { status: 404 });
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (!isSyncOperator(session.user.email)) return Response.json({ error: "Backup operator access required." }, { status: 403 });
    const { id } = await context.params;
    const backup = await prisma.embeddedBackup.findUnique({ where: { id } });
    if (!backup) return Response.json({ error: "Backup not found." }, { status: 404 });
    return new Response(Buffer.from(backup.payload), {
      headers: {
        "Content-Type": "application/gzip",
        "Content-Disposition": `attachment; filename="agnerd-${backup.id}.json.gz"`,
        "Cache-Control": "no-store", "X-Snapshot-Checksum": backup.checksum,
      },
    });
  } catch (error) {
    console.error("Cloud backup download failed:", error);
    return Response.json({ error: "Unable to download backup." }, { status: 503 });
  }
}
