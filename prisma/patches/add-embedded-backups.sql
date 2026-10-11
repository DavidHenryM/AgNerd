BEGIN;

CREATE TABLE IF NOT EXISTS "EmbeddedBackup" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "deviceId" TEXT NOT NULL,
  "capturedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "checksum" TEXT NOT NULL,
  "payload" BYTEA NOT NULL
);
CREATE INDEX IF NOT EXISTS "EmbeddedBackup_deviceId_createdAt_idx"
  ON "EmbeddedBackup"("deviceId", "createdAt");

CREATE TABLE IF NOT EXISTS "EmbeddedSyncState" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "deviceId" TEXT,
  "pendingId" TEXT,
  "pendingData" BYTEA,
  "checksum" TEXT,
  "capturedAt" TIMESTAMP(3),
  "leaseUntil" TIMESTAMP(3),
  "leaseId" TEXT,
  "lastSyncedAt" TIMESTAMP(3),
  "lastError" TEXT
);

COMMIT;
