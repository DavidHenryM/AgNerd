import assert from "node:assert/strict";
import test from "node:test";
import { stat } from "node:fs/promises";
import { Cartesian3, Matrix4, Quaternion } from "cesium";
import { register } from "tsx/esm/api";
import { readTractorGeometry } from "./tractor-geometry.mjs";

register();
const { boomNodeTransformations, boomNozzlePositions, boomWorldEndpoints, BOOM_CLEARANCE_METERS, BOOM_HEIGHT_METERS } =
  await import("../app/lib/boom-model.ts");
const filename = new URL("../public/models/Boom.glb", import.meta.url);

await test("standalone boom is 6 m wide, 0.5 m tall, with twelve yellow underside nozzles", async () => {
  const geometry = await readTractorGeometry(filename);
  assert.equal(geometry.maximum.z - geometry.minimum.z, 6);
  assert.ok(Math.abs(geometry.minimum.y) < 1e-8);
  assert.ok(Math.abs(geometry.maximum.y - BOOM_HEIGHT_METERS) < 1e-8);
  assert.equal(BOOM_CLEARANCE_METERS, 0.5);
  const nozzles = geometry.meshes.filter(mesh => mesh.name.startsWith("Yellow nozzle"));
  assert.equal(nozzles.length, 12);
  for (const nozzle of nozzles) {
    assert.ok(Math.abs(nozzle.minimum.y) < 1e-8);
    assert.ok(Math.abs(nozzle.maximum.y - 0.07) < 1e-8);
  }
  const yellow = geometry.document.materials.find(material => material.name === "Yellow nozzle tips");
  assert.deepEqual(yellow.pbrMetallicRoughness.baseColorFactor, [1, 0.78, 0.015, 1]);
  assert.ok((await stat(filename)).size < 12000, "asset stays small for embedded devices");
});

await test("world-space spray origins use the rigid model span at every compass heading", () => {
  const centre = Cartesian3.fromDegrees(149, -35, BOOM_CLEARANCE_METERS);
  for (const heading of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const [left, right] = boomWorldEndpoints(centre, heading, 6);
    assert.ok(Math.abs(Cartesian3.distance(left, right) - 6) < 1e-8);
    assert.ok(Cartesian3.distance(Cartesian3.midpoint(left, right, new Cartesian3()), centre) < 1e-8);
    const nozzles = boomNozzlePositions(left, right);
    for (let i = 1; i < nozzles.length; i++) {
      assert.ok(Math.abs(Cartesian3.distance(nozzles[i - 1], nozzles[i]) - 0.5) < 1e-8);
    }
  }
});

await test("width adjustments preserve height and nozzle size, and match evenly spaced spray origins", async () => {
  const { document } = await readTractorGeometry(filename);
  for (const width of [1, 3, 6, 12, 50]) {
    const changes = boomNodeTransformations(width);
    const nozzles = boomNozzlePositions(new Cartesian3(-width / 2, 0, 1), new Cartesian3(width / 2, 0, 1));
    const rail = changes["Upper rail"].scale;
    assert.equal(rail.x, 1);
    assert.equal(rail.y, 1);
    assert.equal(rail.z * 6, width);
    for (let i = 0; i < 12; i++) {
      const station = document.nodes.find(node => node.name === `Station ${i}`);
      const local = Matrix4.fromTranslationQuaternionRotationScale(
        Cartesian3.fromArray(station.translation), Quaternion.IDENTITY, Cartesian3.ONE);
      const delta = Matrix4.fromTranslationQuaternionRotationScale(
        changes[station.name].translation, changes[station.name].rotation, changes[station.name].scale);
      const world = Matrix4.multiply(local, delta, new Matrix4());
      const point = Matrix4.multiplyByPoint(world, Cartesian3.ZERO, new Cartesian3());
      assert.ok(Math.abs(point.z - nozzles[i].x) < 1e-8);
      assert.equal(point.y, 0);
      assert.ok(Cartesian3.equals(changes[station.name].scale, Cartesian3.ONE));
      if (i > 0) assert.ok(Math.abs(nozzles[i].x - nozzles[i - 1].x - width / 12) < 1e-8);
    }
  }
});
