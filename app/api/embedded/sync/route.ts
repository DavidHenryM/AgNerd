import { auth } from "@lib/auth";
import { deploymentMode, isSyncOperator } from "@lib/deployment";
import { manualSync, syncConfiguration } from "@lib/embedded-sync";
import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

async function authorize(request: Request) {
  if (deploymentMode() !== "embedded") return Response.json({ error: "Embedded sync is unavailable." }, { status: 404 });
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSyncOperator(session.user.email)) return Response.json({ error: "Only configured sync operators can back up this device." }, { status: 403 });
}

export async function GET(request: Request) {
  try {
    const rejected = await authorize(request);
    if (rejected) return rejected;
    const state = await prisma.embeddedSyncState.findUnique({ where: { id: "manual" } });
    let configurationError: string | null = null;
    try { syncConfiguration(); } catch (error) { configurationError = error instanceof Error ? error.message : "Invalid sync configuration."; }
    return Response.json({
      pending: !!state?.pendingId,
      busy: !!state?.leaseUntil && state.leaseUntil.getTime() > Date.now(),
      lastSyncedAt: state?.lastSyncedAt ?? null, lastError: state?.lastError ?? null, configurationError,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Embedded backup status failed:", error);
    return Response.json({ error: "Unable to read local backup status." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const rejected = await authorize(request);
    if (rejected) return rejected;
    const origin = request.headers.get("origin");
    const trustedOrigins = [
      new URL(request.url).origin,
      process.env.BETTER_AUTH_URL,
      ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "").split(","),
    ].map(value => value?.trim()).filter((value): value is string => !!value)
      .map(value => new URL(value).origin);
    if (!origin || !trustedOrigins.includes(origin)) {
      return Response.json({ error: "Invalid request origin." }, { status: 403 });
    }
    const result = await manualSync();
    return Response.json(result, { status: result.busy ? 409 : 200 });
  } catch (error) {
    console.error("Embedded manual backup failed:", error);
    return Response.json({ error: error instanceof Error ? error.message : "Manual backup failed." }, { status: 503 });
  }
}
