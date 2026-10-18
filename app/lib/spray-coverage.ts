import {
  BoundingSphere, Cartesian3, Color, ColorGeometryInstanceAttribute, ComponentDatatype,
  Geometry, GeometryAttribute, GeometryAttributes, GeometryInstance, PerInstanceColorAppearance,
  Primitive, PrimitiveCollection, PrimitiveType,
} from "cesium";
import { SPRAY_COLOR } from "./spray-particles";

export const SPRAY_RENDER_BATCH_SIZE = 64;
export const SPRAY_SURFACE_HEIGHT_METERS = 0.1;

function stripMesh(strips: readonly number[][]): Geometry {
  const positions = new Float64Array(strips.length * 4 * 3);
  const indices = new Uint16Array(strips.length * 6);
  const point = new Cartesian3();
  for (let strip = 0; strip < strips.length; strip++) {
    const coordinates = strips[strip];
    for (let corner = 0; corner < 4; corner++) {
      Cartesian3.fromDegrees(coordinates[corner * 2], coordinates[corner * 2 + 1],
        SPRAY_SURFACE_HEIGHT_METERS, undefined, point);
      const offset = strip * 12 + corner * 3;
      positions[offset] = point.x;
      positions[offset + 1] = point.y;
      positions[offset + 2] = point.z;
    }
    const vertex = strip * 4;
    indices.set([vertex, vertex + 1, vertex + 2, vertex, vertex + 2, vertex + 3], strip * 6);
  }
  const attributes = new GeometryAttributes();
  attributes.position = new GeometryAttribute({
    componentDatatype: ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: positions,
  });
  return new Geometry({
    attributes,
    indices,
    primitiveType: PrimitiveType.TRIANGLES,
    boundingSphere: BoundingSphere.fromVertices(positions),
  });
}

/** Two triangles per strip; only the bounded tail changes as new fixes arrive. */
export class SprayCoverage {
  readonly primitives = new PrimitiveCollection();
  private queued: number[][] = [];
  private queuedIndex = 0;
  private active: number[][] = [];
  private displayed: Primitive | null = null;
  private displayedCount = 0;

  append(coordinates: readonly number[]) {
    this.queued.push([...coordinates]);
  }

  update() {
    while (this.active.length < SPRAY_RENDER_BATCH_SIZE && this.queuedIndex < this.queued.length) {
      this.active.push(this.queued[this.queuedIndex++]);
    }
    if (this.queuedIndex === this.queued.length) {
      this.queued = [];
      this.queuedIndex = 0;
    }
    if (this.active.length === this.displayedCount) return;

    const color = Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.45);
    const primitive = this.primitives.add(new Primitive({
      geometryInstances: new GeometryInstance({
        geometry: stripMesh(this.active),
        attributes: { color: ColorGeometryInstanceAttribute.fromColor(color) },
      }),
      appearance: new PerInstanceColorAppearance({ flat: true, translucent: true, closed: false }),
      // Geometry is already a small indexed mesh; no polygon tessellation or worker is needed.
      asynchronous: false,
      allowPicking: false,
    }));
    if (this.displayed) this.primitives.remove(this.displayed);
    this.displayed = primitive;
    this.displayedCount = this.active.length;
    if (this.displayedCount === SPRAY_RENDER_BATCH_SIZE) {
      this.active = [];
      this.displayed = null;
      this.displayedCount = 0;
    }
  }

  clear() {
    this.primitives.removeAll();
    this.queued = [];
    this.queuedIndex = 0;
    this.active = [];
    this.displayed = null;
    this.displayedCount = 0;
  }
}
