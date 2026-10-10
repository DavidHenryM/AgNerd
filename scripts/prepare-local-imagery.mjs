import { spawnSync } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DATASET_ID = "dalgety-sentinel2-20250103-v1";
export const SOURCE_URL = "https://dea-public-data.s3.ap-southeast-2.amazonaws.com/baseline/ga_s2am_ard_3/55/HFV/2025/01/03/20250103T010202/ga_s2am_nbart_3-2-1_55HFV_2025-01-03_final";

export function imageryManifest() {
  const latitude = -36.5601857;
  const longitude = 148.8247819;
  const latDelta = 5000 / 111320;
  const lonDelta = 5000 / (111320 * Math.cos(latitude * Math.PI / 180));
  return {
    id: DATASET_ID,
    title: "Dalgety Sentinel-2 RGB",
    bounds: [longitude - lonDelta, latitude - latDelta, longitude + lonDelta, latitude + latDelta],
    minZoom: 0,
    maxZoom: 14,
    format: "png",
    attribution: "Geoscience Australia / Digital Earth Australia; Copernicus Sentinel-2; CC BY 4.0",
    capturedAt: "2025-01-03",
    resolutionMeters: 10,
    source: "https://explorer.dea.ga.gov.au/dataset/99d374b7-24ff-45b4-8743-ce06d2f4e150",
    license: "CC-BY-4.0",
  };
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.error) throw new Error(`Cannot run ${command}; install GDAL tools first: ${result.error.message}`, { cause: result.error });
  if (result.status !== 0) throw new Error(`${command} failed (exit ${result.status})`);
}

export async function prepareImagery(root, execute = run) {
  const manifest = imageryManifest();
  await mkdir(root, { recursive: true });
  const destination = path.join(root, DATASET_ID);
  try {
    await access(destination);
  } catch (error) {
    if (!(error instanceof Error && error.code === "ENOENT")) throw error;
    const work = await mkdtemp(path.join(os.tmpdir(), "agnerd-imagery-"));
    const staging = await mkdtemp(path.join(root, ".imagery-staging-"));
    try {
      const [west, south, east, north] = manifest.bounds;
      const bands = [];
      for (const band of ["04", "03", "02"]) {
        const filename = path.join(work, `${band}.tif`);
        execute("gdal_translate", [
          "-projwin_srs", "EPSG:4326", "-projwin", String(west), String(north), String(east), String(south),
          "-ot", "Byte", "-scale", "10", "3500", "0", "255", "-a_nodata", "0",
          `/vsicurl/${SOURCE_URL}_band${band}.tif`, filename,
        ]);
        bands.push(filename);
      }
      const vrt = path.join(work, "rgb.vrt");
      execute("gdalbuildvrt", ["-separate", vrt, ...bands]);
      const raster = path.join(work, "rgb-mercator.tif");
      execute("gdalwarp", ["-t_srs", "EPSG:3857", "-te_srs", "EPSG:4326", "-te", ...manifest.bounds.map(String),
        "-r", "bilinear", "-dstalpha", vrt, raster]);
      execute(process.env.GDAL2TILES_COMMAND || (process.platform === "win32" ? "gdal2tiles" : "gdal2tiles.py"),
        ["--xyz", "-z", "0-14", "-w", "none", "--processes=2", raster, staging]);
      const overview = await readFile(path.join(staging, "0", "0", "0.png"));
      if (!overview.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        throw new Error("GDAL did not produce a valid PNG overview tile");
      }
      await writeFile(path.join(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
      await rename(staging, destination);
      return destination;
    } finally {
      await rm(work, { recursive: true, force: true });
      await rm(staging, { recursive: true, force: true });
    }
  }
  throw new Error(`Dataset already exists at ${destination}; use it as-is or prepare a new version. Nothing was overwritten.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = process.argv[2];
  if (!root || !path.isAbsolute(root)) throw new Error("Usage: node scripts/prepare-local-imagery.mjs ABSOLUTE_MAP_ROOT");
  console.log(`Preparing approximately 10x10 km around -36.5601857,148.8247819. Initial preparation requires internet and GDAL.`);
  console.log(`Dataset ready: ${await prepareImagery(root)}`);
}
