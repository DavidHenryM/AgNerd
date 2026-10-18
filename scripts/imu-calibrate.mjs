#!/usr/bin/env node
// Interactive IMU calibration: gyro bias, mount tilt and magnetometer hard/soft iron.
// Stop the agnerd-imu service first so only one process reads the sensor FIFO.
import { readFile, rm } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { DEFAULT_AXIS_MAP, ImuProcessor, axisMatrix, loadImuCalibration, matVec, saveImuCalibration } from "./imu-fusion.mjs";
import { Lis3mdl, Lsm6dsox, openI2cBus } from "./imu-sensors.mjs";
import { magCalibrationFromCircles, maxStdDev, meanVector, mountFromParks, vehicleGyroBias } from "./imu-calibration.mjs";

const args = new Map(process.argv.slice(2).map(arg => {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  return [key, value];
}));
if (args.has("help")) {
  console.log(`Usage: npm run imu:calibrate -- [--skip-reverse] [--skip-mag] [--park-seconds=20] [--yaw-offset=0] [--force]

  --skip-reverse   Use one park only (assumes level ground).
  --skip-mag       Keep the existing magnetometer calibration.
  --park-seconds   Seconds to record each park (default 20).
  --yaw-offset     Known mount yaw in degrees, positive counter-clockwise (default 0).
  --force          Run even if the agnerd-imu service appears to be running.`);
  process.exit(0);
}

