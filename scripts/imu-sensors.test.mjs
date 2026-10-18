import assert from "node:assert/strict";
import test from "node:test";
import { LIS3MDL_WHO_AM_I, LSM6DSOX_WHO_AM_I, Lis3mdl, Lsm6dsox } from "./imu-sensors.mjs";

function mockBus({ whoAmI = {}, blocks = [] } = {}) {
  const writes = [];
  const reads = [];
  const queue = [...blocks];
  return {
    writes,
    reads,
    async readByte(address, register) {
      if (register === 0x0f) return whoAmI[address];
      return 0;
    },
    async writeByte(address, register, value) {
      writes.push([address, register, value]);
    },
    async readBlock(address, register, length) {
      reads.push([address, register, length]);
      const next = queue.shift();
      assert.ok(next, `unexpected read of ${length} bytes from register ${register}`);
      assert.equal(next.length, length);
      return next;
    },
  };
}

function fifoWord(tag, x, y, z) {
  const word = Buffer.alloc(7);
  word[0] = tag << 3;
  word.writeInt16LE(x, 1);
  word.writeInt16LE(y, 3);
  word.writeInt16LE(z, 5);
  return word;
}

await test("LSM6DSOX init verifies identity and configures 208 Hz FIFO batching", async () => {
  const bus = mockBus({ whoAmI: { 0x6a: LSM6DSOX_WHO_AM_I } });
  const imu = new Lsm6dsox(bus, 0x6a);
  assert.equal(await imu.init(), LSM6DSOX_WHO_AM_I);
  const registers = new Map(bus.writes.map(([, register, value]) => [register, value]));
  assert.equal(registers.get(0x12), 0x44);
  assert.equal(registers.get(0x10), 0x58, "208 Hz, ±4 g");
  assert.equal(registers.get(0x11), 0x54, "208 Hz, ±500 dps");
  assert.equal(registers.get(0x09), 0x55, "batch both sensors at 208 Hz");
  assert.equal(registers.get(0x0a), 0x06, "continuous FIFO mode");
  await assert.rejects(new Lsm6dsox(mockBus({ whoAmI: { 0x6a: 0x69 } })).init(), /No LSM6DSOX at 0x6a/);
  assert.throws(() => new Lsm6dsox(bus, 0x6a, { odrHz: 200 }), /Unsupported LSM6DSOX output data rate/);
});

await test("LSM6DSOX FIFO pairs accelerometer and gyroscope words across reads", async () => {
  const status = Buffer.from([6, 0]);
  const firstChunk = Buffer.concat([
    fifoWord(0x01, 1, 1, 1), // gyro before any accel is dropped
    fifoWord(0x02, 0, 8197, 0), // ~1 g on y
    fifoWord(0x01, 0, 0, 1000), // 17.5 dps on z
    fifoWord(0x02, 4098, 0, 0),
  ]);
  const secondChunk = Buffer.concat([fifoWord(0x01, -2000, 0, 0), fifoWord(0x03, 0, 0, 0)]);
  const imu = new Lsm6dsox(mockBus({ blocks: [status, firstChunk, secondChunk] }));
  const result = await imu.readFifo();
  assert.equal(result.overrun, false);
  assert.equal(result.queued, 6);
  assert.equal(result.samples.length, 2);
  assert.ok(Math.abs(result.samples[0].accelG[1] - 1) < 0.001);
  assert.deepEqual(result.samples[0].gyroDps, [0, 0, 17.5]);
  assert.ok(Math.abs(result.samples[1].accelG[0] - 0.5) < 0.001);
  assert.deepEqual(result.samples[1].gyroDps, [-35, 0, 0]);
});

await test("LSM6DSOX FIFO overrun resets the queue", async () => {
  const bus = mockBus({ blocks: [Buffer.from([0xff, 0x43])] });
  const imu = new Lsm6dsox(bus);
  imu.pendingAccel = [0, 0, 1];
  const result = await imu.readFifo();
  assert.equal(result.overrun, true);
  assert.equal(result.samples.length, 0);
  assert.equal(imu.pendingAccel, null);
  assert.deepEqual(bus.writes.map(([, register, value]) => [register, value]), [[0x0a, 0], [0x0a, 6]]);
});

await test("LIS3MDL init, data-ready handling and microtesla scaling", async () => {
  const ready = Buffer.alloc(7);
  ready[0] = 0x08;
  ready.writeInt16LE(6842, 1);
  ready.writeInt16LE(-3421, 3);
  ready.writeInt16LE(0, 5);
  const bus = mockBus({ whoAmI: { 0x1c: LIS3MDL_WHO_AM_I }, blocks: [Buffer.alloc(7), ready] });
  const mag = new Lis3mdl(bus, 0x1c);
  assert.equal(await mag.init(), LIS3MDL_WHO_AM_I);
  const registers = new Map(bus.writes.map(([, register, value]) => [register, value]));
  assert.equal(registers.get(0x20), 0x7c, "UHP X/Y at 80 Hz");
  assert.equal(registers.get(0x23), 0x0c, "UHP Z");
  assert.equal(registers.get(0x22), 0x00, "continuous conversion");
  assert.equal(await mag.readFieldUt(), null);
  assert.deepEqual(await mag.readFieldUt(), [100, -50, 0]);
  assert.equal(bus.reads.at(-1)[1], 0xa7, "auto-increment bit set");
  await assert.rejects(new Lis3mdl(mockBus({ whoAmI: { 0x1c: 0 } })).init(), /No LIS3MDL/);
});
