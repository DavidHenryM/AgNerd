import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { register } from "tsx/esm/api";

register();
const { navigationHeading, MIN_NAVIGATION_COURSE_SPEED_MPS } = await import("../app/lib/navigation-heading.ts");
const start = { lat: -36, lon: 148 };
const north = { lat: -35.99999, lon: 148 };

await test("stopping retains heading despite a 180-degree GNSS course flip or position drift", () => {
  let heading = navigationHeading(0, null, start, 90, 2);
  assert.equal(heading, Math.PI / 2);
  for (const speed of [0.79, 0.2, 0.01, 0]) {
    heading = navigationHeading(heading, start, north, 270, speed);
    assert.equal(heading, Math.PI / 2);
  }
  assert.equal(navigationHeading(heading, start, north, null, 0), heading);
  assert.equal(navigationHeading(heading, start, start, 270, null), heading);
  assert.equal(navigationHeading(heading, null, start, 270, null), heading);
  assert.equal(navigationHeading(heading, north, north, 120, 2), 120 * Math.PI / 180);
});

await test("moving course and displacement fallback still work, including north wrap and reverse travel", () => {
  assert.equal(MIN_NAVIGATION_COURSE_SPEED_MPS, 0.8);
  for (const course of [0, 90, 180, 270, 359]) {
    assert.equal(navigationHeading(1, start, north, course, 0.8), course * Math.PI / 180);
  }
  assert.equal(navigationHeading(1, start, north, null, 2), 0);
  assert.equal(navigationHeading(1, start, north, 270, null), 0, "unknown speed uses displacement, not an unverified course");
  assert.ok(Math.abs(navigationHeading(0, north, start, null, 2) - Math.PI) < 1e-9);
  assert.equal(navigationHeading(1, start, start, null, 2), 1);
});

await test("navigation normalizes receiver knots and leaves browser metres/second unchanged before heading selection", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /positionSource === "gnss-status" \? speed \* 0\.514444 : speed/);
  assert.match(source, /navigationHeading\(boomHeadingRef\.current, previous, current, heading, speedMps\)/);
  assert.doesNotMatch(source, /if \(heading !== null\) boomHeadingRef/);
});
