BEGIN;

SET LOCAL lock_timeout = '5s';

ALTER TABLE public."GeoPoint"
    ADD COLUMN IF NOT EXISTS "sortOrder" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "farmBoundaryId" TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public."GeoPoint"'::regclass
          AND conname = 'GeoPoint_farmBoundaryId_fkey'
    ) THEN
        ALTER TABLE public."GeoPoint"
            ADD CONSTRAINT "GeoPoint_farmBoundaryId_fkey"
            FOREIGN KEY ("farmBoundaryId") REFERENCES public."Farm"("id")
            ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END
$$;

COMMIT;
