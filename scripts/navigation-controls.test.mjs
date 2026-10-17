import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { register } from "tsx/esm/api";
import { register as registerCjs } from "tsx/cjs/api";

registerCjs();
register();
const { default: NavigationControls } = createRequire(import.meta.url)("../app/components/screens/NavigationControls.tsx");
const { navigationZoomIn, navigationZoomOut } = await import("../app/lib/navigation-zoom.ts");

const noop = () => {};
function controls(isSpraying, active = false, overrides = {}) {
  return renderToStaticMarkup(createElement(NavigationControls, {
    latitude: null, longitude: null, locationTimestamp: null, accuracy: null, speed: null,
    gpsConnected: false, fixType: null, satellites: null, fixStatusStale: true,
    browserLocation: false, isSpraying, onSprayingToggle: noop,
    trackState: {
      track: active ? { id: "track", startedAt: "2026-10-17T00:00:00Z", totalAreaSqMeters: 0 } : null,
      totalAreaSqMeters: 0, busy: false, saving: false, dirty: false, error: null, conflict: false,
      ...overrides,
    },
    onPause: noop, onNewTrack: async () => true, onResumeTrack: async () => true,
    onDeleteTrack: async () => true, onRetrySave: noop,
    widthMeters: 6, setWidthMeters: noop, offsetMeters: 0, setOffsetMeters: noop,
    forwardOffsetMeters: -1.5, setForwardOffsetMeters: noop, totalAreaSqMeters: 0,
    selectedColor: "#4CAF50", mapScaleMeters: 10, mapScalePixels: 120,
    onZoomIn: noop, onZoomOut: noop,
  }));
}

await test("one large Play button starts spraying; stop and reset are not standalone controls", () => {
  const html = controls(false, false);
  assert.match(html, /aria-label="Start spraying" aria-pressed="false"/);
  assert.doesNotMatch(html, /aria-label="(?:Stop tracking|Reset coverage|Pause spraying)"/);
  assert.match(html, /width:96px;height:96px;min-height:96px/);
  assert.match(html, /font-size:48px/);
  assert.match(html, /aria-label="Navigation menu"/);
});

await test("active spraying shows only Pause and visible spraying status", () => {
  const html = controls(true, false);
  const pause = html.match(/<button[^>]*aria-label="Pause spraying"[^>]*>/)?.[0];
  assert.ok(pause);
  assert.doesNotMatch(pause, /disabled/);
  assert.match(pause, /aria-pressed="true"/);
  assert.match(html, />Spraying</);
  assert.doesNotMatch(html, /aria-label="(?:Start spraying|Resume spraying|Stop tracking)"/);
});

await test("paused spraying shows resume and a visible paused status", () => {
  const html = controls(false, true);
  assert.match(html, /aria-label="Resume spraying" aria-pressed="false"/);
  assert.match(html, /Spray paused/);
  assert.doesNotMatch(html, /aria-label="Stop tracking"/);
});

await test("both zoom controls use 80px touch targets, 40px icons and 12px spacing", () => {
  const html = controls(false);
  assert.match(html, /aria-label="Zoom out"/);
  assert.match(html, /aria-label="Zoom in"/);
  assert.match(html, /width:80px;height:80px;min-height:80px/);
  assert.match(html, /font-size:40px/);
  assert.match(html, /margin-left:12px/);
});

await test("save errors are visible and block Play; retry is offered", () => {
  const html = controls(false, true, { error: "Database unavailable", dirty: true });
  assert.match(html, /Database unavailable/);
  assert.match(html, /Retry save/);
  assert.match(html, /Unsaved changes/);
  assert.match(html, /<button[^>]*disabled=""[^>]*aria-label="Resume spraying"/);
});

await test("larger zoom controls preserve exact increments and range limits", () => {
  assert.equal(navigationZoomIn(100), 75);
  assert.equal(navigationZoomOut(100), 133);
  assert.equal(navigationZoomIn(21), 20);
  assert.equal(navigationZoomIn(20), 20);
  assert.equal(navigationZoomOut(9999), 10000);
  assert.equal(navigationZoomOut(10000), 10000);
});
