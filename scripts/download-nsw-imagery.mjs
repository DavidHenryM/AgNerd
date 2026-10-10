import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";
import { imageryManifest } from "./prepare-local-imagery.mjs";

export const SERVICE_URL = "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer";
export const DATASET_ID = "dalgety-nsw-imagery-z18-v1";

export function nswManifest() {
  return {
    id: DATASET_ID,
    title: "Dalgety NSW aerial imagery mosaic",
    bounds: imageryManifest().bounds,
    minZoom: 0,
    maxZoom: 18,
    format: "png",
    attribution: "NSW Spatial Services / Department of Customer Service; includes third-party imagery (see source-metadata.json)",
    capturedAt: null,
    resolutionMeters: 0.48,
    notes: "Output pixel spacing; native detail and dates vary",
    source: SERVICE_URL,
    permission: "Downloaded with user-confirmed permission; not licensed for redistribution by this application.",
  };
}

export function tilesForBounds(bounds, maxZoom) {
  const [west, south, east, north] = bounds;
  if (!bounds.every(Number.isFinite) || west >= east || south >= north ||
    west < -180 || east > 180 || south < -85 || north > 85 ||
    !Number.isInteger(maxZoom) || maxZoom < 0 || maxZoom > 18) throw new Error("Invalid download bounds or zoom");
  const tiles = [];
  for (let z = 0; z <= maxZoom; z++) {
    const n = 2 ** z;
    const column = lon => (lon + 180) / 360 * n;
    const row = lat => (1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * n;
    for (let x = Math.floor(column(west)); x < Math.min(n, Math.ceil(column(east))); x++) {
      for (let y = Math.floor(row(north)); y < Math.min(n, Math.ceil(row(south))); y++) tiles.push({ z, x, y });
    }
  }
  return tiles;
}

export async function fetchWithRetry(url, fetchImpl = fetch, wait = delay) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetchImpl(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${url}`);
        if (response.status < 500 && response.status !== 429) {
          error.permanent = true;
        }
        throw error;
      }
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (error.permanent || attempt === 4) throw error;
      console.warn(`Download attempt ${attempt + 1} failed: ${error.message}; retrying`);
      await wait(1000 * 2 ** attempt);
    }
  }
}

async function exists(filename) {
  try {
    await stat(filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function validateTile(bytes) {
  const { info } = await sharp(bytes).raw().toBuffer({ resolveWithObject: true });
  if (info.width !== 256 || info.height !== 256) throw new Error("Expected a 256x256 imagery tile");
}

export async function downloadNswImagery(root, {
  manifest = nswManifest(),
  fetchBytes = fetchWithRetry,
  log = console.log,
} = {}) {
  if (!path.isAbsolute(root)) throw new Error("Map root must be an absolute path");
  const tiles = tilesForBounds(manifest.bounds, manifest.maxZoom);
  const destination = path.join(root, manifest.id);
  const staging = path.join(root, `.${manifest.id}.download`);
  if (await exists(destination)) throw new Error(`Dataset already exists: ${destination}; nothing overwritten`);
  await mkdir(staging, { recursive: true });
  const planFile = path.join(staging, "download-plan.json");
  const plan = JSON.stringify({ service: SERVICE_URL, manifest, tiles: tiles.length });
  if (await exists(planFile)) {
    if (await readFile(planFile, "utf8") !== plan) throw new Error("Existing download plan differs; use a new dataset ID");
  } else await writeFile(planFile, plan);

  const metadataFile = path.join(staging, "source-metadata.json");
  if (!await exists(metadataFile)) {
    const service = JSON.parse((await fetchBytes(`${SERVICE_URL}?f=pjson`)).toString());
    const [west, south, east, north] = manifest.bounds;
    const query = new URLSearchParams({
      f: "json", where: "1=1", geometry: [west, south, east, north].join(","),
      geometryType: "esriGeometryEnvelope", inSR: "4326", spatialRel: "esriSpatialRelIntersects",
      outFields: "*", returnGeometry: "false",
    });
    const footprints = JSON.parse((await fetchBytes(`${SERVICE_URL}/0/query?${query}`)).toString());
    if (service.error || footprints.error || footprints.exceededTransferLimit) throw new Error("Incomplete or invalid NSW source metadata");
    await writeFile(metadataFile, JSON.stringify({
      retrievedAt: new Date().toISOString(), service, footprints,
      note: "Footprints overlap; catalogue dates do not establish a single capture date or native resolution for the mosaic.",
    }, null, 2));
  }

  let completed = 0;
  let next = 0;
  let failure;
  log(`Downloading ${tiles.length} tiles with two workers; rerun the same command to resume.`);
  async function worker() {
    while (next < tiles.length && !failure) {
      const { z, x, y } = tiles[next++];
      try {
        const directory = path.join(staging, String(z), String(x));
        const filename = path.join(directory, `${y}.png`);
        if (await exists(filename)) {
          await validateTile(await readFile(filename));
        } else {
          const bytes = await fetchBytes(`${SERVICE_URL}/tile/${z}/${y}/${x}`);
          await validateTile(bytes);
          const png = await sharp(bytes).png().toBuffer();
          await mkdir(directory, { recursive: true });
          await writeFile(`${filename}.part`, png);
          await rename(`${filename}.part`, filename);
        }
        completed++;
        if (completed % 100 === 0 || completed === tiles.length) log(`${completed}/${tiles.length} tiles validated`);
      } catch (error) {
        failure = error;
      }
    }
  }
  await Promise.all([worker(), worker()]);
  if (failure) throw new Error(`Download stopped; completed tiles retained for resume: ${failure.message}`, { cause: failure });
  await writeFile(path.join(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await rename(staging, destination);
  return destination;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = process.argv[2];
  if (!root || !path.isAbsolute(root)) throw new Error("Usage: npm run maps:download-nsw -- ABSOLUTE_MAP_ROOT");
  console.log("Use only with permission for persistent offline download from the NSW imagery service.");
  console.log(`Dataset ready: ${await downloadNswImagery(root)}`);
}
