import { Cartesian3, HeadingPitchRoll, Transforms } from "cesium";

// Measured from transformed vertices in the centred Tractor.glb (glTF Y-up).
export const TRACTOR_SOURCE_WIDTH_METERS = 4.548716854370422;
export const TRACTOR_WORLD_SCALE = 2 / TRACTOR_SOURCE_WIDTH_METERS;

export function tractorOrientation(position: Cartesian3, headingRadians: number) {
  // Cesium's default glTF Y-up/Z-forward correction maps this mesh's +X nose
  // onto local +Y (north at zero HPR), matching GPS compass headings.
  return Transforms.headingPitchRollQuaternion(
    position, new HeadingPitchRoll(headingRadians, 0, 0),
  );
}
