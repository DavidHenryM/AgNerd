import { createTrack, listTracks, TrackRequestError } from "@lib/spray-track-store";
import { trackBody, trackFailure, trackResponse, trackUser } from "@lib/spray-track-api";
import { isSpraySettings, isTrackId } from "@lib/spray-tracks";

export async function GET(request: Request) {
  try {
    const userId = await trackUser(request);
    const cursor = new URL(request.url).searchParams.get("cursor");
    if (cursor !== null && !isTrackId(cursor)) throw new TrackRequestError("Invalid track cursor.", 400);
    return trackResponse(await listTracks(userId, cursor));
  } catch (error) { return trackFailure(error); }
}

export async function POST(request: Request) {
  try {
    const userId = await trackUser(request);
    const body = await trackBody(request);
    if (!isSpraySettings(body) || !("id" in body) || !isTrackId(body.id)) throw new TrackRequestError("Invalid spray track settings.", 400);
    return trackResponse({ track: await createTrack(userId, body.id, {
      widthMeters: body.widthMeters, offsetMeters: body.offsetMeters, forwardOffsetMeters: body.forwardOffsetMeters,
    }) });
  } catch (error) { return trackFailure(error); }
}
