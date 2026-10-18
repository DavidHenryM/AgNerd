import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { register } from "tsx/esm/api";
import { Cartesian3, ClassificationType, Color, ColorGeometryInstanceAttribute } from "cesium";

register();
const { SprayCoverage, SPRAY_RENDER_BATCH_SIZE } = await import("../app/lib/spray-coverage.ts");
const { SPRAY_COLOR } = await import("../app/lib/spray-particles.ts");
const coordinates = [148, -36, 148.0001, -36, 148.0001, -35.9999, 148, -35.9999];
const stripAt = index => coordinates.map((value, i) => i % 2 ? value + index * 0.0002 : value);

function ready(primitive) {
  primitive._ready = true;
}

await test("coverage retains exact polygons, colour and ground classification", () => {
  const coverage = new SprayCoverage();
  const input = [...coordinates];
  coverage.append(input);
  input.fill(0);
  coverage.update();
  const primitive = coverage.primitives.get(0);
  assert.equal(primitive.asynchronous, true);
  assert.equal(primitive.classificationType, ClassificationType.BOTH);
  const [instance] = primitive.geometryInstances;
  const positions = instance.geometry._polygonHierarchy.positions;
  assert.equal(positions.length, 4);
  Cartesian3.fromDegreesArray(coordinates).forEach((position, i) => assert.ok(Cartesian3.equals(position, positions[i])));
  assert.deepEqual(instance.attributes.color.value, ColorGeometryInstanceAttribute.fromColor(
    Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.45),
  ).value);
  coverage.primitives.destroy();
});

await test("slow geometry builds coalesce incoming fixes without starting more workers", () => {
  const coverage = new SprayCoverage();
  coverage.append(coordinates);
  coverage.update();
  const building = coverage.primitives.get(0);
  for (let i = 0; i < 1000; i++) {
    coverage.append(stripAt(i + 1));
    coverage.update();
    assert.equal(coverage.primitives.length, 1);
    assert.equal(coverage.primitives.get(0), building);
  }
  ready(building);
  coverage.update();
  assert.equal(coverage.primitives.length, 2);
  assert.equal(coverage.primitives.get(1).geometryInstances.length, SPRAY_RENDER_BATCH_SIZE);
  assert.equal(building.isDestroyed(), false, "old coverage remains until its replacement is ready");
  ready(coverage.primitives.get(1));
  coverage.update();
  assert.equal(building.isDestroyed(), true);
  coverage.primitives.destroy();
});

await test("a long resumed track builds each bounded batch once and keeps every strip", () => {
  const coverage = new SprayCoverage();
  assert.equal(SPRAY_RENDER_BATCH_SIZE, 64);
  const count = 10_001;
  for (let i = 0; i < count; i++) coverage.append(stripAt(i));
  const batches = Math.ceil(count / SPRAY_RENDER_BATCH_SIZE);
  for (let i = 0; i < batches; i++) {
    coverage.update();
    assert.equal(coverage.primitives.length, i + 1);
    const primitive = coverage.primitives.get(i);
    assert.equal(primitive.geometryInstances.length, Math.min(SPRAY_RENDER_BATCH_SIZE, count - i * SPRAY_RENDER_BATCH_SIZE));
    ready(primitive);
  }
  coverage.update();
  const completed = Array.from({ length: batches }, (_, i) => coverage.primitives.get(i));
  assert.equal(completed.reduce((sum, primitive) => sum + primitive.geometryInstances.length, 0), count);
  for (let i = 0; i < 10; i++) coverage.update();
  assert.deepEqual(Array.from({ length: batches }, (_, i) => coverage.primitives.get(i)), completed);
  coverage.append(stripAt(count));
  coverage.update();
  for (let i = 0; i < batches - 1; i++) assert.equal(coverage.primitives.get(i), completed[i]);
  assert.equal(coverage.primitives.get(batches).geometryInstances.length, count % SPRAY_RENDER_BATCH_SIZE + 1);
  ready(coverage.primitives.get(batches));
  coverage.update();
  assert.equal(completed.at(-1).isDestroyed(), true);
  coverage.primitives.destroy();
});

await test("live recording only rebuilds the bounded tail, never completed batches", () => {
  const coverage = new SprayCoverage();
  let firstBatch;
  for (let i = 0; i < 1000; i++) {
    coverage.append(stripAt(i));
    coverage.update();
    const tail = coverage.primitives.get(coverage.primitives.length - 1);
    assert.ok(tail.geometryInstances.length <= SPRAY_RENDER_BATCH_SIZE);
    ready(tail);
    coverage.update();
    if (i === SPRAY_RENDER_BATCH_SIZE - 1) firstBatch = coverage.primitives.get(0);
    if (firstBatch) assert.equal(coverage.primitives.get(0), firstBatch);
    assert.equal(coverage.primitives.length, Math.ceil((i + 1) / SPRAY_RENDER_BATCH_SIZE));
  }
  coverage.primitives.destroy();
});

await test("track changes clear queued, displayed and in-flight coverage without removing the collection", () => {
  const coverage = new SprayCoverage();
  coverage.append(coordinates);
  coverage.update();
  ready(coverage.primitives.get(0));
  coverage.update();
  coverage.append(stripAt(1));
  coverage.update();
  const old = [coverage.primitives.get(0), coverage.primitives.get(1)];
  coverage.append(coordinates);
  coverage.clear();
  coverage.update();
  assert.equal(coverage.primitives.length, 0);
  assert.ok(old.every(primitive => primitive.isDestroyed()));
  coverage.append(coordinates);
  coverage.update();
  assert.equal(coverage.primitives.length, 1);
  assert.equal(coverage.primitives.get(0).geometryInstances.length, 1);
  coverage.primitives.destroy();
});

await test("overlapping footprints keep separate translucent paint and wait for the whole replacement", () => {
  const coverage = new SprayCoverage();
  coverage.append(coordinates);
  coverage.update();
  const original = coverage.primitives.get(0);
  ready(original);
  coverage.update();
  coverage.append(coordinates);
  coverage.update();
  assert.equal(coverage.primitives.length, 3);
  const replacements = [coverage.primitives.get(1), coverage.primitives.get(2)];
  assert.ok(replacements.every(primitive => primitive.geometryInstances.length === 1));
  assert.ok(replacements.every(primitive => !primitive.show));
  ready(replacements[0]);
  coverage.update();
  assert.equal(original.isDestroyed(), false);
  assert.ok(replacements.every(primitive => !primitive.show));
  ready(replacements[1]);
  coverage.update();
  assert.equal(original.isDestroyed(), true);
  assert.equal(coverage.primitives.length, 2);
  assert.ok(replacements.every(primitive => primitive.show));
  coverage.primitives.destroy();
});

await test("navigation renders coverage outside entity batching and removes its frame listener", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /scene\.groundPrimitives\.add\(coverage\.primitives\)/);
  assert.match(source, /scene\.preRender\.addEventListener\(\(\) => coverage\.update\(\)\)/);
  assert.match(source, /removeCoverageListener\(\)/);
  assert.match(source, /coverageRef\.current\?\.clear\(\)/);
  assert.doesNotMatch(source, /stripEntitiesRef|polygon:\s*\{/);
});
