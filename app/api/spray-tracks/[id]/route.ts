import { deleteTrack, loadTrack, saveTrack, TrackRequestError } from "@lib/spray-track-store";
import { trackBody, trackFailure, trackInteger, trackResponse, trackUser } from "@lib/spray-track-api";
import { isSpraySave, isTrackId } from "@lib/spray-tracks";

type Context = { params: Promise<{ id: string }> };

async function identity(request: Request, context: Context) {
  const userId = await trackUser(request);
  const { id } = await context.params;
  if (!isTrackId(id)) throw new TrackRequestError("Invalid track ID.", 400);
  return { userId, id };
}

export async function GET(request: Request, context: Context) {
  try {
    const { userId, id } = await identity(request, context);
    const query = new URL(request.url).searchParams;
    const revision = query.has("revision") ? trackInteger(query.get("revision"), 0) : null;
    return trackResponse(await loadTrack(userId, id, trackInteger(query.get("after"), -1, -1), revision));
  } catch (error) { return trackFailure(error); }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const { userId, id } = await identity(request, context);
    const body = await trackBody(request);
    if (!isSpraySave(body)) throw new TrackRequestError("Invalid coverage batch or boom settings.", 400);
    return trackResponse({ track: await saveTrack(userId, id, body) });
  } catch (error) { return trackFailure(error); }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const { userId, id } = await identity(request, context);
    const revision = new URL(request.url).searchParams.get("revision");
    if (revision === null) throw new TrackRequestError("A track revision is required.", 400);
    await deleteTrack(userId, id, trackInteger(revision, 0));
    return trackResponse({ deleted: true });
  } catch (error) { return trackFailure(error); }
}
