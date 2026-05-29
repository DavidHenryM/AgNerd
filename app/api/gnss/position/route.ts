import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic";

const GNSS_INTERNAL_TOKEN = process.env.GNSS_INTERNAL_TOKEN;

function asOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }
  return value;
}

function badRequest(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function GET() {
  const latest = await prisma.geoPoint.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      heading: true,
    },
  });

  if (!latest) {
    return Response.json({ ok: true, position: null });
  }

  return Response.json({
    ok: true,
    position: {
      id: latest.id,
      latitude: latest.latitude,
      longitude: latest.longitude,
      heading: latest.heading,
    },
  });
}

export async function POST(request: Request) {
  if (GNSS_INTERNAL_TOKEN) {
    const token = request.headers.get("x-gnss-token");
    if (token !== GNSS_INTERNAL_TOKEN) {
      return badRequest("Unauthorized GNSS ingest token.", 401);
    }
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest("Invalid JSON payload.");
  }

  const latitude = asOptionalNumber(body.latitude);
  const longitude = asOptionalNumber(body.longitude);
  const heading = asOptionalNumber(body.heading);

  if (latitude === null || longitude === null) {
    return badRequest("latitude and longitude are required numbers.");
  }

  if (latitude < -90 || latitude > 90) {
    return badRequest("latitude out of range.");
  }

  if (longitude < -180 || longitude > 180) {
    return badRequest("longitude out of range.");
  }

  const timestampRaw = body.timestamp;
  const timestamp = typeof timestampRaw === "string" ? new Date(timestampRaw) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return badRequest("Invalid timestamp.");
  }

  const saved = await prisma.geoPoint.create({
    data: {
      latitude,
      longitude,
      heading,
    },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      heading: true,
    },
  });

  return Response.json({
    ok: true,
    saved,
    metadata: {
      timestamp: timestamp.toISOString(),
      fixType: body.fixType ?? null,
      satellites: asOptionalNumber(body.satellites),
      horizontalAccuracyMeters: asOptionalNumber(body.horizontalAccuracyMeters),
      verticalAccuracyMeters: asOptionalNumber(body.verticalAccuracyMeters),
      speedKnots: asOptionalNumber(body.speedKnots),
    },
  });
}
