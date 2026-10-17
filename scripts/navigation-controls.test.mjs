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

const noop = () => {};
function controls(isTracking, isSprayPaused) {
  return renderToStaticMarkup(createElement(NavigationControls, {
    latitude: null, longitude: null, locationTimestamp: null, accuracy: null, speed: null,
    gpsConnected: false, fixType: null, satellites: null, fixStatusStale: true,
    browserLocation: false, isTracking, isSprayPaused,
    onTrackingToggle: noop, onSprayPauseToggle: noop,
    widthMeters: 6, setWidthMeters: noop, offsetMeters: 0, setOffsetMeters: noop,
    forwardOffsetMeters: -1.5, setForwardOffsetMeters: noop, totalAreaSqMeters: 0,
    selectedColor: "#4CAF50", mapScaleMeters: 10, mapScalePixels: 120,
    onZoomIn: noop, onZoomOut: noop, onReset: noop,
  }));
}

await test("pause spraying is disabled until tracking starts", () => {
  const html = controls(false, false);
  assert.match(html, /<button[^>]*disabled=""[^>]*aria-label="Pause spraying"[^>]*aria-pressed="false"/);
  assert.match(html, /aria-label="Start tracking"/);
});

await test("active tracking offers pause without stopping navigation", () => {
  const html = controls(true, false);
  const pause = html.match(/<button[^>]*aria-label="Pause spraying"[^>]*>/)?.[0];
  assert.ok(pause);
  assert.doesNotMatch(pause, /disabled/);
  assert.match(pause, /aria-pressed="false"/);
  assert.match(html, /aria-label="Stop tracking"/);
});

await test("paused spraying shows resume and a visible paused status", () => {
  const html = controls(true, true);
  assert.match(html, /aria-label="Resume spraying" aria-pressed="true"/);
  assert.match(html, /Spray paused/);
  assert.match(html, /aria-label="Stop tracking"/);
});
