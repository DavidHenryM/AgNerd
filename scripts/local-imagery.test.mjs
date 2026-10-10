import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { register } from "tsx/esm/api";
import { imageryManifest, prepareImagery } from "./prepare-local-imagery.mjs";

register();
const { parseMapManifest } = await import("../app/lib/map-manifest.ts");
const { readActiveMap, readMapTile, tileIntersects, respondToMapRequest } = await import("../app/lib/local-imagery.ts");

await test("manifest covers requested centre and rejects malformed datasets", () => {
  const m = parseMapManifest(imageryManifest());
  assert.ok(m.bounds[0] < 148.8247819 && m.bounds[2] > 148.8247819);
  assert.ok(m.bounds[1] < -36.5601857 && m.bounds[3] > -36.5601857);
  for (const change of [{ id: "../escape" }, { bounds: [0, 1, -1, 2] }, { maxZoom: 23 }, { format: "exe" }, { resolutionMeters: NaN }]) {
    assert.throws(() => parseMapManifest({ ...m, ...change }));
  }
  assert.equal(tileIntersects(m, 0, 0, 0), true);
  assert.equal(tileIntersects(m, 14, 0, 0), false);
});

await test("serves tiles locally and rejects traversal, invalid coordinates, missing and out-of-bounds tiles", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "agnerd-map-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const m = imageryManifest();
  const directory = path.join(root, m.id);
  await mkdir(path.join(directory, "0", "0"), { recursive: true });
  await writeFile(path.join(directory, "manifest.json"), JSON.stringify(m));
  await writeFile(path.join(directory, "0", "0", "0.png"), "test-tile");
  const manifest = await readActiveMap(root, m.id);
  assert.equal((await readMapTile(root, manifest, ["0", "0", "0"])).toString(), "test-tile");
  const request = (...segments) => respondToMapRequest(segments, root, m.id);
  assert.equal((await (await request("manifest")).json()).manifest.id, m.id);
  const response = await request(m.id, "0", "0", "0");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "image/png");
  assert.equal(response.headers.get("Cache-Control"), "private, max-age=86400");
  assert.equal(await response.text(), "test-tile");
  assert.equal((await request("unknown", "0", "0", "0")).status, 404);
  assert.equal((await request(m.id, "0", "../0", "0")).status, 400);
  assert.equal((await request(m.id, "1", "1", "1")).status, 404);
  assert.deepEqual(await (await respondToMapRequest(["manifest"], root)).json(), { enabled: false });
  await assert.rejects(readActiveMap(root, "../escape"), /Invalid dataset/);
  for (const coordinate of [["0", "../0", "0"], ["0", "1", "0"], ["14", "0", "0"], ["1", "1", "1"]]) {
    await assert.rejects(readMapTile(root, manifest, coordinate));
  }
  await assert.rejects(readMapTile(root, manifest, ["0", "00", "0"]), /Invalid tile/);
});

await test("rejects a symlinked dataset outside the configured root", async (t) => {
  const parent = await mkdtemp(path.join(os.tmpdir(), "agnerd-map-link-"));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, "root");
  const outside = path.join(parent, "outside");
  await mkdir(root);
  await mkdir(outside);
  await writeFile(path.join(outside, "manifest.json"), JSON.stringify(imageryManifest()));
  await symlink(outside, path.join(root, imageryManifest().id), process.platform === "win32" ? "junction" : "dir");
  await assert.rejects(readActiveMap(root, imageryManifest().id), /escapes imagery root/);
});

await test("preparation uses RGB order, XYZ tiling and publishes manifest only after success", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "agnerd-map-prepare-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const calls = [];
  const result = await prepareImagery(root, (command, args) => {
    calls.push({ command, args });
    if (args.includes("--xyz")) {
      mkdirSync(path.join(args.at(-1), "0", "0"), { recursive: true });
      writeFileSync(path.join(args.at(-1), "0", "0", "0.png"), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    }
  });
  assert.equal((await readActiveMap(root, imageryManifest().id)).resolutionMeters, 10);
  assert.ok(result.endsWith(imageryManifest().id));
  assert.match(calls[0].args.at(-2), /band04\.tif/);
  assert.match(calls[1].args.at(-2), /band03\.tif/);
  assert.match(calls[2].args.at(-2), /band02\.tif/);
  assert.ok(calls.at(-1).args.includes("--xyz"));
  await assert.rejects(prepareImagery(root), /already exists/);
});

await test("preparation failures do not publish an incomplete dataset", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "agnerd-map-failure-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(prepareImagery(root, () => { throw new Error("GDAL failure"); }), /GDAL failure/);
  await assert.rejects(readActiveMap(root, imageryManifest().id));
  await assert.rejects(prepareImagery(root, () => {}), /ENOENT/);
  await assert.rejects(readActiveMap(root, imageryManifest().id));
});
