import { readFile, writeFile, chmod } from "node:fs/promises";
import { parse } from "dotenv";

const filename = process.argv[2];
if (!filename) throw new Error("Specify the application environment file.");
let input = "";
for await (const chunk of process.stdin) input += chunk;
const database = parse(input);
if (database.AGNERD_DEPLOYMENT_MODE !== "embedded" || !database.LOCAL_DATABASE_URL) {
  throw new Error("Invalid embedded database environment.");
}
const url = new URL(database.LOCAL_DATABASE_URL);
if (!["postgres:", "postgresql:"].includes(url.protocol) ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
  throw new Error("Embedded database must use local PostgreSQL.");
}
let existing;
try {
  existing = await readFile(filename, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  existing = "";
}
const values = {
  AGNERD_DEPLOYMENT_MODE: "embedded",
  LOCAL_DATABASE_URL: database.LOCAL_DATABASE_URL,
};
const seen = new Set();
const lines = existing.split(/\r?\n/).filter(line => {
  const match = /^\s*(?:export\s+)?(AGNERD_DEPLOYMENT_MODE|LOCAL_DATABASE_URL)\s*=/.exec(line);
  if (!match) return true;
  if (seen.has(match[1])) return false;
  seen.add(match[1]);
  return true;
}).map(line => {
  const match = /^\s*(?:export\s+)?(AGNERD_DEPLOYMENT_MODE|LOCAL_DATABASE_URL)\s*=/.exec(line);
  return match ? `${match[1]}=${JSON.stringify(values[match[1]])}` : line;
});
while (lines.at(-1) === "") lines.pop();
for (const [key, value] of Object.entries(values)) {
  if (!seen.has(key)) lines.push(`${key}=${JSON.stringify(value)}`);
}
// The file now contains a database password; restrict access before writing it.
await writeFile(filename, "", { flag: "a", mode: 0o600 });
await chmod(filename, 0o600);
await writeFile(filename, `${lines.join("\n")}\n`);
