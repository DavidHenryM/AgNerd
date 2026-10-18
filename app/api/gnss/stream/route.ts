import { auth } from "@lib/auth";
import { deploymentMode } from "@lib/deployment";
import { gnssDisplayFileCandidates, readGnssDisplay } from "@lib/gnss-display-file";
import { createGnssDisplayStream } from "@lib/gnss-display-stream";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (deploymentMode() !== "embedded") {
    return Response.json({ ok: false, error: "GNSS display stream is only available on embedded deployments." }, { status: 404 });
  }
  const hasSession = async () => Boolean(await auth.api.getSession({ headers: request.headers }));
  if (!(await hasSession())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const candidates = await gnssDisplayFileCandidates();
  const stream = createGnssDisplayStream({
    readDisplay: () => readGnssDisplay(candidates),
    checkSession: hasSession,
    signal: request.signal,
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      // no-transform stops response compression from buffering the stream.
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
