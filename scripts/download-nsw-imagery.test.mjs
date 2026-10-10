import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { register } from "tsx/esm/api";
import { downloadNswImagery, fetchWithRetry, nswManifest, tilesForBounds } from "./download-nsw-imagery.mjs";

register();
const { parseMapManifest } = await import("../app/lib/map-manifest.ts");
const { readActiveMap, readMapTile } = await import("../app/lib/local-imagery.ts");
const image = await sharp({ create: { width: 256, height: 256, channels: 3, background: "#8a9452" } }).jpeg().toBuffer();

await test("bounded XYZ download includes every zoom and labels mosaic metadata honestly", () => {
  const manifest = nswManifest();
  assert.equal(parseMapManifest(manifest).capturedAt, null);
  assert.match(manifest.notes, /native detail/);
  const tiles = tilesForBounds(manifest.bounds, 18);
  assert.equal(tiles.filter(t => t.z === 18).length, 6724);
  assert.ok(tiles.some(t => t.z === 18 && t.x === 239442 && t.y === 159709));
  assert.deepEqual(tiles[0], { z: 0, x: 0, y: 0 });
  assert.throws(() => tilesForBounds(manifest.bounds, 19));
  assert.throws(() => tilesForBounds([1, 2, 0, 3], 18));
});

await test("retries transient errors but reports permanent HTTP failures immediately", async () => {
  let attempts = 0;
  const bytes = await fetchWithRetry("https://example.test/tile", async () => {
    attempts++;
    return attempts < 3 ? new Response("", { status: 503 }) : new Response(image);
  }, async () => {});
  assert.deepEqual(bytes, image);
  assert.equal(attempts, 3);
  attempts = 0;
  await assert.rejects(fetchWithRetry("https://example.test/tile", async () => {
    attempts++;
    return new Response("", { status: 404 });
  }, async () => {}), /HTTP 404/);
  assert.equal(attempts, 1);
});

await test("downloads ArcGIS row/column order, converts mixed formats and resumes without publishing failures", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "agnerd-nsw-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const manifest = { ...nswManifest(), maxZoom: 2 };
  const urls = [];
  let fail = true;
  const fetchBytes = async url => {
    urls.push(url);
    if (url.includes("/tile/")) {
      if (fail && url.includes("/tile/2/")) throw new Error("connection interrupted");
      return image;
    }
    return Buffer.from(JSON.stringify(url.includes("/query?") ? { features: [] } : { copyrightText: "NSW", tileInfo: {} }));
  };
  await assert.rejects(downloadNswImagery(root, { manifest, fetchBytes, log: () => {} }), /retained for resume/);
  await assert.rejects(readActiveMap(root, manifest.id));
  const count = urls.filter(u => u.endsWith("/tile/0/0/0")).length;
  fail = false;
  await downloadNswImagery(root, { manifest, fetchBytes, log: () => {} });
  assert.equal(urls.filter(u => u.endsWith("/tile/0/0/0")).length, count);
  assert.ok(urls.some(u => u.endsWith("/tile/2/2/3")));
  const active = await readActiveMap(root, manifest.id);
  const tile = await readMapTile(root, active, ["0", "0", "0"]);
  assert.equal((await sharp(tile).metadata()).format, "png");
  assert.ok(JSON.parse(await readFile(path.join(root, manifest.id, "source-metadata.json"), "utf8")).footprints);
  assert.deepEqual(await readdir(root), [manifest.id]);
  await assert.rejects(downloadNswImagery(root, { manifest, fetchBytes }), /already exists/);
});

await test("rejects malformed image responses and inconsistent resume plans", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "agnerd-nsw-bad-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const manifest = { ...nswManifest(), maxZoom: 0 };
  const fetchBytes = async url => Buffer.from(url.includes("/tile/") ? "<html>error</html>" : "{}");
  await assert.rejects(downloadNswImagery(root, { manifest, fetchBytes, log: () => {} }), /Download stopped/);
  await assert.rejects(readActiveMap(root, manifest.id));
  await writeFile(path.join(root, `.${manifest.id}.download`, "download-plan.json"), "{}");
  await assert.rejects(downloadNswImagery(root, { manifest, fetchBytes }), /plan differs/);
});
