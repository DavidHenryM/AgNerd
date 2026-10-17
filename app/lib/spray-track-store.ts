import { prisma } from "@lib/prisma";
import { createHash } from "node:crypto";
import { Prisma } from "@app/generated/prisma/client";
import { SPRAY_BATCH_SIZE, SPRAY_PAGE_SIZE, type SpraySave, type SpraySettings } from "./spray-tracks";

export class TrackRequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export const trackSelect = {
  id: true, startedAt: true, updatedAt: true, totalAreaSqMeters: true,
  widthMeters: true, offsetMeters: true, forwardOffsetMeters: true, revision: true,
} satisfies Prisma.SprayTrackSelect;

export async function listTracks(userId: string, cursor: string | null) {
  const before = cursor ? await prisma.sprayTrack.findFirst({ where: { id: cursor, userId } }) : null;
  if (cursor && !before) throw new TrackRequestError("Track list changed. Refresh the list.", 409);
  const tracks = await prisma.sprayTrack.findMany({
    where: { userId, ...(before ? { OR: [
      { startedAt: { lt: before.startedAt } },
      { startedAt: before.startedAt, id: { lt: before.id } },
    ] } : {}) },
    orderBy: [{ startedAt: "desc" }, { id: "desc" }], take: SPRAY_PAGE_SIZE + 1, select: trackSelect,
  });
  return { tracks: tracks.slice(0, SPRAY_PAGE_SIZE),
    nextCursor: tracks.length > SPRAY_PAGE_SIZE ? tracks[SPRAY_PAGE_SIZE - 1].id : null };
}

export async function createTrack(userId: string, id: string, settings: SpraySettings) {
  const track = await prisma.sprayTrack.upsert({
    where: { id }, update: {},
    create: { id, userId, ...settings }, select: { ...trackSelect, userId: true },
  });
  if (track.userId !== userId) throw new TrackRequestError("Track not found.", 404);
  const { userId: _owner, ...result } = track;
  return result;
}

export async function loadTrack(userId: string, id: string, after: number, revision: number | null) {
  return prisma.$transaction(async tx => {
    const track = await tx.sprayTrack.findFirst({ where: { id, userId }, select: trackSelect });
    if (!track) throw new TrackRequestError("Track not found.", 404);
    if (revision !== null && revision !== track.revision) throw new TrackRequestError("Track changed on another device. Reload it.", 409);
    const strips = await tx.sprayTrackStrip.findMany({
      where: { trackId: id, sequence: { gt: after } }, orderBy: { sequence: "asc" },
      take: SPRAY_BATCH_SIZE + 1, select: { sequence: true, coordinates: true, areaSqMeters: true },
    });
    return { track, strips: strips.slice(0, SPRAY_BATCH_SIZE),
      nextSequence: strips.length > SPRAY_BATCH_SIZE ? strips[SPRAY_BATCH_SIZE - 1].sequence : null };
  }, { isolationLevel: "RepeatableRead" });
}

export async function saveTrack(userId: string, id: string, save: SpraySave) {
  const strips = save.strips.map(strip => ({
    sequence: strip.sequence, coordinates: strip.coordinates, areaSqMeters: strip.areaSqMeters,
  }));
  const settings = {
    widthMeters: save.widthMeters, offsetMeters: save.offsetMeters, forwardOffsetMeters: save.forwardOffsetMeters,
  };
  const hash = createHash("sha256").update(JSON.stringify({ revision: save.revision, ...settings, strips })).digest("hex");
  return prisma.$transaction(async tx => {
    // Serialize saves and deletion for this track, including retries after a lost response.
    await tx.$queryRaw`SELECT "id" FROM "SprayTrack" WHERE "id" = ${id} AND "userId" = ${userId} FOR UPDATE`;
    const track = await tx.sprayTrack.findFirst({ where: { id, userId } });
    if (!track) throw new TrackRequestError("Track not found.", 404);
    if (track.lastSaveId === save.saveId) {
      if (track.lastSaveHash !== hash) throw new TrackRequestError("Save identity already belongs to a different coverage batch.", 409);
      return tx.sprayTrack.findUniqueOrThrow({ where: { id }, select: trackSelect });
    }
    if (track.revision !== save.revision) throw new TrackRequestError("Track changed on another device. Reload before continuing.", 409);
    const last = await tx.sprayTrackStrip.findFirst({ where: { trackId: id }, orderBy: { sequence: "desc" } });
    if (save.strips.length && save.strips[0].sequence !== (last?.sequence ?? -1) + 1) {
      throw new TrackRequestError("Coverage sequence changed. Reload before continuing.", 409);
    }
    if (save.strips.length) await tx.sprayTrackStrip.createMany({
      data: strips.map(strip => ({ ...strip, trackId: id })),
    });
    return tx.sprayTrack.update({
      where: { id },
      data: {
        ...settings,
        totalAreaSqMeters: { increment: save.strips.reduce((area, strip) => area + strip.areaSqMeters, 0) },
        revision: { increment: 1 }, lastSaveId: save.saveId, lastSaveHash: hash,
      }, select: trackSelect,
    });
  });
}

export async function deleteTrack(userId: string, id: string, revision: number) {
  const result = await prisma.sprayTrack.deleteMany({ where: { id, userId, revision } });
  if (!result.count) {
    const exists = await prisma.sprayTrack.count({ where: { id, userId } });
    if (exists) throw new TrackRequestError("Track changed on another device. Reload before deleting.", 409);
    // Deletion is idempotent, including when its response was lost.
  }
}
