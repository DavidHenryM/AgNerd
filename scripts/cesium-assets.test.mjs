import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("copies browser-bundled Cesium assets, not engine source workers", async () => {
  const manifest = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  assert.ok(manifest.scripts["copy-cesium"].includes("node_modules/cesium/Build/Cesium/"));
  assert.ok(!manifest.scripts["copy-cesium"].includes("@cesium/engine/Source"));
});

test("deployed Cesium workers match the bundled workers and include their chunks", async () => {
  const bundled = new URL("node_modules/cesium/Build/Cesium/Workers/", root);
  const deployed = new URL("public/cesium/Workers/", root);
  const files = (await readdir(bundled)).filter((name) => name.endsWith(".js"));
  assert.ok(files.some((name) => name.startsWith("chunk-")));
  assert.ok(files.includes("createVerticesFromHeightmap.js"));
  for (const name of files) {
    const [expected, actual] = await Promise.all([
      readFile(new URL(name, bundled), "utf8"),
      readFile(new URL(name, deployed), "utf8"),
    ]);
    assert.equal(actual, expected, `Run npm run copy-cesium: ${name} differs from the installed bundle`);
  }
});
