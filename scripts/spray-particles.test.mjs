import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { register } from "tsx/esm/api";
import { Cartesian3, CesiumWidget, Clock, Color, Ellipsoid, Particle } from "cesium";

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
    const nozzle = Math.min(11, Math.floor(fraction * 12));
    assert.ok(Cartesian3.distance(particle.position, Cartesian3.lerp(left, right, (nozzle + 0.5) / 12, new Cartesian3())) < 1e-8);
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
  assert.equal(system.minimumImageSize.x, 1);
  assert.equal(system.minimumImageSize.y, 1);
  assert.equal(system.maximumImageSize.x, 1);
  assert.equal(system.maximumImageSize.y, 1);
  assert.equal(system.startScale, 0.25);
  assert.equal(system.endScale, 1);
  assert.ok(Color.equals(system.startColor, Color.fromCssColorString(SPRAY_COLOR).withAlpha(0.75)));
  assert.equal(system.endColor.alpha, 0);
  assert.equal(sprayEmissionRate(1), 12);
  assert.equal(sprayEmissionRate(50), 160);
  system.destroy();
});

await test("particle effects are off unless the public build setting is exactly true", () => {
  for (const value of [undefined, "", "false", "1", "TRUE", "true"]) {
    const env = { ...process.env };
    delete env.NEXT_PUBLIC_ENABLE_SPRAY_PARTICLES;
    if (value !== undefined) env.NEXT_PUBLIC_ENABLE_SPRAY_PARTICLES = value;
    const output = execFileSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e",
      'import { SPRAY_PARTICLES_ENABLED } from "./app/lib/spray-particles.ts"; console.log(SPRAY_PARTICLES_ENABLED);',
    ], { cwd: new URL("..", import.meta.url), env, encoding: "utf8" });
    assert.equal(output.trim(), String(value === "true"));
  }
});

await test("unready geometry must not suspend navigation's live animation clock", () => {
  const clock = new Clock({ shouldAnimate: true });
  const widget = Object.create(CesiumWidget.prototype);
  widget._dataSourceDisplay = { update: () => false };
  widget._canAnimateUpdateCallback = ready => { clock.canAnimate = ready; };
  widget.allowDataSourcesToSuspendAnimation = false;
  widget._onTick(clock);
  assert.equal(clock.canAnimate, true);
  widget.allowDataSourcesToSuspendAnimation = true;
  widget._onTick(clock);
  assert.equal(clock.canAnimate, false, "default Cesium policy freezes particles while ground geometry builds");
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  assert.match(source, /viewer\.allowDataSourcesToSuspendAnimation = false/);
});

await test("particle gate wraps visual setup only, leaving coverage recording outside it", () => {
  const source = readFileSync(new URL("../app/components/screens/Navigation.tsx", import.meta.url), "utf8");
  const start = source.indexOf("if (SPRAY_PARTICLES_ENABLED)");
  const end = source.indexOf("const strip = sprayTrailRef.current.update", start);
  const block = source.slice(start, end);
  assert.ok(start > 0 && end > start);
  assert.match(block, /new BoomSprayEmitter/);
  assert.match(block, /createSprayTexture/);
  assert.match(block, /createSprayParticles/);
  assert.match(block, /\n    \}\s*$/);
  assert.match(source.slice(end), /trackSession\.append\(strip\.coordinates/);
});
