import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { register } from "tsx/esm/api";
import { Cartesian3, Cartographic, Color, ColorGeometryInstanceAttribute, ComponentDatatype, PrimitiveType } from "cesium";

register();
const { SprayCoverage, SPRAY_RENDER_BATCH_SIZE, SPRAY_SURFACE_HEIGHT_METERS } = await import("../app/lib/spray-coverage.ts");
const { SPRAY_COLOR } = await import("../app/lib/spray-particles.ts");
const { sprayBoom, sprayStrip } = await import("../app/lib/spray-boom.ts");
const coordinates = [148, -36, 148.0001, -36, 148.0001, -35.9999, 148, -35.9999];
const stripAt = index => coordinates.map((value, i) => i % 2 ? value + index * 0.0002 : value);
const geometry = primitive => primitive.geometryInstances.geometry;

function assertMesh(primitive, strips) {
  const mesh = geometry(primitive);
  assert.equal(mesh.primitiveType, PrimitiveType.TRIANGLES);
  assert.deepEqual(Object.keys(mesh.attributes).filter(key => mesh.attributes[key] !== undefined), ["position"]);
  assert.equal(mesh.attributes.position.componentDatatype, ComponentDatatype.DOUBLE);
  assert.equal(mesh.attributes.position.componentsPerAttribute, 3);
  assert.equal(mesh.attributes.position.values.length, strips.length * 12);
  assert.equal(mesh.indices.length, strips.length * 6);
  strips.forEach((strip, index) => {
    const vertex = index * 4;
    assert.deepEqual(Array.from(mesh.indices.slice(index * 6, index * 6 + 6)),
      [vertex, vertex + 1, vertex + 2, vertex, vertex + 2, vertex + 3]);
    for (let corner = 0; corner < 4; corner++) {
      const position = Cartesian3.unpack(mesh.attributes.position.values, index * 12 + corner * 3);
      const expected = Cartesian3.fromDegrees(strip[corner * 2], strip[corner * 2 + 1], SPRAY_SURFACE_HEIGHT_METERS);
      assert.ok(Cartesian3.equalsEpsilon(position, expected, 1e-12));
      assert.ok(Math.abs(Cartographic.fromCartesian(position).height - SPRAY_SURFACE_HEIGHT_METERS) < 1e-6);
      assert.ok(Cartesian3.distance(position, mesh.boundingSphere.center) <= mesh.boundingSphere.radius + 1e-8);
    }
  });
}

await test("each strip is exactly four position-only vertices and two triangles, with unchanged colour", () => {
  const coverage = new SprayCoverage();
  const input = [...coordinates];
  coverage.append(input);
  input.fill(0);
  coverage.update();
  const primitive = coverage.primitives.get(0);
  assertMesh(primitive, [coordinates]);
  assert.equal(SPRAY_SURFACE_HEIGHT_METERS, 0.1);
  assert.equal(primitive.asynchronous, false, "precomputed triangles require no geometry workers");
  assert.equal(primitive.allowPicking, false);
  assert.equal(primitive.appearance.flat, true);
  assert.equal(primitive.appearance.translucent, true);
  assert.equal(primitive.appearance.closed, false, "turns and reversing are visible from either side");
  assert.deepEqual(primitive.geometryInstances.attributes.color.value, ColorGeometryInstanceAttribute.fromColor(
    Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.45),
  ).value);
  coverage.primitives.destroy();
});

await test("a 10,001-strip resumed track builds only 128 triangles per frame, keeping every footprint", () => {
  const coverage = new SprayCoverage();
  assert.equal(SPRAY_RENDER_BATCH_SIZE, 64);
  const count = 10_001;
  for (let i = 0; i < count; i++) coverage.append(stripAt(i));
  const batches = Math.ceil(count / SPRAY_RENDER_BATCH_SIZE);
  for (let i = 0; i < batches; i++) {
    coverage.update();
    assert.equal(coverage.primitives.length, i + 1);
    const start = i * SPRAY_RENDER_BATCH_SIZE;
    assertMesh(coverage.primitives.get(i), Array.from(
      { length: Math.min(SPRAY_RENDER_BATCH_SIZE, count - start) }, (_, j) => stripAt(start + j),
    ));
  }
  const completed = Array.from({ length: batches }, (_, i) => coverage.primitives.get(i));
  assert.equal(completed.reduce((sum, primitive) => sum + geometry(primitive).indices.length / 3, 0), count * 2);
  for (let i = 0; i < 10; i++) coverage.update();
  assert.deepEqual(Array.from({ length: batches }, (_, i) => coverage.primitives.get(i)), completed);
  coverage.append(stripAt(count));
  coverage.update();
  for (let i = 0; i < batches - 1; i++) assert.equal(coverage.primitives.get(i), completed[i]);
  assert.equal(completed.at(-1).isDestroyed(), true);
  assert.equal(coverage.primitives.length, batches);
  assert.equal(geometry(coverage.primitives.get(batches - 1)).indices.length / 6, count % SPRAY_RENDER_BATCH_SIZE + 1);
  coverage.primitives.destroy();
});

