export interface HistoryPoint {
  latitude: number;
  longitude: number;
  heading: number | null;
}

interface HistoryDependencies {
  internalToken?: string;
  hasSession: (request: Request) => Promise<boolean>;
  save: (point: HistoryPoint) => Promise<HistoryPoint & { id: string }>;
}

function optionalNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function recordGnssHistory(request: Request, dependencies: HistoryDependencies) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Invalid position payload." }, { status: 400 });
  }
  const body = payload as Record<string, unknown>;
  if (body.spraying !== undefined && typeof body.spraying !== "boolean") {
    return Response.json({ error: "spraying must be a boolean." }, { status: 400 });
  }
  if (body.spraying === true) {
    if (!await dependencies.hasSession(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (dependencies.internalToken && request.headers.get("x-gnss-token") !== dependencies.internalToken) {
    return Response.json({ error: "Unauthorized GNSS ingest token." }, { status: 401 });
  }
  const latitude = optionalNumber(body.latitude);
  const longitude = optionalNumber(body.longitude);
  if (latitude === null || longitude === null) {
    return Response.json({ error: "latitude and longitude are required numbers." }, { status: 400 });
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return Response.json({ error: "Position out of range." }, { status: 400 });
  }
  const timestamp = typeof body.timestamp === "string" ? new Date(body.timestamp) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return Response.json({ error: "Invalid timestamp." }, { status: 400 });
  }
  // Reader updates are acknowledged explicitly without storing non-spraying history.
  if (body.spraying !== true) {
    return Response.json({ ok: true, recorded: false, reason: "Spraying is not enabled." });
  }
  const saved = await dependencies.save({ latitude, longitude, heading: optionalNumber(body.heading) });
  return Response.json({
    ok: true,
    recorded: true,
    saved,
    metadata: {
      timestamp: timestamp.toISOString(),
      fixType: body.fixType ?? null,
      satellites: optionalNumber(body.satellites),
      horizontalAccuracyMeters: optionalNumber(body.horizontalAccuracyMeters),
      verticalAccuracyMeters: optionalNumber(body.verticalAccuracyMeters),
      speedKnots: optionalNumber(body.speedKnots),
    },
  });
}
