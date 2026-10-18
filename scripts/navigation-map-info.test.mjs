import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { register } from "tsx/cjs/api";

register();
const { default: NavigationMapInfo } = createRequire(import.meta.url)("../app/components/screens/NavigationMapInfo.tsx");
const manifest = { resolutionMeters: 10, capturedAt: "2026-01-01", notes: "Mixed cloud cover" };
const render = (source, overrides = {}) => renderToStaticMarkup(createElement(NavigationMapInfo, {
  source, manifest: { ...manifest, ...overrides },
}));

await test("map information starts collapsed behind a labelled 48px native disclosure", () => {
  const html = render("local");
  assert.match(html, /<details[^>]*>/);
  assert.doesNotMatch(html, /<details[^>]*\bopen(?:=|[ >])/);
  assert.match(html, /<summary[^>]*aria-label="Map information"/);
  assert.match(html, /width:48px;height:48px/);
  assert.match(html, /InfoOutlinedIcon/);
  assert.match(html, /focus-visible/);
});

await test("expanded local details retain resolution, date, notes and coverage warning", () => {
  const html = render("local");
  for (const text of ["Local imagery", "10 m/pixel", "2026-01-01", "Mixed cloud cover", "Outside coverage: low-resolution background"]) {
    assert.ok(html.includes(text), text);
  }
  const unknown = render("local", { capturedAt: null, notes: undefined });
  assert.match(unknown, /Mixed \/ unknown dates/);
  assert.doesNotMatch(unknown, /Mixed cloud cover/);
});

await test("online source does not show misleading local details", () => {
  const html = render("online");
  assert.match(html, /Online imagery/);
  assert.doesNotMatch(html, /Local imagery|m\/pixel|Mixed cloud cover|Outside coverage/);
});

await test("map and history errors stay outside the collapsible information component", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /mapConfig && <NavigationMapInfo manifest=\{mapConfig\} source=\{mapSource\} \/>/);
  assert.match(source, /<NavigationMapInfo[^]*?\/>\}\s*\{mapError && <Alert/);
  assert.match(source, /historyError && <Alert severity="error"/);
});
