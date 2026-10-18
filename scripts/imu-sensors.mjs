// Drivers for the Adafruit 4517 LSM6DSOX (accel/gyro) + LIS3MDL (magnetometer) board on Linux I2C.
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const LSM6DSOX_WHO_AM_I = 0x6c;
export const LIS3MDL_WHO_AM_I = 0x3d;
const FIFO_WORD_BYTES = 7;
// SMBus block reads are limited to 32 bytes, so read four FIFO words per transfer.
const FIFO_WORDS_PER_READ = 4;
const MAX_FIFO_WORDS_PER_POLL = 512;

const LSM = {
  FIFO_CTRL3: 0x09,
  FIFO_CTRL4: 0x0a,
  WHO_AM_I: 0x0f,
  CTRL1_XL: 0x10,
  CTRL2_G: 0x11,
  CTRL3_C: 0x12,
  OUT_TEMP_L: 0x20,
  FIFO_STATUS1: 0x3a,
  FIFO_DATA_OUT_TAG: 0x78,
};
const LIS = { WHO_AM_I: 0x0f, CTRL_REG1: 0x20, CTRL_REG2: 0x21, CTRL_REG3: 0x22, CTRL_REG4: 0x23, CTRL_REG5: 0x24, STATUS_REG: 0x27 };
const LSM_ODR_CODES = new Map([[12.5, 1], [26, 2], [52, 3], [104, 4], [208, 5], [416, 6], [833, 7]]);
const ACCEL_RANGES = new Map([[2, [0b00, 0.061]], [4, [0b10, 0.122]], [8, [0b11, 0.244]], [16, [0b01, 0.488]]]);
const GYRO_RANGES = new Map([[125, [0b0010, 4.375]], [250, [0b0000, 8.75]], [500, [0b0100, 17.5]], [1000, [0b1000, 35]], [2000, [0b1100, 70]]]);
const LIS_ODR_CODES = new Map([[0.625, 0], [1.25, 1], [2.5, 2], [5, 3], [10, 4], [20, 5], [40, 6], [80, 7]]);
const LIS_LSB_PER_GAUSS = 6842;

function lookup(map, value, label) {
  const entry = map.get(Number(value));
  if (entry === undefined) throw new Error(`Unsupported ${label} ${value}; use one of ${[...map.keys()].join(", ")}.`);
  return entry;
}

const hex = value => `0x${value.toString(16).padStart(2, "0")}`;

/** Opens /dev/i2c-N through the optional i2c-bus native package. */
export async function openI2cBus(busNumber) {
  let i2cModule;
  try {
    i2cModule = await import("i2c-bus");
  } catch (error) {
    throw new Error(`The optional i2c-bus package is not installed (${error instanceof Error ? error.message : String(error)}). Run npm ci on the Raspberry Pi.`);
  }
  const i2c = i2cModule.default ?? i2cModule;
  const bus = await i2c.openPromisified(busNumber);
  return {
    readByte: (address, register) => bus.readByte(address, register),
    writeByte: (address, register, value) => bus.writeByte(address, register, value),
    async readBlock(address, register, length) {
      const buffer = Buffer.alloc(length);
      const { bytesRead } = await bus.readI2cBlock(address, register, length, buffer);
      if (bytesRead !== length) throw new Error(`Short I2C read from ${hex(address)} register ${hex(register)}.`);
      return buffer;
    },
    close: () => bus.close(),
  };
}

export class Lsm6dsox {
  constructor(bus, address = 0x6a, { odrHz = 208, accelRangeG = 4, gyroRangeDps = 500 } = {}) {
    this.bus = bus;
    this.address = address;
    this.odrHz = Number(odrHz);
    this.odrCode = lookup(LSM_ODR_CODES, odrHz, "LSM6DSOX output data rate");
    [this.accelCode, this.accelMgPerLsb] = lookup(ACCEL_RANGES, accelRangeG, "accelerometer range");
    [this.gyroCode, this.gyroMdpsPerLsb] = lookup(GYRO_RANGES, gyroRangeDps, "gyroscope range");
    this.pendingAccel = null;
  }