const env = process.env;
const config = {
  bus: Number(env.IMU_I2C_BUS || 1),
  accelGyroAddress: Number(env.IMU_ACCEL_GYRO_ADDRESS || 0x6a),
  magAddress: Number(env.IMU_MAG_ADDRESS || 0x1c),
  odrHz: Number(env.IMU_ODR_HZ || 208),
  axisMap: env.IMU_AXIS_MAP || DEFAULT_AXIS_MAP,
  magAxisMap: env.IMU_MAG_AXIS_MAP || env.IMU_AXIS_MAP || DEFAULT_AXIS_MAP,
  statusFile: env.IMU_STATUS_FILE || "/tmp/agnerd-imu-status.json",
  calibrationFile: env.IMU_CALIBRATION_FILE || "/var/lib/agnerd/imu-calibration.json",
  fusionStateFile: env.GNSS_FUSION_STATE_FILE || "/var/lib/agnerd/heading-fusion.json",
  parkSeconds: Number(args.get("park-seconds") || 20),
  yawOffsetDeg: Number(args.get("yaw-offset") || 0),
  skipReverse: args.has("skip-reverse"),
  skipMag: args.has("skip-mag") || (env.IMU_MAG_ENABLED || "true").toLowerCase() === "false",
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fmt = (vector, digits = 3) => `[${vector.map(value => value.toFixed(digits)).join(", ")}]`;

async function serviceRunning() {
  try {
    const status = JSON.parse(await readFile(config.statusFile, "utf8"));
    return Number.isFinite(status.updatedAtMs) && Date.now() - status.updatedAtMs < 3000;
  } catch {
    return false;
  }
}

/** Polls the sensors for durationMs, or until shouldStop() returns true. */
async function record(imu, mag, durationMs, { onImu, onMag, shouldStop = () => false, progress }) {
  const started = Date.now();
  let lastProgress = started;
  await imu.resetFifo();
  while (Date.now() - started < durationMs && !shouldStop()) {
    const now = Date.now();
    const fifo = await imu.readFifo();
    if (!fifo.overrun) onImu(fifo.samples, now);
    if (mag && onMag) {
      const field = await mag.readFieldUt();
      if (field) onMag(field, now);
    }
    if (progress && now - lastProgress >= 1000) {
      lastProgress = now;
      progress(Math.round((now - started) / 1000));
    }
    await sleep(20);
  }
}

async function park(imu, label) {
  const gyro = [];
  const accel = [];
  console.log(`Recording ${label} for ${config.parkSeconds} s. Keep the vehicle still (engine idling is fine)...`);
  await record(imu, null, config.parkSeconds * 1000, {
    onImu: samples => samples.forEach(sample => { gyro.push(sample.gyroDps); accel.push(sample.accelG); }),
  });
  if (accel.length < config.parkSeconds * 20) throw new Error(`Only ${accel.length} samples were read; check the sensor connection.`);
  const accelNoise = maxStdDev(accel);
  if (accelNoise > 0.05) throw new Error(`The vehicle moved during the ${label} (accelerometer noise ${accelNoise.toFixed(3)} g). Try again.`);
  const nominal = axisMatrix(config.axisMap);
  return { gyroBiasDps: meanVector(gyro), up: matVec(nominal, meanVector(accel)), accelNoise };
}

async function main() {
  if (!args.has("force") && await serviceRunning()) {
    console.error("The agnerd-imu service is running. Stop it with 'sudo systemctl stop agnerd-imu' (or pass --force).");
    process.exit(1);
  }
  axisMatrix(config.axisMap);
  axisMatrix(config.magAxisMap);
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const bus = await openI2cBus(config.bus);
  try {
    const imu = new Lsm6dsox(bus, config.accelGyroAddress, { odrHz: config.odrHz });
    await imu.init();
    let mag = null;
    if (!config.skipMag) {
      mag = new Lis3mdl(bus, config.magAddress);
      await mag.init();
    }
    console.log(`Sensors found on /dev/i2c-${config.bus}. Axis map ${config.axisMap}, magnetometer map ${config.magAxisMap}.`);

    await rl.question("\nStep 1: park on firm ground, put the handbrake on, then press Enter.");
    const first = await park(imu, "first park");
    let reversed = null;
    if (!config.skipReverse) {
      await rl.question("\nStep 2: turn around and park on the same spot facing the opposite direction, then press Enter.");
      reversed = await park(imu, "reversed park");
    }
    const mount = mountFromParks(first.up, reversed?.up ?? null, config.yawOffsetDeg);
    const sensorBias = reversed ? meanVector([first.gyroBiasDps, reversed.gyroBiasDps]) : first.gyroBiasDps;
    const gyroBiasDps = vehicleGyroBias(sensorBias, config.axisMap, mount);
    console.log(`Gyro bias ${fmt(gyroBiasDps)} deg/s; mount roll ${mount.rollDeg.toFixed(2)}°, pitch ${mount.pitchDeg.toFixed(2)}°` +
      (mount.groundSlopeDeg === null ? " (assumes level ground)." : `; ground slope ${mount.groundSlopeDeg.toFixed(2)}°.`));

    const existing = await loadImuCalibration(config.calibrationFile);
    let magCalibration = existing.calibration.mag;
    if (mag) {
      await rl.question("\nStep 3: in an open area away from sheds, fences and other vehicles, press Enter and drive two slow full circles.");
      const processor = new ImuProcessor({
        axisMap: config.axisMap,
        magAxisMap: config.magAxisMap,
        calibration: { gyroBiasDps, mount },
        nominalRateHz: config.odrHz,
      });
      const samples = [];
      let startYaw = null;
      const turned = () => startYaw === null ? 0 : Math.abs(processor.attitude.yawDeg - startYaw);
      await record(imu, mag, 240000, {
        onImu: (batch, now) => processor.addImuSamples(batch, now),
        onMag: raw => {
          if (!processor.attitude.initialized) return;
          startYaw ??= processor.attitude.yawDeg;
          samples.push({ field: processor.vehicleField(raw), up: [...processor.attitude.up], yawDeg: processor.attitude.yawDeg });
        },
        shouldStop: () => turned() >= 760,
        progress: seconds => process.stdout.write(`\r  ${seconds} s, turned ${turned().toFixed(0)}° of 720°   `),
      });
      process.stdout.write("\n");
      const result = magCalibrationFromCircles(samples);
      magCalibration = result.mag;
      const { report } = result;
      console.log(`Magnetometer: ${report.samples} samples, fit error ${report.residualPercent.toFixed(1)}%, soft-iron ratio ${report.axisRatio.toFixed(2)}, ` +
        `field ${report.fieldUt.toFixed(1)} µT, dip ${report.dipDeg.toFixed(1)}°, compass turned ${report.magTurnDeg.toFixed(0)}° vs gyro ${report.yawTurnDeg.toFixed(0)}°.`);
    } else if (magCalibration) {
      console.log("Keeping the existing magnetometer calibration.");
    }

    const answer = (await rl.question(`\nSave calibration to ${config.calibrationFile}? [Y/n] `)).trim().toLowerCase();
    if (answer && answer !== "y" && answer !== "yes") {
      console.log("Calibration discarded.");
      return;
    }
    await saveImuCalibration(config.calibrationFile, {
      createdAt: new Date().toISOString(),
      gyroBiasDps,
      mount,
      mag: magCalibration,
    });
    if (mag) {
      // The learned compass offset belongs to the previous magnetometer calibration.
      await rm(config.fusionStateFile, { force: true });
    }
    console.log("Saved. Start the IMU service again with 'sudo systemctl start agnerd-imu'.");
  } finally {
    rl.close();
    await bus.close().catch(() => {});
  }
}

main().catch(error => {
  console.error(`IMU calibration failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
