import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { Cartesian3, Matrix3, Matrix4, Transforms } from "cesium";
import Axis from "@cesium/engine/Source/Scene/Axis.js";
import ModelUtility from "@cesium/engine/Source/Scene/Model/ModelUtility.js";
import { register } from "tsx/esm/api";
import { centreTractor, readTractorGeometry } from "./tractor-geometry.mjs";

register();
const { TRACTOR_SOURCE_WIDTH_METERS, TRACTOR_WORLD_SCALE, tractorOrientation } = await import("../app/lib/tractor-model.ts");
const filename = new URL("../public/models/Tractor.glb", import.meta.url);

await test("actual tractor vertices are centred on GPS footprint with ground-level origin and two-metre width", async () => {
  const { minimum, maximum, meshes } = await readTractorGeometry(filename);
  assert.ok(Math.abs(minimum.x + maximum.x) < 1e-6);
  assert.ok(Math.abs(minimum.z + maximum.z) < 1e-6);
  assert.ok(Math.abs(minimum.y) < 1e-6);
  assert.ok(Math.abs(maximum.z - minimum.z - TRACTOR_SOURCE_WIDTH_METERS) < 1e-6);
  assert.ok(Math.abs((maximum.z - minimum.z) * TRACTOR_WORLD_SCALE - 2) < 1e-6);
  const rear = meshes.find(mesh => mesh.name === "polySurface27");
  const front = meshes.find(mesh => mesh.name === "polySurface29");
  assert.ok(front.minimum.x > 0 && rear.maximum.x < 0, "front wheels must point +X");
  assert.ok(front.maximum.y < rear.maximum.y, "front wheels are smaller than rear wheels");
});

await test("centering the already-normalized asset is idempotent", async () => {
  const before = await readFile(filename);
  await centreTractor(filename);
  assert.deepEqual(await readFile(filename), before);
});

await test("tractor nose follows GPS compass heading at multiple globe locations", () => {
  const correction = ModelUtility.getAxisCorrectionMatrix(Axis.Y, Axis.Z, new Matrix4());
  const modelNose = Matrix4.multiplyByPointAsVector(correction, Cartesian3.UNIT_X, new Cartesian3());
  for (const [lon, lat] of [[149, -35], [0, 0], [-120, 45]]) {
    const position = Cartesian3.fromDegrees(lon, lat);
    const enu = Transforms.eastNorthUpToFixedFrame(position);
    const inverse = Matrix4.inverseTransformation(enu, new Matrix4());
    for (const degrees of [0, 45, 90, 180, 270, 359]) {
      const heading = degrees * Math.PI / 180;
      const rotation = Matrix3.fromQuaternion(tractorOrientation(position, heading));
      const nose = Matrix3.multiplyByVector(rotation, modelNose, new Cartesian3());
      const local = Matrix4.multiplyByPointAsVector(inverse, nose, new Cartesian3());
      assert.ok(Math.abs(local.x - Math.sin(heading)) < 1e-10, `east component at ${degrees}`);
      assert.ok(Math.abs(local.y - Math.cos(heading)) < 1e-10, `north component at ${degrees}`);
      assert.ok(Math.abs(local.z) < 1e-10);
    }
  }
});
