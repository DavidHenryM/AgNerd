import { Cartesian3, Matrix3, TranslationRotationScale } from "cesium";
import { tractorOrientation } from "./tractor-model";

export const BOOM_SOURCE_WIDTH_METERS = 6;
export const BOOM_CLEARANCE_METERS = 0.5;
export const BOOM_HEIGHT_METERS = 0.5;
export const BOOM_NOZZLE_COUNT = 12;

export function boomNodeTransformations(widthMeters: number) {
  const ratio = widthMeters / BOOM_SOURCE_WIDTH_METERS;
  const transforms: Record<string, TranslationRotationScale> = {};
  for (const name of ["Lower rail", "Upper rail"]) {
    transforms[name] = new TranslationRotationScale(undefined, undefined, new Cartesian3(1, 1, ratio));
  }
  for (let i = 0; i < BOOM_NOZZLE_COUNT; i++) {
    const z = BOOM_SOURCE_WIDTH_METERS * ((i + 0.5) / BOOM_NOZZLE_COUNT - 0.5);
    transforms[`Station ${i}`] = new TranslationRotationScale(new Cartesian3(0, 0, z * (ratio - 1)));
  }
  return transforms;
}

export function boomNozzlePositions(left: Cartesian3, right: Cartesian3) {
  return Array.from({ length: BOOM_NOZZLE_COUNT }, (_, i) =>
    Cartesian3.lerp(left, right, (i + 0.5) / BOOM_NOZZLE_COUNT, new Cartesian3()));
}

export function boomWorldEndpoints(position: Cartesian3, headingRadians: number, widthMeters: number) {
  const rotation = Matrix3.fromQuaternion(tractorOrientation(position, headingRadians));
  return [-widthMeters / 2, widthMeters / 2].map(x => {
    const offset = Matrix3.multiplyByVector(rotation, new Cartesian3(x, 0, 0), new Cartesian3());
    return Cartesian3.add(position, offset, offset);
  });
}