  async init() {
    const whoAmI = await this.bus.readByte(this.address, LSM.WHO_AM_I);
    if (whoAmI !== LSM6DSOX_WHO_AM_I) {
      throw new Error(`No LSM6DSOX at ${hex(this.address)}: WHO_AM_I ${hex(whoAmI)}, expected ${hex(LSM6DSOX_WHO_AM_I)}.`);
    }
    await this.bus.writeByte(this.address, LSM.CTRL3_C, 0x01);
    for (let attempt = 0; attempt < 20; attempt++) {
      await sleep(5);
      if (((await this.bus.readByte(this.address, LSM.CTRL3_C)) & 0x01) === 0) break;
    }
    // Block data update and register auto-increment.
    await this.bus.writeByte(this.address, LSM.CTRL3_C, 0x44);
    await this.bus.writeByte(this.address, LSM.CTRL1_XL, (this.odrCode << 4) | (this.accelCode << 2));
    await this.bus.writeByte(this.address, LSM.CTRL2_G, (this.odrCode << 4) | this.gyroCode);
    await this.bus.writeByte(this.address, LSM.FIFO_CTRL3, (this.odrCode << 4) | this.odrCode);
    await this.resetFifo();
    return whoAmI;
  }

  async resetFifo() {
    this.pendingAccel = null;
    await this.bus.writeByte(this.address, LSM.FIFO_CTRL4, 0x00);
    await this.bus.writeByte(this.address, LSM.FIFO_CTRL4, 0x06);
  }

  /** Reads queued FIFO words and returns gyro/accel pairs in sensor axes, oldest first. */
  async readFifo() {
    const status = await this.bus.readBlock(this.address, LSM.FIFO_STATUS1, 2);
    const queued = ((status[1] & 0x03) << 8) | status[0];
    const overrun = (status[1] & 0x40) !== 0;
    if (overrun) {
      await this.resetFifo();
      return { samples: [], overrun: true, queued };
    }
    const samples = [];
    let remaining = Math.min(queued, MAX_FIFO_WORDS_PER_POLL);
    while (remaining > 0) {
      const words = Math.min(remaining, FIFO_WORDS_PER_READ);
      const data = await this.bus.readBlock(this.address, LSM.FIFO_DATA_OUT_TAG, words * FIFO_WORD_BYTES);
      for (let offset = 0; offset < data.length; offset += FIFO_WORD_BYTES) {
        const tag = data[offset] >> 3;
        const vector = [data.readInt16LE(offset + 1), data.readInt16LE(offset + 3), data.readInt16LE(offset + 5)];
        if (tag === 0x02) {
          this.pendingAccel = vector.map(value => (value * this.accelMgPerLsb) / 1000);
        } else if (tag === 0x01 && this.pendingAccel) {
          samples.push({ gyroDps: vector.map(value => (value * this.gyroMdpsPerLsb) / 1000), accelG: this.pendingAccel });
        }
      }
      remaining -= words;
    }
    return { samples, overrun: false, queued };
  }

  async readTemperatureC() {
    const data = await this.bus.readBlock(this.address, LSM.OUT_TEMP_L, 2);
    return 25 + data.readInt16LE(0) / 256;
  }
}

export class Lis3mdl {
  constructor(bus, address = 0x1c, { odrHz = 80 } = {}) {
    this.bus = bus;
    this.address = address;
    this.odrCode = lookup(LIS_ODR_CODES, odrHz, "LIS3MDL output data rate");
  }

  async init() {
    const whoAmI = await this.bus.readByte(this.address, LIS.WHO_AM_I);
    if (whoAmI !== LIS3MDL_WHO_AM_I) {
      throw new Error(`No LIS3MDL at ${hex(this.address)}: WHO_AM_I ${hex(whoAmI)}, expected ${hex(LIS3MDL_WHO_AM_I)}.`);
    }
    await this.bus.writeByte(this.address, LIS.CTRL_REG2, 0x04);
    await sleep(10);
    // Ultra-high-performance X/Y/Z, ±4 gauss, continuous conversion, block data update.
    await this.bus.writeByte(this.address, LIS.CTRL_REG1, 0x60 | (this.odrCode << 2));
    await this.bus.writeByte(this.address, LIS.CTRL_REG2, 0x00);
    await this.bus.writeByte(this.address, LIS.CTRL_REG4, 0x0c);
    await this.bus.writeByte(this.address, LIS.CTRL_REG5, 0x40);
    await this.bus.writeByte(this.address, LIS.CTRL_REG3, 0x00);
    return whoAmI;
  }

  /** Latest field in µT (sensor axes), or null when no new conversion is ready. */
  async readFieldUt() {
    // The LIS3MDL needs the sub-address MSB set to auto-increment over I2C.
    const data = await this.bus.readBlock(this.address, LIS.STATUS_REG | 0x80, 7);
    if ((data[0] & 0x08) === 0) return null;
    return [1, 3, 5].map(offset => (data.readInt16LE(offset) / LIS_LSB_PER_GAUSS) * 100);
  }
}
