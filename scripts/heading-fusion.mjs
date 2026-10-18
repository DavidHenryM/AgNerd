// Heading fusion used by gnss-reader: gyro yaw propagation corrected by GNSS course and a
// low-weight magnetometer. State is [heading deg, residual gyro bias deg/s, magnetometer offset deg].
const wrap360 = degrees => ((degrees % 360) + 360) % 360;
const wrap180 = degrees => wrap360(degrees + 180) - 180;

const KNOTS_TO_MPS = 0.514444;
const MOVING_SPEED_MPS = 0.2;
const round = (value, digits) => Number.isFinite(value) ? Number(value.toFixed(digits)) : null;

export class HeadingFusion {
  constructor({
    minCourseSpeedMps = 0.8,
    imuStaleMs = 500,
    magEnabled = true,
    magSigmaDeg = 8,
    magMaxDisturbance = 2,
    initialMagOffsetDeg = 0,
    magOffsetSigmaDeg = 30,
    reverseFlipMs = 20000,
  } = {}) {
    Object.assign(this, { minCourseSpeedMps, imuStaleMs, magEnabled, magSigmaDeg, magMaxDisturbance, reverseFlipMs });
    this.x = [0, 0, wrap180(initialMagOffsetDeg)];
    this.P = [[1e4, 0, 0], [0, 0.01, 0], [0, 0, magOffsetSigmaDeg ** 2]];
    this.initialized = false;
    this.imu = null;
    this.direction = "forward";
    this.reverseSinceMs = null;
    this.speed = { mps: null, atMs: null };
    this.lastGnssUpdateMs = null;
    this.lastMagUpdateMs = null;
    this.lastMagAttemptMs = null;
    this.rejectedCourses = 0;
    this.lastMagDisturbance = null;
  }

  imuActive(nowMs) {
    return this.imu !== null && this.imu.healthy && nowMs - this.imu.updatedAtMs <= this.imuStaleMs;
  }

  exportState() {
    return {
      magOffsetDeg: round(this.x[2], 3),
      magOffsetSigmaDeg: round(Math.sqrt(this.P[2][2]), 3),
      gyroBiasDps: round(this.x[1], 5),
    };
  }

  importState(state) {
    if (!state || typeof state !== "object") return;
    if (Number.isFinite(state.magOffsetDeg) && Number.isFinite(state.magOffsetSigmaDeg)) {
      this.x[2] = wrap180(state.magOffsetDeg);
      this.P[2][2] = Math.max(4, state.magOffsetSigmaDeg ** 2);
    }
    if (Number.isFinite(state.gyroBiasDps) && Math.abs(state.gyroBiasDps) < 1) this.x[1] = state.gyroBiasDps;
  }

  initialize(headingDeg, variance, direction = "forward", offsetCorrelated = false) {
    this.x[0] = wrap360(headingDeg);
    this.P[0] = [variance, 0, offsetCorrelated ? this.P[2][2] : 0];
    this.P[1][0] = 0;
    this.P[2][0] = this.P[0][2];
    this.initialized = true;
    this.direction = direction;
    this.reverseSinceMs = null;
    this.rejectedCourses = 0;
  }

  predict(deltaYawDeg, dt) {
    const [h, b, o] = this.x;
    this.x = [wrap360(h + deltaYawDeg - b * dt), b, o];
    const F = [[1, -dt, 0], [0, 1, 0], [0, 0, 1]];
    const FP = F.map(row => [0, 1, 2].map(j => row[0] * this.P[0][j] + row[1] * this.P[1][j] + row[2] * this.P[2][j]));
    this.P = FP.map(row => [0, 1, 2].map(j => row[0] * F[j][0] + row[1] * F[j][1] + row[2] * F[j][2]));
    // Gyro noise plus a 1% scale-factor allowance on each turn.
    this.P[0][0] += 0.01 * dt + (0.01 * deltaYawDeg) ** 2;
    this.P[1][1] += 1e-6 * dt;
    this.P[2][2] += 0.02 * dt;
  }

