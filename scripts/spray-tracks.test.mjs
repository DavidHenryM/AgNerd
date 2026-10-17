import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { register } from "tsx/esm/api";

register();
const { SprayTrackSession, SprayTrackHttpError } = await import("../app/lib/spray-track-session.ts");
const { isSpraySave, isSavedStrip, isSpraySettings, parseTrackPage, parseTrackDetail } = await import("../app/lib/spray-tracks.ts");

const settings = { widthMeters: 6, offsetMeters: 0, forwardOffsetMeters: -1.5 };
const coordinates = [148, -36, 148.0001, -36, 148.0001, -35.9999, 148, -35.9999];

function server() {
  const tracks = new Map();
  const calls = [];
  let fail = null;
  let loseSaveResponse = false;
  const request = async (url, init = {}) => {
    const parsed = new URL(url, "http://localhost");
    const body = init.body ? JSON.parse(init.body) : null;
    calls.push({ url, method: init.method ?? "GET", body });
    if (fail) throw fail;
    const id = parsed.pathname.split("/")[3];
    if (init.method === "POST") {
      if (!tracks.has(body.id)) tracks.set(body.id, {
        track: { ...body, startedAt: "2026-10-17T00:00:00.000Z", updatedAt: "2026-10-17T00:00:00.000Z", revision: 0, totalAreaSqMeters: 0 },
        strips: [], lastSaveId: null,
      });
      return structuredClone({ track: tracks.get(body.id).track });
    }
    const entry = tracks.get(id);
    if (!entry) throw new SprayTrackHttpError("Track not found", 404);
    if (init.method === "PATCH") {
      if (entry.lastSaveId !== body.saveId) {
        if (body.revision !== entry.track.revision) throw new SprayTrackHttpError("Track changed", 409);
        entry.strips.push(...body.strips);
        entry.track = { ...entry.track, widthMeters: body.widthMeters, offsetMeters: body.offsetMeters,
          forwardOffsetMeters: body.forwardOffsetMeters, revision: entry.track.revision + 1,
          totalAreaSqMeters: entry.track.totalAreaSqMeters + body.strips.reduce((area, strip) => area + strip.areaSqMeters, 0) };
        entry.lastSaveId = body.saveId;
      }
      if (loseSaveResponse) { loseSaveResponse = false; throw new Error("Lost response"); }
      return structuredClone({ track: entry.track });
    }
    if (init.method === "DELETE") {
      if (Number(parsed.searchParams.get("revision")) !== entry.track.revision) throw new SprayTrackHttpError("Track changed", 409);
      tracks.delete(id);
      return { deleted: true };
    }
    if (parsed.searchParams.has("revision") && Number(parsed.searchParams.get("revision")) !== entry.track.revision) {
      throw new SprayTrackHttpError("Track changed", 409);
    }
    const after = Number(parsed.searchParams.get("after") ?? -1);
    const strips = entry.strips.filter(strip => strip.sequence > after).slice(0, 64);
    return structuredClone({ track: entry.track, strips,
      nextSequence: entry.strips.length > after + 65 ? strips.at(-1).sequence : null });
  };
  return { request, tracks, calls, setFail: value => { fail = value; }, loseResponse: () => { loseSaveResponse = true; } };
}

await test("settings, coordinate shape, sequence, batch size and pagination responses are validated", () => {
  const strip = { sequence: 0, coordinates, areaSqMeters: 6 };
  const save = { ...settings, revision: 0, saveId: randomUUID(), strips: [strip] };
  assert.ok(isSpraySave(save));
  for (const value of [null, [], { ...settings, widthMeters: 0 }, { ...settings, offsetMeters: 26 }, { ...settings, forwardOffsetMeters: Infinity }]) {
    assert.equal(isSpraySettings(value), false);
  }
  for (const value of [{ ...strip, coordinates: [1, 2] }, { ...strip, coordinates: [181, ...coordinates.slice(1)] },
    { ...strip, areaSqMeters: -1 }, { ...strip, sequence: -1 }]) assert.equal(isSavedStrip(value), false);
  assert.equal(isSpraySave({ ...save, strips: [strip, { ...strip, sequence: 2 }] }), false);
  assert.equal(isSpraySave({ ...save, strips: Array.from({ length: 65 }, (_, sequence) => ({ ...strip, sequence })) }), false);
  assert.equal(isSpraySave({ ...save, revision: -1 }), false);
  assert.throws(() => parseTrackPage({ tracks: [], nextCursor: "bad" }), /Invalid/);
  assert.throws(() => parseTrackDetail({ track: {}, strips: [], nextSequence: null }), /Invalid/);
});

