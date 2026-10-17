import { auth } from "@lib/auth";
import { SPRAY_BODY_LIMIT } from "./spray-tracks";
import { TrackRequestError } from "./spray-track-store";

export async function trackUser(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw new TrackRequestError("Unauthorized", 401);
  return session.user.id;
}

export async function trackBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new TrackRequestError("Missing request body.", 400);
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const item = await reader.read();
    if (item.done) break;
    length += item.value.length;
    if (length > SPRAY_BODY_LIMIT) {
      await reader.cancel();
      throw new TrackRequestError("Spray track request is too large.", 413);
    }
    chunks.push(item.value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new TrackRequestError("Invalid JSON payload.", 400); }
}

export function trackResponse(value: unknown) {
  return Response.json(value, { headers: { "Cache-Control": "no-store" } });
}

export function trackFailure(error: unknown) {
  if (error instanceof TrackRequestError) return Response.json({ error: error.message }, { status: error.status });
  console.error("Spray track storage failed:", error);
  return Response.json({ error: "Spray track storage is unavailable. Retry when the database is available." }, { status: 503 });
}

export function trackInteger(value: string | null, fallback: number, minimum = 0) {
  if (value === null) return fallback;
  if (!/^-?\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < minimum || Number(value) > 2_147_483_646) {
    throw new TrackRequestError("Invalid track pagination or revision.", 400);
  }
  return Number(value);
}
