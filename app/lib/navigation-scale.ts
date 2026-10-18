import { Cartesian2, Cartographic, EllipsoidGeodesic, type Scene } from "cesium";

export const SCALE_KEY_MAX_PIXELS = 120;

export interface NavigationMapScale {
  mapScaleMeters: number | null;
  mapScalePixels: number;
}

export function navigationMapScale(scene: Scene, right: Cartesian2): NavigationMapScale {
  const unavailable = { mapScaleMeters: null, mapScalePixels: SCALE_KEY_MAX_PIXELS };
  const { camera, globe, canvas } = scene;
  if (!Number.isFinite(right.x) || !Number.isFinite(right.y) ||
    right.x < SCALE_KEY_MAX_PIXELS || right.x > canvas.clientWidth ||
    right.y < 0 || right.y > canvas.clientHeight) return unavailable;

  // Navigation uses ellipsoid terrain; unloaded/coarse globe meshes give inaccurate near-ground picks.
  const leftPosition = camera.pickEllipsoid(new Cartesian2(right.x - SCALE_KEY_MAX_PIXELS, right.y), globe.ellipsoid);
  const rightPosition = camera.pickEllipsoid(right, globe.ellipsoid);
  if (!leftPosition || !rightPosition) return unavailable;

  const distance = new EllipsoidGeodesic(
    Cartographic.fromCartesian(leftPosition, globe.ellipsoid),
    Cartographic.fromCartesian(rightPosition, globe.ellipsoid),
    globe.ellipsoid,
  ).surfaceDistance;
  if (!Number.isFinite(distance) || distance <= 0) return unavailable;

  const power = 10 ** Math.floor(Math.log10(distance));
  const normalized = distance / power;
  const meters = (normalized >= 5 ? 5 : normalized >= 2 ? 2 : 1) * power;
  return {
    mapScaleMeters: meters,
    mapScalePixels: SCALE_KEY_MAX_PIXELS * meters / distance,
  };
}
