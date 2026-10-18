import {
  Cartesian3, ClassificationType, Color, ColorGeometryInstanceAttribute,
  GeometryInstance, GroundPrimitive, PolygonGeometry, PolygonHierarchy, PrimitiveCollection, Rectangle,
} from "cesium";
import { SPRAY_COLOR } from "./spray-particles";

export const SPRAY_RENDER_BATCH_SIZE = 64;

/** Keep completed coverage immutable and allow only one geometry build at a time. */
export class SprayCoverage {
  readonly primitives = new PrimitiveCollection();
  private queued: number[][] = [];
  private queuedIndex = 0;
  private active: number[][] = [];
  private displayed: GroundPrimitive[] = [];
  private displayedCount = 0;
  private building: { primitives: GroundPrimitive[]; count: number } | null = null;

  append(coordinates: readonly number[]) {
    this.queued.push([...coordinates]);
  }

  update() {
    if (this.building) {
      if (!this.building.primitives.every(primitive => primitive.ready)) return;
      for (const primitive of this.displayed) this.primitives.remove(primitive);
      for (const primitive of this.building.primitives) primitive.show = true;
      this.displayed = this.building.primitives;
      this.displayedCount = this.building.count;
      this.building = null;
      if (this.displayedCount === SPRAY_RENDER_BATCH_SIZE) {
        this.active = [];
        this.displayed = [];
        this.displayedCount = 0;
      }
    }

    while (this.active.length < SPRAY_RENDER_BATCH_SIZE && this.queuedIndex < this.queued.length) {
      this.active.push(this.queued[this.queuedIndex++]);
    }
    if (this.queuedIndex === this.queued.length) {
      this.queued = [];
      this.queuedIndex = 0;
    }
    if (this.active.length === this.displayedCount) return;

    const color = Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.45);
    const groups: { instances: GeometryInstance[]; rectangles: Rectangle[] }[] = [];
    for (const coordinates of this.active) {
      const positions = Cartesian3.fromDegreesArray(coordinates);
      const geometry = new PolygonGeometry({
        polygonHierarchy: new PolygonHierarchy(positions),
      });
      const rectangle = PolygonGeometry.computeRectangleFromPositions(positions);
      // Separate overlapping footprints, as Cesium's entity batcher does, to retain darker overlap paint.
      let group = groups.find(candidate => candidate.rectangles.every(existing =>
        !Rectangle.intersection(existing, rectangle),
      ));
      if (!group) {
        group = { instances: [], rectangles: [] };
        groups.push(group);
      }
      group.rectangles.push(rectangle);
      group.instances.push(new GeometryInstance({
        geometry, attributes: { color: ColorGeometryInstanceAttribute.fromColor(color) },
      }));
    }
    const primitives = groups.map(group => this.primitives.add(new GroundPrimitive({
      geometryInstances: group.instances,
      classificationType: ClassificationType.BOTH,
      show: false,
      asynchronous: true,
      allowPicking: false,
    })));
    this.building = { primitives, count: this.active.length };
  }

  clear() {
    this.primitives.removeAll();
    this.queued = [];
    this.queuedIndex = 0;
    this.active = [];
    this.displayed = [];
    this.displayedCount = 0;
    this.building = null;
  }
}
