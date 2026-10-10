import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { checkBrowserChunks } from "./check-browser-chunks.mjs";

await test("validates browser scripts recursively and ignores non-JavaScript assets", async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "agnerd-chunks-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, "nested"));
  await writeFile(path.join(directory, "valid.js"), 'globalThis.example = "\\x000";');
  await writeFile(path.join(directory, "nested", "valid.js"), "globalThis.other = 1;");
  await writeFile(path.join(directory, "asset.map"), "not JavaScript");
  assert.equal(await checkBrowserChunks(directory), 2);
});

await test("fails on the production octal escape regression and identifies the chunk", async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "agnerd-chunks-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeFile(path.join(directory, "invalid.js"), 'globalThis.wasm = `\\00`;');
  await assert.rejects(checkBrowserChunks(directory), /Invalid browser chunk .*invalid\.js: Octal escape/);
});