await test("live fixes rebuild only the bounded tail, without waiting for asynchronous readiness", () => {
  const coverage = new SprayCoverage();
  let firstBatch;
  for (let i = 0; i < 1000; i++) {
    coverage.append(stripAt(i));
    coverage.update();
    const tail = coverage.primitives.get(coverage.primitives.length - 1);
    assert.ok(geometry(tail).indices.length <= SPRAY_RENDER_BATCH_SIZE * 6);
    if (i === SPRAY_RENDER_BATCH_SIZE - 1) firstBatch = coverage.primitives.get(0);
    if (firstBatch) assert.equal(coverage.primitives.get(0), firstBatch);
    assert.equal(coverage.primitives.length, Math.ceil((i + 1) / SPRAY_RENDER_BATCH_SIZE));
    coverage.update();
    assert.equal(coverage.primitives.get(coverage.primitives.length - 1), tail, "idle frames do not rebuild");
  }
  coverage.primitives.destroy();
});

await test("overlapping strips share one mesh but retain both independently blended triangle pairs", () => {
  const coverage = new SprayCoverage();
  for (let i = 0; i < SPRAY_RENDER_BATCH_SIZE; i++) coverage.append(coordinates);
  coverage.update();
  assert.equal(coverage.primitives.length, 1, "overlap does not multiply ground primitives or draw calls");
  assertMesh(coverage.primitives.get(0), Array(SPRAY_RENDER_BATCH_SIZE).fill(coordinates));
  coverage.primitives.destroy();
});

await test("turning, reversing and offset footprints retain the raw boom endpoints", () => {
  const coverage = new SprayCoverage();
  const first = sprayBoom({ lat: -36, lon: 148 }, 0, 18, 4, -6);
  const turn = sprayBoom({ lat: -35.9999, lon: 148.0001 }, Math.PI / 2, 18, 4, -6);
  const reverse = sprayBoom({ lat: -35.9999, lon: 148 }, Math.PI, 18, 4, -6);
  const strips = [sprayStrip(first, turn), sprayStrip(turn, reverse)];
  strips.forEach(strip => coverage.append(strip));
  coverage.update();
  assertMesh(coverage.primitives.get(0), strips);
  coverage.primitives.destroy();
});

await test("track changes destroy all displayed and queued coverage and can paint again", () => {
  const coverage = new SprayCoverage();
  for (let i = 0; i < 130; i++) coverage.append(stripAt(i));
  coverage.update();
  coverage.update();
  const old = [coverage.primitives.get(0), coverage.primitives.get(1)];
  coverage.clear();
  coverage.update();
  assert.equal(coverage.primitives.length, 0);
  assert.ok(old.every(primitive => primitive.isDestroyed()));
  coverage.append(coordinates);
  coverage.update();
  assert.equal(coverage.primitives.length, 1);
  assertMesh(coverage.primitives.get(0), [coordinates]);
  coverage.primitives.destroy();
});

await test("navigation uses ordinary primitives and a simple boom line, not ground-classification geometry", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /scene\.primitives\.add\(coverage\.primitives\)/);
  assert.match(source, /scene\.preRender\.addEventListener\(\(\) => coverage\.update\(\)\)/);
  assert.match(source, /removeCoverageListener\(\)/);
  assert.match(source, /coverageRef\.current\?\.clear\(\)/);
  assert.match(source, /polyline:.*clampToGround: false/);
  assert.doesNotMatch(source, /stripEntitiesRef|polygon:\s*\{|groundPrimitives\.add\(coverage/);
});
