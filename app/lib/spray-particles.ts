import { Cartesian2, Cartesian3, Color, Ellipsoid, Particle, ParticleSystem } from "cesium";
import { boomNozzlePositions } from "./boom-model";

export const SPRAY_COLOR = "#D98CCB";
export const SPRAY_PARTICLES_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SPRAY_PARTICLES === "true";

export class BoomSprayEmitter {
  readonly left = new Cartesian3();
  readonly right = new Cartesian3();
  private nozzles = boomNozzlePositions(this.left, this.right);

  setEndpoints(left: Cartesian3, right: Cartesian3) {
    Cartesian3.clone(left, this.left);
    Cartesian3.clone(right, this.right);
    this.nozzles = boomNozzlePositions(left, right);
  }

  emit(particle: Particle) {
    // World-space emission keeps already emitted droplets behind the moving boom.
    const index = Math.min(this.nozzles.length - 1, Math.floor(Math.random() * this.nozzles.length));
    Cartesian3.clone(this.nozzles[index], particle.position);
    Ellipsoid.WGS84.geodeticSurfaceNormal(particle.position, particle.velocity);
    Cartesian3.negate(particle.velocity, particle.velocity);
  }
}

export function sprayEmissionRate(widthMeters: number) {
  return Math.min(160, Math.max(12, widthMeters * 5));
}

export function createSprayParticles(emitter: BoomSprayEmitter, image: HTMLCanvasElement, widthMeters: number) {
  return new ParticleSystem({
    emitter,
    image,
    emissionRate: sprayEmissionRate(widthMeters),
    startColor: Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.75),
    endColor: Color.fromCssColorString(SPRAY_COLOR).withAlpha(0),
    // Cesium packs billboard dimensions as integers; use scale for sub-metre droplets.
    imageSize: new Cartesian2(1, 1),
    sizeInMeters: true,
    startScale: 0.25,
    endScale: 1,
    minimumSpeed: 0.8,
    maximumSpeed: 1.2,
    particleLife: 0.8,
  });
}

export function createSprayTexture() {
  const image = document.createElement("canvas");
  image.width = image.height = 32;
  const context = image.getContext("2d");
  if (!context) throw new Error("Unable to create spray particle texture");
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  return image;
}