  /** Scalar Kalman update with measurement row H. */
  correct(H, innovation, variance) {
    const PH = this.P.map(row => row[0] * H[0] + row[1] * H[1] + row[2] * H[2]);
    const S = H[0] * PH[0] + H[1] * PH[1] + H[2] * PH[2] + variance;
    const K = PH.map(value => value / S);
    this.x = this.x.map((value, i) => value + K[i] * innovation);
    this.x[0] = wrap360(this.x[0]);
    this.x[2] = wrap180(this.x[2]);
    const HP = [0, 1, 2].map(j => H[0] * this.P[0][j] + H[1] * this.P[1][j] + H[2] * this.P[2][j]);
    this.P = this.P.map((row, i) => row.map((value, j) => value - K[i] * HP[j]));
    // Keep the covariance symmetric despite rounding.
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
      const mean = (this.P[i][j] + this.P[j][i]) / 2;
      this.P[i][j] = mean;
      this.P[j][i] = mean;
    }
  }

  innovationTest(H, innovation, variance) {
    const PH = this.P.map(row => row[0] * H[0] + row[1] * H[1] + row[2] * H[2]);
    const S = H[0] * PH[0] + H[1] * PH[1] + H[2] * PH[2] + variance;
    return (innovation * innovation) / S;
  }

  /** Accepts the IMU service status payload. */
  updateImu(status, nowMs) {
    const yawDeg = status?.attitude?.yawDeg;
    if (!status || status.healthy !== true || !Number.isFinite(yawDeg) || !Number.isFinite(status.sampleAtMs) ||
      !Number.isFinite(status.updatedAtMs) || nowMs - status.updatedAtMs > this.imuStaleMs) {
      if (this.imu) this.imu.healthy = false;
      return;
    }
    const previous = this.imu;
    this.imu = {
      healthy: true,
      startedAt: status.startedAt,
      updatedAtMs: status.updatedAtMs,
      sampleAtMs: status.sampleAtMs,
      yawDeg,
      yawRateDps: Number.isFinite(status.attitude.yawRateDps) ? status.attitude.yawRateDps : 0,
      rollDeg: Number.isFinite(status.attitude.rollDeg) ? status.attitude.rollDeg : null,
      pitchDeg: Number.isFinite(status.attitude.pitchDeg) ? status.attitude.pitchDeg : null,
      stationary: status.stationary === true,
      mag: status.mag && Number.isFinite(status.mag.headingDeg) ? status.mag : null,
    };
    this.lastMagDisturbance = this.imu.mag && Number.isFinite(this.imu.mag.disturbance) ? this.imu.mag.disturbance : null;
    if (!previous || !previous.healthy || previous.startedAt !== status.startedAt) {
      // The yaw integral restarted or was unavailable; heading is less certain until corrected.
      if (this.initialized && previous) this.P[0][0] += 100;
    } else {
      const dt = (status.sampleAtMs - previous.sampleAtMs) / 1000;
      if (dt <= 0) return;
      if (this.initialized) {
        if (dt > 1) this.P[0][0] += 25 * dt;
        this.predict(yawDeg - previous.yawDeg, dt);
      }
    }
    this.updateMag(nowMs);
  }

  updateMag(nowMs) {
    const mag = this.imu?.mag;
    if (!this.magEnabled || !mag) return;
    if (this.lastMagAttemptMs !== null && nowMs - this.lastMagAttemptMs < 200) return;
    this.lastMagAttemptMs = nowMs;
    const disturbance = Number.isFinite(mag.disturbance) ? Math.max(0, mag.disturbance) : 0;
    if (disturbance > this.magMaxDisturbance) return;
    const variance = (this.magSigmaDeg * (1 + 2 * disturbance)) ** 2;
    if (!this.initialized) {
      this.initialize(mag.headingDeg + this.x[2], variance + this.P[2][2], "forward", true);
      this.lastMagUpdateMs = nowMs;
      return;
    }
    const H = [1, 0, -1];
    const innovation = wrap180(mag.headingDeg - (this.x[0] - this.x[2]));
    if (this.innovationTest(H, innovation, variance) > 9) return;
    this.correct(H, innovation, variance);
    this.lastMagUpdateMs = nowMs;
  }

  /** courseDeg is GNSS course over ground; courseAccDeg is the receiver's 1-sigma estimate. */
  updateGnss({ courseDeg, speedMps, courseAccDeg = null }, nowMs) {
    this.speed = { mps: Number.isFinite(speedMps) ? speedMps : null, atMs: nowMs };
    if (!Number.isFinite(courseDeg) || !Number.isFinite(speedMps) || speedMps < this.minCourseSpeedMps) {
      if (!(speedMps > 1.5)) this.reverseSinceMs = null;
      return;
    }
    const sigma = Math.max(0.5, Number.isFinite(courseAccDeg) && courseAccDeg > 0
      ? courseAccDeg
      : Math.atan2(0.1, speedMps) * 180 / Math.PI);
    // Add allowance for crabbing and side slip between body heading and track.
    const variance = sigma * sigma + 1;
    if (!this.imuActive(nowMs)) {
      this.initialize(courseDeg, variance);
      this.lastGnssUpdateMs = nowMs;
      return;
    }
    if (!this.initialized) {
      this.initialize(courseDeg, variance);
      this.lastGnssUpdateMs = nowMs;
      return;
    }
    const headingSigma = Math.sqrt(this.P[0][0]);
    const courseInnovation = wrap180(courseDeg - this.x[0]);
    if (Math.abs(courseInnovation) > 120 && headingSigma >= 30) {
      this.initialize(courseDeg, variance);
      this.lastGnssUpdateMs = nowMs;
      return;
    }
    const reversing = Math.abs(courseInnovation) > 120;
    const measured = reversing ? wrap360(courseDeg + 180) : courseDeg;
    const H = [1, 0, 0];
    const innovation = wrap180(measured - this.x[0]);
    if (this.innovationTest(H, innovation, variance) > 25) {
      this.rejectedCourses += 1;
      if (this.rejectedCourses >= 5) this.initialize(measured, variance, reversing ? "reverse" : "forward");
      return;
    }
    this.rejectedCourses = 0;
    this.direction = reversing ? "reverse" : "forward";
    this.correct(H, innovation, variance);
    this.lastGnssUpdateMs = nowMs;
    if (reversing && speedMps > 1.5) {
      this.reverseSinceMs ??= nowMs;
      // Sustained fast reversing almost always means heading was initialised backwards.
      if (nowMs - this.reverseSinceMs > this.reverseFlipMs) {
        this.x[0] = wrap360(this.x[0] + 180);
        this.direction = "forward";
        this.reverseSinceMs = null;
      }
    } else {
      this.reverseSinceMs = null;
    }
  }

  snapshot(nowMs) {
    const imuActive = this.imuActive(nowMs);
    const imu = imuActive ? this.imu : null;
    const recent = (atMs, windowMs) => atMs !== null && nowMs - atMs <= windowMs;
    const source = !this.initialized ? "none"
      : !imuActive ? "gnss"
        : recent(this.lastGnssUpdateMs, 3000) ? "gnss+imu"
          : recent(this.lastMagUpdateMs, 2000) ? "imu+mag" : "imu";
    const speedFresh = this.speed.mps !== null && nowMs - this.speed.atMs <= 2000;
    const moving = speedFresh && this.speed.mps >= MOVING_SPEED_MPS;
    return {
      headingDeg: this.initialized ? round(wrap360(this.x[0]), 2) : null,
      headingStdDeg: this.initialized ? round(Math.sqrt(Math.max(0, this.P[0][0])), 2) : null,
      headingSource: source,
      yawRateDps: imu && !imu.stationary ? round(imu.yawRateDps - this.x[1], 3) : 0,
      direction: moving ? this.direction : "stationary",
      rollDeg: imu ? round(imu.rollDeg, 2) : null,
      pitchDeg: imu ? round(imu.pitchDeg, 2) : null,
      imu: {
        state: imuActive ? "ok" : this.imu ? "stale" : "missing",
        gyroBiasDps: round(this.x[1], 5),
      },
      mag: {
        used: recent(this.lastMagUpdateMs, 2000),
        disturbance: imu ? round(this.lastMagDisturbance, 3) : null,
        offsetDeg: round(this.x[2], 2),
        offsetStdDeg: round(Math.sqrt(Math.max(0, this.P[2][2])), 2),
      },
    };
  }
}

/** Compact 20 Hz display payload; raw fix values stay unchanged for coverage and history. */
export function buildGnssDisplay({ seq, nowMs, latest, latestReceivedAtMs, fixType, fusion }) {
  const fused = fusion.snapshot(nowMs);
  const speed = latest && Number.isFinite(latest.speedKnots) ? latest.speedKnots * KNOTS_TO_MPS : null;
  return {
    version: 1,
    seq,
    publishedAtMs: nowMs,
    fix: latest && Number.isFinite(latest.latitude) && Number.isFinite(latest.longitude) ? {
      timestamp: latest.timestamp,
      latitude: latest.latitude,
      longitude: latest.longitude,
      ageMs: Number.isFinite(latestReceivedAtMs) ? Math.max(0, nowMs - latestReceivedAtMs) : null,
      fixType: fixType ?? null,
    } : null,
    ...fused,
    speedMps: speed === null ? null : round(fused.direction === "reverse" ? -speed : speed, 3),
  };
}
