import { probeInternet, type InternetStatus } from "@lib/internet-status";
import { auth } from "@lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

let cached: Promise<InternetStatus> | null = null;
let expiresAt = 0;

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!cached || Date.now() >= expiresAt) {
    cached = probeInternet();
    expiresAt = Date.now() + 15000;
  }
  return Response.json(await cached, { headers: { "Cache-Control": "no-store" } });
}
