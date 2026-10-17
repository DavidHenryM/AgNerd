BEGIN;

SET LOCAL lock_timeout = '5s';

CREATE TABLE IF NOT EXISTS "SprayTrack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalAreaSqMeters" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "widthMeters" DOUBLE PRECISION NOT NULL,
    "offsetMeters" DOUBLE PRECISION NOT NULL,
    "forwardOffsetMeters" DOUBLE PRECISION NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "lastSaveId" TEXT,
    "lastSaveHash" TEXT,
    CONSTRAINT "SprayTrack_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "SprayTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "SprayTrack_userId_startedAt_id_idx" ON "SprayTrack"("userId", "startedAt", "id");

ALTER TABLE "SprayTrack" ADD COLUMN IF NOT EXISTS "lastSaveHash" TEXT;

CREATE TABLE IF NOT EXISTS "SprayTrackStrip" (
    "trackId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "areaSqMeters" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "SprayTrackStrip_pkey" PRIMARY KEY ("trackId", "sequence"),
    CONSTRAINT "SprayTrackStrip_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "SprayTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT;
