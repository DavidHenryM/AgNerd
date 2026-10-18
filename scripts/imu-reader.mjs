#!/usr/bin/env node
// agnerd-imu: reads the Qwiic LSM6DSOX + LIS3MDL and publishes attitude for the GNSS reader.
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { DEFAULT_AXIS_MAP, ImuProcessor, axisMatrix, loadImuCalibration } from "./imu-fusion.mjs";
import { Lis3mdl, Lsm6dsox, openI2cBus } from "./imu-sensors.mjs";

function integerEnv(name, fallback, min, max) {
  const raw = process.env[name];
  const value = raw === undefined || raw === "" ? fallback : Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    console.error(`${name} must be an integer from ${min} to ${max}.`);
    process.exit(1);
  }
  return value;
}

const config = {
  bus: integerEnv("IMU_I2C_BUS", 1, 0, 255),
  accelGyroAddress: integerEnv("IMU_ACCEL_GYRO_ADDRESS", 0x6a, 0x03, 0x77),
  magAddress: integerEnv("IMU_MAG_ADDRESS", 0x1c, 0x03, 0x77),
  odrHz: Number(process.env.IMU_ODR_HZ || "208"),
  pollIntervalMs: integerEnv("IMU_POLL_INTERVAL_MS", 20, 5, 200),
  statusIntervalMs: integerEnv("IMU_STATUS_INTERVAL_MS", 50, 20, 1000),
  reconnectMs: integerEnv("IMU_RECONNECT_MS", 5000, 500, 60000),
  axisMap: process.env.IMU_AXIS_MAP || DEFAULT_AXIS_MAP,
  magAxisMap: process.env.IMU_MAG_AXIS_MAP || process.env.IMU_AXIS_MAP || DEFAULT_AXIS_MAP,
  magEnabled: (process.env.IMU_MAG_ENABLED || "true").toLowerCase() !== "false",
  statusFile: process.env.IMU_STATUS_FILE || "/tmp/agnerd-imu-status.json",
  calibrationFile: process.env.IMU_CALIBRATION_FILE || "/var/lib/agnerd/imu-calibration.json",
  gnssStatusFile: process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json",
};