await test("untouched tracks are not created; start creates once and batches exact geometry with area", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  assert.equal(api.calls.length, 0);
  assert.equal(await session.start(), true);
  assert.equal(await session.start(), true);
  for (let index = 0; index < 130; index++) session.append(coordinates, 6);
  assert.equal(session.getSnapshot().totalAreaSqMeters, 780);
  assert.equal(await session.flush(), true);
  const saves = api.calls.filter(call => call.method === "PATCH");
  assert.deepEqual(saves.map(call => call.body.strips.length), [64, 64, 2]);
  assert.equal(api.calls.filter(call => call.method === "POST").length, 1);
  assert.deepEqual(session.strips[0].coordinates, coordinates);
  assert.equal(session.getSnapshot().dirty, false);
  const resumed = new SprayTrackSession(api.request);
  assert.equal(await resumed.resume(session.getSnapshot().track.id), true);
  assert.deepEqual(resumed.strips, session.strips);
  assert.equal(resumed.getSnapshot().totalAreaSqMeters, 780);
  assert.equal(api.calls.filter(call => call.method === "PATCH").length, 3, "loading never re-saves old coverage");
});

await test("lost responses retry the identical save ID without duplicating coverage or area", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  await session.start();
  session.append(coordinates, 6);
  api.loseResponse();
  assert.equal(await session.flush(), false);
  assert.match(session.getSnapshot().error, /Lost response/);
  assert.equal(session.getSnapshot().dirty, true);
  assert.equal(await session.flush(), true);
  assert.equal(session.getSnapshot().track.totalAreaSqMeters, 6);
  assert.equal(api.tracks.get(session.getSnapshot().track.id).strips.length, 1);
  const saves = api.calls.filter(call => call.method === "PATCH");
  assert.deepEqual(saves[0].body, saves[1].body);
});

await test("failed save blocks new/resume and preserves all local work; retry unlocks transitions", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  await session.start();
  const id = session.getSnapshot().track.id;
  session.append(coordinates, 6);
  api.setFail(new Error("Offline"));
  assert.equal(await session.newTrack(), false);
  assert.equal(session.getSnapshot().track.id, id);
  assert.equal(session.strips.length, 1);
  assert.equal(await session.resume(randomUUID()), false);
  assert.equal(session.getSnapshot().track.id, id);
  api.setFail(null);
  assert.equal(await session.newTrack(), true);
  assert.equal(session.getSnapshot().track, null);
  assert.equal(session.strips.length, 0);
  assert.equal(api.tracks.get(id).track.totalAreaSqMeters, 6, "New does not delete the old track");
});

await test("cross-device conflicts cannot overwrite; explicit reload discards local work only after loading succeeds", async () => {
  const api = server();
  const first = new SprayTrackSession(api.request);
  await first.start();
  const id = first.getSnapshot().track.id;
  const second = new SprayTrackSession(api.request);
  await second.resume(id);
  first.append(coordinates, 6);
  await first.flush();
  second.append(coordinates, 12);
  assert.equal(await second.flush(), false);
  assert.equal(second.getSnapshot().conflict, true);
  assert.equal(await second.start(), false);
  assert.equal(await second.newTrack(), false);
  api.setFail(new Error("Offline"));
  assert.equal(await second.resume(id, true), false);
  assert.equal(second.getSnapshot().totalAreaSqMeters, 12);
  api.setFail(null);
  assert.equal(await second.resume(id, true), true);
  assert.equal(second.getSnapshot().totalAreaSqMeters, 6);
  assert.deepEqual(second.strips, first.strips);
});

