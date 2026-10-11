import { deploymentMode } from "@lib/deployment";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ mode: deploymentMode() }, { headers: { "Cache-Control": "no-store" } });
}
