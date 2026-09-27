import { access } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { auth } from "@lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json";

type LatestPosition = {
  timestamp: string;
  latitude: number;
  longitude: number;
  heading: number | null;
  speedKnots: number | null;
};

function parseLatestPosition(payload: unknown): LatestPosition | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const latest = (payload as { latest?: unknown }).latest;
  if (!latest || typeof latest !== "object") {
    return null;
  }

  const latestObj = latest as {
    timestamp?: unknown;
    latitude?: unknown;
    longitude?: unknown;
    heading?: unknown;
    speedKnots?: unknown;
  };

  if (
    typeof latestObj.latitude !== "number" ||
    !Number.isFinite(latestObj.latitude) ||
    typeof latestObj.longitude !== "number" ||
    !Number.isFinite(latestObj.longitude)
  ) {
    return null;
  }

  return {
    timestamp:
      typeof latestObj.timestamp === "string"
        ? latestObj.timestamp
        : new Date().toISOString(),
    latitude: latestObj.latitude,
    longitude: latestObj.longitude,
    heading:
      typeof latestObj.heading === "number" && Number.isFinite(latestObj.heading)
        ? latestObj.heading
        : null,
    speedKnots:
      typeof latestObj.speedKnots === "number" && Number.isFinite(latestObj.speedKnots)
        ? latestObj.speedKnots
        : null,
  };
}

async function readStatusFilePathFromEnvFile(): Promise<string | null> {
  try {
    const envRaw = await readFile("/etc/agnerd/gnss.env", "utf8");
    const line = envRaw
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith("GNSS_STATUS_FILE="));

    if (!line) {
      return null;
    }

    const value = line.slice("GNSS_STATUS_FILE=".length).trim();
    if (!value) {
      return null;
    }

    return value.replace(/^['\"]|['\"]$/g, "");
  } catch {
    return null;
  }
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const statusFileFromEnvFile = await readStatusFilePathFromEnvFile();
  const candidates = [
    GNSS_STATUS_FILE,
    statusFileFromEnvFile,
    "/tmp/agnerd-gnss-status.json",
    "/var/tmp/agnerd-gnss-status.json",
  ].filter((value, index, arr): value is string => {
    if (!value) return false;
    return arr.indexOf(value) === index;
  });

  let firstPresentStatusFile: string | null = null;
  let resolvedStatusFile: string | null = null;
  let statusFilePresent = false;
  let statusFileReadError: string | null = null;
  let statusFileParseError: string | null = null;
  let latestMissingInFile: string | null = null;
  let latestPosition: LatestPosition | null = null;

  for (const candidate of candidates) {
    try {
      await access(candidate);
      statusFilePresent = true;
      if (!firstPresentStatusFile) {
        firstPresentStatusFile = candidate;
      }

      let raw = "";
      try {
        raw = await readFile(candidate, "utf8");
      } catch (error) {
        statusFileReadError = error instanceof Error ? error.message : String(error);
        continue;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw) as unknown;
      } catch (error) {
        statusFileParseError = error instanceof Error ? error.message : String(error);
        continue;
      }

      resolvedStatusFile = candidate;
      const latest = parseLatestPosition(parsed);
      if (latest) {
        latestPosition = latest;
        break;
      }

      latestMissingInFile = candidate;
    } catch {
      continue;
    }
  }

  return Response.json({
    ok: true,
    service: {
      expectedStatusFile: GNSS_STATUS_FILE,
      statusFileFromEnvFile,
      firstPresentStatusFile,
      resolvedStatusFile,
      attemptedStatusFiles: candidates,
      statusFilePresent,
      statusFileReadError,
      statusFileParseError,
      latestMissingInFile,
    },
    latestPosition,
    timestamp: new Date().toISOString(),
  });
}
