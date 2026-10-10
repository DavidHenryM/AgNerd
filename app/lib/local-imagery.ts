import { readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { parseMapManifest, type MapManifest } from "./map-manifest";

export class MapRequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

function contained(root: string, filename: string) {
  const relative = path.relative(root, filename);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

export async function readActiveMap(root: string, dataset: string): Promise<MapManifest> {
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(dataset)) throw new MapRequestError("Invalid dataset ID", 400);
  const base = await realpath(root);
  const filename = await realpath(path.join(base, dataset, "manifest.json"));
  if (!contained(base, filename)) throw new MapRequestError("Dataset escapes imagery root", 403);
  const manifest = parseMapManifest(JSON.parse(await readFile(filename, "utf8")));
  if (manifest.id !== dataset) throw new Error("Local imagery dataset ID does not match manifest");
  return manifest;
}

export function tileIntersects(manifest: MapManifest, z: number, x: number, y: number) {
  const n = 2 ** z;
  const latitude = (row: number) => Math.atan(Math.sinh(Math.PI * (1 - 2 * row / n))) * 180 / Math.PI;
  const west = x / n * 360 - 180;
  const east = (x + 1) / n * 360 - 180;
  return east > manifest.bounds[0] && west < manifest.bounds[2] &&
    latitude(y) > manifest.bounds[1] && latitude(y + 1) < manifest.bounds[3];
}

export async function readMapTile(root: string, manifest: MapManifest, coordinates: string[]) {
  if (coordinates.length !== 3 || !coordinates.every(v => /^(0|[1-9]\d{0,6})$/.test(v))) {
    throw new MapRequestError("Invalid tile coordinates", 400);
  }
  const [z, x, y] = coordinates.map(Number);
  if (z < manifest.minZoom || z > manifest.maxZoom || x >= 2 ** z || y >= 2 ** z ||
    !tileIntersects(manifest, z, x, y)) throw new MapRequestError("Tile outside dataset coverage", 404);
  const base = await realpath(root);
  const directory = await realpath(path.join(base, manifest.id));
  if (!contained(base, directory)) throw new MapRequestError("Dataset escapes imagery root", 403);
  let filename: string;
  try {
    // Runtime map storage is provisioned separately, not bundled into the build.
    filename = await realpath(/* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ directory, String(z), String(x), `${y}.${manifest.format}`));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new MapRequestError("Local imagery tile is missing", 404);
    }
    throw error;
  }
  if (!contained(directory, filename)) throw new MapRequestError("Tile escapes dataset directory", 403);
  return readFile(filename);
}

export async function respondToMapRequest(segments: string[], root: string, dataset?: string) {
  if (!dataset) {
    return segments.length === 1 && segments[0] === "manifest"
      ? Response.json({ enabled: false }, { headers: { "Cache-Control": "no-store" } })
      : Response.json({ error: "Local imagery is disabled" }, { status: 404 });
  }
  try {
    const manifest = await readActiveMap(root, dataset);
    if (segments.length === 1 && segments[0] === "manifest") {
      return Response.json({ enabled: true, manifest }, { headers: { "Cache-Control": "no-store" } });
    }
    if (segments.length !== 4 || segments[0] !== dataset) throw new MapRequestError("Unknown imagery dataset", 404);
    const tile = await readMapTile(root, manifest, segments.slice(1));
    return new Response(new Uint8Array(tile), {
      headers: {
        "Content-Type": manifest.format === "png" ? "image/png" : "image/jpeg",
        "Cache-Control": "private, max-age=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof MapRequestError) return Response.json({ error: error.message }, { status: error.status });
    console.error("Local imagery request failed:", error);
    return Response.json({ error: "Local imagery configuration or storage error; check server logs" }, { status: 500 });
  }
}
