import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";

register();
const { sprayBoom, sprayStrip } = await import("../app/lib/spray-boom.ts");
const origin = { lat: -36.5601857, lon: 148.8247819 };
function metres(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 6_371_000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

await test("boom width is in ground metres at every heading", () => {
  for (const heading of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    for (const width of [1, 12, 50]) {
      const boom = sprayBoom(origin, heading, width, 0);
      assert.ok(Math.abs(metres(boom.left, boom.right) - width) < 0.001);
      assert.ok(Math.abs(metres(origin, boom.left) - width / 2) < 0.001);
    }
  }
});

await test("positive offset shifts left, negative shifts right, even beyond half width", () => {
  const centred = sprayBoom(origin, 0, 12, 0);
  for (const offset of [-25, -3, 3, 25]) {
    const boom = sprayBoom(origin, 0, 12, offset);
    assert.ok(Math.abs(metres(boom.left, boom.right) - 12) < 0.001);
    assert.equal(boom.left.lon < centred.left.lon, offset > 0);
    assert.equal(boom.right.lon < centred.right.lon, offset > 0);
  }
  const east = sprayBoom(origin, Math.PI / 2, 12, 25);
  assert.ok(east.left.lat > origin.lat && east.right.lat > origin.lat);
});

await test("paint connects the actual previous and current boom endpoints through turns and adjustments", () => {
  const prev = sprayBoom(origin, 0, 12, 0);
  const next = sprayBoom({ lat: origin.lat + 0.0001, lon: origin.lon }, Math.PI / 4, 18, 4);
  assert.deepEqual(sprayStrip(prev, next), [
    prev.left.lon, prev.left.lat, prev.right.lon, prev.right.lat,
    next.right.lon, next.right.lat, next.left.lon, next.left.lat,
  ]);
});

await test("forward/rear offset rotates with travel and combines with lateral offset", () => {
  for (const heading of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    for (const forward of [-25, 0, 25]) {
      const centred = sprayBoom(origin, heading, 12, 0);
      const boom = sprayBoom(origin, heading, 12, 4, forward);
      assert.ok(Math.abs(metres(boom.left, boom.right) - 12) < 0.001);
      assert.ok(Math.abs(metres(centred.left, boom.left) - Math.hypot(forward, 4)) < 0.001);
    }
  }
  const northAhead = sprayBoom(origin, 0, 12, 0, 10);
  const northBehind = sprayBoom(origin, 0, 12, 0, -10);
  assert.ok(northAhead.left.lat > origin.lat && northAhead.right.lat > origin.lat);
  assert.ok(northBehind.left.lat < origin.lat && northBehind.right.lat < origin.lat);
  const eastAhead = sprayBoom(origin, Math.PI / 2, 12, 0, 10);
  assert.ok(eastAhead.left.lon > origin.lon && eastAhead.right.lon > origin.lon);
});
