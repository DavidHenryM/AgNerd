import assert from "node:assert/strict";
import test from "node:test";
import { register } from "tsx/esm/api";
import { Cartesian3, Color, Ellipsoid, Particle } from "cesium";

register();
const { BoomSprayEmitter, createSprayParticles, sprayEmissionRate, SPRAY_COLOR } =
  await import("../app/lib/spray-particles.ts");
const { sprayBoom } = await import("../app/lib/spray-boom.ts");

await test("particles emit across the offset boom and fall toward the ground", (t) => {
  const boom = sprayBoom({ lat: -36.5601857, lon: 148.8247819 }, Math.PI / 2, 18, 4, -6);
  const left = Cartesian3.fromDegrees(boom.left.lon, boom.left.lat, 1.2);
  const right = Cartesian3.fromDegrees(boom.right.lon, boom.right.lat, 1.2);
  const emitter = new BoomSprayEmitter();
  emitter.setEndpoints(left, right);
  const random = t.mock.method(Math, "random", () => 0);
  for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
    random.mock.mockImplementation(() => fraction);
    const particle = new Particle();
    emitter.emit(particle);
    assert.ok(Cartesian3.distance(particle.position, Cartesian3.lerp(left, right, fraction, new Cartesian3())) < 1e-8);
    const normal = Ellipsoid.WGS84.geodeticSurfaceNormal(particle.position);
    assert.ok(Math.abs(Cartesian3.dot(particle.velocity, normal) + 1) < 1e-8);
  }
});

await test("moving the emitter does not move existing droplets", (t) => {
  t.mock.method(Math, "random", () => 0.5);
  const emitter = new BoomSprayEmitter();
  emitter.setEndpoints(Cartesian3.fromDegrees(148.8247, -36.5601, 1.2), Cartesian3.fromDegrees(148.8249, -36.5601, 1.2));
  const particle = new Particle();
  emitter.emit(particle);
  const emittedPosition = Cartesian3.clone(particle.position);
  emitter.setEndpoints(Cartesian3.fromDegrees(148.8247, -36.5602, 1.2), Cartesian3.fromDegrees(148.8249, -36.5602, 1.2));
  assert.deepEqual(particle.position, emittedPosition);
});

await test("purple mist has short lifetime, metre sizing and bounded emission", () => {
  const system = createSprayParticles(new BoomSprayEmitter(), {}, 12);
  assert.equal(system.emissionRate, 60);
  assert.equal(system.minimumParticleLife, 0.8);
  assert.equal(system.maximumParticleLife, 0.8);
  assert.equal(system.sizeInMeters, true);
  assert.ok(Color.equals(system.startColor, Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.75)));
  assert.equal(system.endColor.alpha, 0);
  assert.equal(sprayEmissionRate(1), 12);
  assert.equal(sprayEmissionRate(50), 160);
  system.destroy();
});
