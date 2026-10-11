import { auth } from "@lib/auth";
import { headers } from "next/headers";
import { respondToMapRequest } from "@lib/local-imagery";
import { deploymentMode } from "@lib/deployment";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ segments: string[] }> }) {
  if (deploymentMode() !== "embedded") {
    const { segments } = await context.params;
    return segments.length === 1 && segments[0] === "manifest"
      ? Response.json({ enabled: false }, { headers: { "Cache-Control": "no-store" } })
      : Response.json({ error: "Local imagery is available only on embedded deployments." }, { status: 404 });
  }
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { segments } = await context.params;
  return respondToMapRequest(segments, process.env.LOCAL_IMAGERY_ROOT || "/var/lib/agnerd/maps", process.env.LOCAL_IMAGERY_DATASET);
}
