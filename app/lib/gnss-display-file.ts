import { readFile } from "node:fs/promises";
import { parseGnssDisplay, type GnssDisplay } from "./gnss-display";

const DEFAULT_DISPLAY_FILE = "/tmp/agnerd-gnss-display.json";
const FALLBACK_DISPLAY_FILE = "/var/tmp/agnerd-gnss-display.json";
const GNSS_ENV_FILE = "/etc/agnerd/gnss.env";

export async function readGnssEnvValue(key: string): Promise<string | null> {
  try {
    const line = (await readFile(GNSS_ENV_FILE, "utf8"))
      .split(/\r?\n/)
      .map(entry => entry.trim())
      .find(entry => entry.startsWith(`${key}=`));
    const value = line?.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
    return value || null;
  } catch {
    return null;
  }
}

export async function gnssDisplayFileCandidates(): Promise<string[]> {
  const candidates = [
    process.env.GNSS_DISPLAY_FILE,
    await readGnssEnvValue("GNSS_DISPLAY_FILE"),
    DEFAULT_DISPLAY_FILE,
    FALLBACK_DISPLAY_FILE,
  ];
  return candidates.filter((value, index): value is string => Boolean(value) && candidates.indexOf(value) === index);
}

/** Reads the newest valid display payload from the candidate files. */
export async function readGnssDisplay(candidates: string[]): Promise<GnssDisplay | null> {
  let newest: GnssDisplay | null = null;
  for (const candidate of candidates) {
    try {
      const display = parseGnssDisplay(JSON.parse(await readFile(candidate, "utf8")));
      if (display && (!newest || display.publishedAtMs > newest.publishedAtMs)) newest = display;
    } catch {
      continue;
    }
  }
  return newest;
}
