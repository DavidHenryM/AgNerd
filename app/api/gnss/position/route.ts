import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { headers } from "next/headers";
import { recordGnssHistory } from "@lib/gnss-history";

export const dynamic = "force-dynamic";

const GNSS_INTERNAL_TOKEN = process.env.GNSS_INTERNAL_TOKEN;

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

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
  try {
    return await recordGnssHistory(request, {
      internalToken: GNSS_INTERNAL_TOKEN,
      hasSession: async req => !!await auth.api.getSession({ headers: req.headers }),
      save: data => prisma.geoPoint.create({
        data,
        select: { id: true, latitude: true, longitude: true, heading: true },
      }),
    });
  } catch (error) {
    console.error("GNSS spray history recording failed:", error);
    return Response.json({ error: "Unable to record spray history. Check database availability and account limits." }, { status: 503 });
  }
}