try {
  axisMatrix(config.axisMap);
  axisMatrix(config.magAxisMap);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const calibrationResult = await loadImuCalibration(config.calibrationFile);
if (calibrationResult.error) console.error(`IMU calibration '${config.calibrationFile}' ignored: ${calibrationResult.error}`);
else if (!calibrationResult.loaded) console.warn(`No IMU calibration at ${config.calibrationFile}; using nominal mounting. Run npm run imu:calibrate.`);

const processor = new ImuProcessor({
  axisMap: config.axisMap,
  magAxisMap: config.magAxisMap,
  calibration: calibrationResult.calibration,
  nominalRateHz: config.odrHz,
});

const status = {
  startedAt: new Date().toISOString(),
  pid: process.pid,
  healthy: false,
  error: null,
  connectedAt: null,
  i2cErrors: 0,
  fifoOverruns: 0,
  temperatureC: null,
  sensors: {
    accelGyro: { address: config.accelGyroAddress, ok: false, error: null },
    mag: { address: config.magAddress, enabled: config.magEnabled, ok: false, error: null },
  },
};

let bus = null;
let imu = null;
let mag = null;
let consecutiveErrors = 0;
let reconnectAt = 0;
let lastTemperatureAt = 0;
let lastSpeedReadAt = 0;

const errorMessage = error => error instanceof Error ? error.message : String(error);

async function disconnect() {
  imu = null;
  mag = null;
  status.healthy = false;
  status.sensors.accelGyro.ok = false;
  status.sensors.mag.ok = false;
  const current = bus;
  bus = null;
  if (current) await current.close().catch(() => {});
}

async function connect() {
  try {
    bus = await openI2cBus(config.bus);
    imu = new Lsm6dsox(bus, config.accelGyroAddress, { odrHz: config.odrHz });
    await imu.init();
    status.sensors.accelGyro = { address: config.accelGyroAddress, ok: true, error: null };
    processor.resetRate();
  } catch (error) {
    status.error = `Accelerometer/gyroscope unavailable on /dev/i2c-${config.bus}: ${errorMessage(error)}`;
    status.sensors.accelGyro.error = errorMessage(error);
    await disconnect();
    return false;
  }
  if (config.magEnabled) {
    try {
      mag = new Lis3mdl(bus, config.magAddress);
      await mag.init();
      status.sensors.mag = { address: config.magAddress, enabled: true, ok: true, error: null };
    } catch (error) {
      mag = null;
      status.sensors.mag = { address: config.magAddress, enabled: true, ok: false, error: errorMessage(error) };
      console.error(`Magnetometer unavailable: ${errorMessage(error)}`);
    }
  }
  status.error = null;
  status.healthy = true;
  status.connectedAt = new Date().toISOString();
  consecutiveErrors = 0;
  console.log(`IMU connected on /dev/i2c-${config.bus} (accel/gyro ${config.accelGyroAddress.toString(16)}, magnetometer ${mag ? config.magAddress.toString(16) : "off"}).`);
  return true;
}

async function refreshSpeed(now) {
  if (now - lastSpeedReadAt < 200) return;
  lastSpeedReadAt = now;
  try {
    const gnss = JSON.parse(await readFile(config.gnssStatusFile, "utf8"));
    const knots = gnss?.latest?.speedKnots;
    const readAt = Date.parse(gnss?.lastReadAt);
    if (typeof knots === "number" && Number.isFinite(knots) && now - readAt < 2000) {
      processor.setSpeed(knots * 0.514444, now);
    }
  } catch {
    // GNSS speed only refines tilt; the IMU still works without it.
  }
}

async function poll() {
  const now = Date.now();
  if (!imu) {
    if (now >= reconnectAt) {
      reconnectAt = now + config.reconnectMs;
      await connect();
    }
    return;
  }
  try {
    const fifo = await imu.readFifo();
    if (fifo.overrun) {
      status.fifoOverruns += 1;
      processor.resetRate();
    } else {
      processor.addImuSamples(fifo.samples, now);
    }
    if (mag) {
      try {
        const field = await mag.readFieldUt();
        if (field) processor.addMag(field, now);
        status.sensors.mag.ok = true;
        status.sensors.mag.error = null;
      } catch (error) {
        status.i2cErrors += 1;
        status.sensors.mag.ok = false;
        status.sensors.mag.error = errorMessage(error);
      }
    }
    if (now - lastTemperatureAt > 1000) {
      lastTemperatureAt = now;
      status.temperatureC = Number((await imu.readTemperatureC()).toFixed(1));
    }
    consecutiveErrors = 0;
    status.healthy = true;
    status.error = null;
  } catch (error) {
    status.i2cErrors += 1;
    consecutiveErrors += 1;
    status.error = errorMessage(error);
    if (consecutiveErrors >= 10) {
      console.error(`IMU read failed repeatedly; reconnecting: ${errorMessage(error)}`);
      await disconnect();
      reconnectAt = Date.now() + config.reconnectMs;
    }
  }
  await refreshSpeed(now);
}

async function writeStatus() {
  const now = Date.now();
  const snapshot = processor.snapshot(now);
  const fresh = snapshot.sampleAtMs !== null && now - snapshot.sampleAtMs < 500;
  const payload = {
    version: 1,
    ...status,
    healthy: status.healthy && snapshot.initialized && fresh,
    updatedAt: new Date(now).toISOString(),
    updatedAtMs: now,
    axisMap: config.axisMap,
    magAxisMap: config.magAxisMap,
    calibration: {
      path: config.calibrationFile,
      loaded: calibrationResult.loaded,
      error: calibrationResult.error,
      createdAt: calibrationResult.calibration.createdAt,
      mount: calibrationResult.calibration.mount,
      magCalibrated: calibrationResult.calibration.mag !== null,
    },
    ...snapshot,
  };
  const temporary = `${config.statusFile}.tmp`;
  await mkdir(dirname(config.statusFile), { recursive: true });
  await writeFile(temporary, JSON.stringify(payload), "utf8");
  await rename(temporary, config.statusFile);
}

function serialInterval(task, intervalMs, label) {
  let busy = false;
  return setInterval(() => {
    if (busy) return;
    busy = true;
    task().catch(error => console.error(`IMU ${label} failed: ${errorMessage(error)}`)).finally(() => { busy = false; });
  }, intervalMs);
}

const timers = [
  serialInterval(poll, config.pollIntervalMs, "poll"),
  serialInterval(writeStatus, config.statusIntervalMs, "status write"),
];

let shuttingDown = false;
async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  timers.forEach(clearInterval);
  await disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