await test("delete failure preserves track; successful delete clears only that track", async () => {
  const api = server();
  const first = new SprayTrackSession(api.request);
  const other = new SprayTrackSession(api.request);
  await first.start();
  await other.start();
  first.append(coordinates, 6);
  await first.flush();
  const id = first.getSnapshot().track.id;
  api.setFail(new Error("Database unavailable"));
  assert.equal(await first.deleteCurrent(), false);
  assert.equal(first.getSnapshot().track.id, id);
  assert.equal(first.strips.length, 1);
  api.setFail(null);
  assert.equal(await first.deleteCurrent(), true);
  assert.equal(first.getSnapshot().track, null);
  assert.equal(first.getSnapshot().totalAreaSqMeters, 0);
  assert.equal(first.strips.length, 0);
  assert.equal(api.tracks.has(id), false);
  assert.equal(api.tracks.has(other.getSnapshot().track.id), true);
});

await test("failed creation retries the same identity and does not start recording", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  api.setFail(new Error("Offline"));
  assert.equal(await session.start(), false);
  session.append(coordinates, 6);
  assert.equal(session.strips.length, 0);
  api.setFail(null);
  assert.equal(await session.flush(), true);
  assert.equal(api.calls[0].body.id, api.calls[1].body.id);
});

await test("resume restores latest boom settings without recalculating historical strips", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  await session.start();
  session.append(coordinates, 6);
  session.setSettings({ widthMeters: 12, offsetMeters: 4, forwardOffsetMeters: -3 });
  await session.flush();
  const resumed = new SprayTrackSession(api.request);
  assert.equal(await resumed.resume(session.getSnapshot().track.id), true);
  assert.equal(resumed.getSnapshot().track.widthMeters, 12);
  assert.equal(resumed.getSnapshot().track.offsetMeters, 4);
  assert.equal(resumed.getSnapshot().track.forwardOffsetMeters, -3);
  assert.equal(resumed.getSnapshot().totalAreaSqMeters, 6);
  assert.deepEqual(resumed.strips[0].coordinates, coordinates);
});

await test("invalid saved area or failed load never replaces the current track", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  await session.start();
  const currentId = session.getSnapshot().track.id;
  const other = new SprayTrackSession(api.request);
  await other.start();
  const otherId = other.getSnapshot().track.id;
  api.tracks.get(otherId).track.totalAreaSqMeters = 123;
  assert.equal(await session.resume(otherId), false);
  assert.equal(session.getSnapshot().track.id, currentId);
  assert.match(session.getSnapshot().error, /area does not match/);
});

await test("concurrent flush callers share a single in-flight write", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  await session.start();
  session.append(coordinates, 6);
  const first = session.flush();
  const second = session.flush();
  assert.equal(first, second);
  await first;
  assert.equal(api.calls.filter(call => call.method === "PATCH").length, 1);
});

await test("boom edits made during creation or a save remain dirty until persisted", async () => {
  const api = server();
  let release;
  let hold = true;
  const request = async (url, init) => {
    const result = await api.request(url, init);
    if (hold) await new Promise(resolve => { release = resolve; });
    return result;
  };
  const session = new SprayTrackSession(request);
  const creating = session.start();
  await new Promise(resolve => setImmediate(resolve));
  session.setSettings({ ...settings, widthMeters: 12 });
  hold = false;
  release();
  await creating;
  assert.equal(session.getSnapshot().dirty, true);
  await session.flush();
  assert.equal(session.getSnapshot().track.widthMeters, 12);
  session.append(coordinates, 12);
  hold = true;
  const saving = session.flush();
  await new Promise(resolve => setImmediate(resolve));
  session.setSettings({ ...settings, widthMeters: 18 });
  session.append(coordinates, 18);
  hold = false;
  release();
  await saving;
  assert.equal(session.getSnapshot().dirty, false);
  assert.equal(session.getSnapshot().track.widthMeters, 18);
  assert.equal(session.getSnapshot().totalAreaSqMeters, 30);
  assert.equal(api.tracks.get(session.getSnapshot().track.id).strips.length, 2);
});

await test("failed initial resume can be retried without requiring a nonexistent track reload", async () => {
  const api = server();
  const session = new SprayTrackSession(api.request);
  assert.equal(await session.resume(randomUUID()), false);
  assert.equal(session.getSnapshot().track, null);
  assert.equal(session.getSnapshot().conflict, false);
  assert.equal(await session.flush(), true);
  assert.equal(session.getSnapshot().error, null);
  assert.equal(await session.start(), true);
});
