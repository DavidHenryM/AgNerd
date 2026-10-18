import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { register } from "tsx/esm/api";
import {
  Camera, Cartesian2, Cartesian3, Cartographic, Ellipsoid, EllipsoidGeodesic,
  GeographicProjection, HeadingPitchRange, SceneMode,
} from "cesium";

register();
const { navigationMapScale, SCALE_KEY_MAX_PIXELS } = await import("../app/lib/navigation-scale.ts");

function sceneAt(metersPerPixel) {
  const ellipsoid = Ellipsoid.WGS84;
  const ground = pixel => Cartesian3.fromRadians(pixel.x * metersPerPixel / ellipsoid.maximumRadius, 0);
  return {
    canvas: { clientWidth: 1024, clientHeight: 600 },
    camera: { getPickRay: pixel => ({ pixel }), pickEllipsoid: pixel => ground(pixel) },
    globe: { ellipsoid, pick: ray => ground(ray.pixel) },
  };
}

await test("distance label and bar width agree with ground distance in CSS pixels", () => {
  assert.equal(SCALE_KEY_MAX_PIXELS, 120);
  for (const metersPerPixel of [0.002, 0.05, 0.14, 0.3, 1, 30, 300]) {
    const scale = navigationMapScale(sceneAt(metersPerPixel), new Cartesian2(900, 500));
    assert.ok(scale.mapScaleMeters > 0);
    assert.ok(scale.mapScalePixels <= 120);
    assert.ok(scale.mapScalePixels >= 47.9);
    assert.ok(Math.abs(scale.mapScaleMeters - scale.mapScalePixels * metersPerPixel) < 1e-5);
    const normalized = scale.mapScaleMeters / 10 ** Math.floor(Math.log10(scale.mapScaleMeters));
    assert.ok([1, 2, 5].some(value => Math.abs(value - normalized) < 1e-8));
  }
});

await test("uses the map ellipsoid rather than coarse terrain mesh intersections", () => {
  const scene = sceneAt(0.1);
  scene.globe.pick = () => { throw new Error("coarse terrain meshes should not be used"); };
  const scale = navigationMapScale(scene, new Cartesian2(900, 500));
  assert.ok(Math.abs(scale.mapScaleMeters - scale.mapScalePixels * 0.1) < 1e-5);
});

await test("actual Cesium projection stays within 0.1% across viewport, zoom, tilt and pixel density", () => {
  for (const [width, height] of [[800, 480], [1024, 600], [1280, 656]]) {
    for (const pixelRatio of [1, 2]) {
      const scene = {
        canvas: { clientWidth: width, clientHeight: height },
        drawingBufferWidth: width * pixelRatio, drawingBufferHeight: height * pixelRatio,
        mapProjection: new GeographicProjection(), ellipsoid: Ellipsoid.WGS84,
        mode: SceneMode.SCENE3D, globe: { ellipsoid: Ellipsoid.WGS84 },
      };
      scene.camera = new Camera(scene);
      for (const range of [20, 100, 1000]) {
        for (const pitch of [-35, -60]) {
          scene.camera.lookAt(Cartesian3.fromDegrees(148, -36), new HeadingPitchRange(0, pitch * Math.PI / 180, range));
          const right = new Cartesian2(width - 80, height - 40);
          const scale = navigationMapScale(scene, right);
          assert.ok(scale.mapScaleMeters > 0);
          const start = scene.camera.pickEllipsoid(new Cartesian2(right.x - scale.mapScalePixels, right.y));
          const end = scene.camera.pickEllipsoid(right);
          const actualDistance = new EllipsoidGeodesic(
            Cartographic.fromCartesian(start), Cartographic.fromCartesian(end),
          ).surfaceDistance;
          assert.ok(Math.abs(actualDistance / scale.mapScaleMeters - 1) < 0.001,
            `incorrect scale for ${width}x${height}, pixel ratio ${pixelRatio}, range ${range}, pitch ${pitch}`);
        }
      }
    }
  }
});

await test("unavailable ground, off-canvas bars and degenerate picks show no distance", () => {
  const scene = sceneAt(1);
  for (const right of [new Cartesian2(100, 500), new Cartesian2(1025, 500),
    new Cartesian2(900, -1), new Cartesian2(900, 601), new Cartesian2(NaN, 500)]) {
    assert.deepEqual(navigationMapScale(scene, right), { mapScaleMeters: null, mapScalePixels: 120 });
  }
  scene.camera.pickEllipsoid = () => undefined;
  assert.equal(navigationMapScale(scene, new Cartesian2(900, 500)).mapScaleMeters, null);
  scene.camera.pickEllipsoid = () => Cartesian3.fromDegrees(148, -36);
  assert.equal(navigationMapScale(scene, new Cartesian2(900, 500)).mapScaleMeters, null);
});

await test("navigation measures the actual bar location after rendering and cleans up the listener", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /mapScaleRef\.current\?\.getBoundingClientRect\(\)/);
  assert.match(source, /bar\.right - canvas\.left, bar\.top \+ bar\.height \/ 2 - canvas\.top/);
  assert.match(source, /removeScaleListener\(\)/);
  assert.doesNotMatch(source, /SCALE_KEY_ZOOM_FACTOR|zoomLevelDistanceForPixelSpan/);
  const controls = readFileSync(new URL("../app/components/screens/NavigationControls.tsx", import.meta.url), "utf8");
  assert.match(controls, /ref=\{mapScaleRef\}/);
});
