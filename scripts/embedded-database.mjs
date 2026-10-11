import "dotenv/config";
import { register } from "tsx/esm/api";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { Pool } from "pg";
import { hashPassword } from "better-auth/crypto";

register();
const { databaseURL, deploymentMode } = await import("../app/lib/deployment.ts");
const { captureSnapshot, restoreSnapshot } = await import("../app/lib/embedded-snapshot.ts");
const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = await import("../app/lib/password-policy.ts");
const [command, filename] = process.argv.slice(2);
if (!["export", "restore", "user"].includes(command)) {
  console.error("Usage: node scripts/embedded-database.mjs export <file.json.gz> | restore <file.json.gz> | user");
  process.exit(1);
}
if (command !== "export" && deploymentMode() !== "embedded") throw new Error("Restore and local credential setup require embedded mode.");
const pool = new Pool({ connectionString: databaseURL(), max: 1, connectionTimeoutMillis: 5000 });
try {
  if (command === "export") {
    if (!filename) throw new Error("Specify a snapshot output file.");
    await writeFile(filename, await captureSnapshot(pool), { flag: "wx", mode: 0o600 });
    console.log("Business snapshot exported; credentials and sessions excluded.");
  } else if (command === "restore") {
    if (!filename) throw new Error("Specify a snapshot file.");
    await restoreSnapshot(pool, await readFile(filename));
    console.log("Business snapshot restored. Provision local password credentials with the user command.");
  } else {
    const io = createInterface({ input: process.stdin, output: process.stdout });
    let email;
    let farmId;
    let firstName;
    let lastName;
    let newFarmName;
    try {
      email = (await io.question("Local operator email: ")).trim().toLowerCase();
      const existing = await pool.query('SELECT id FROM "user" WHERE email=$1', [email]);
      if (!existing.rowCount) {
        const farms = await pool.query('SELECT id, name FROM "Farm" ORDER BY name');
        console.log(farms.rows);
        farmId = (await io.question("Existing farm ID (blank to create a farm): ")).trim();
        if (!farmId) {
          newFarmName = (await io.question("New farm name: ")).trim();
          if (!newFarmName) throw new Error("Farm name is required.");
          farmId = randomUUID();
        }
        firstName = (await io.question("First name: ")).trim();
        lastName = (await io.question("Last name: ")).trim();
      }
    } finally { io.close(); }
    if (!email || !email.includes("@")) throw new Error("A valid operator email is required.");
    if (!process.stdin.isTTY) throw new Error("Password setup requires an interactive terminal.");
    let mute = false;
    const output = new Writable({ write(chunk, _encoding, callback) { if (!mute) process.stdout.write(chunk); callback(); } });
    const secret = createInterface({ input: process.stdin, output, terminal: true });
    let password;
    try {
      process.stdout.write("Local password (hidden): ");
      mute = true;
      password = await secret.question("");
      mute = false;
      process.stdout.write("\nConfirm password (hidden): ");
      mute = true;
      if (password !== await secret.question("")) throw new Error("Passwords do not match.");
    } finally { secret.close(); process.stdout.write("\n"); }
    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) throw new Error("Password must be 8-128 characters.");
    const hashed = await hashPassword(password);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      if (newFarmName) {
        await client.query('INSERT INTO "Farm" (id,name,"lotSectionPlan") VALUES ($1,$2,$3)', [farmId, newFarmName, []]);
      }
      let user = (await client.query('SELECT id FROM "user" WHERE email=$1', [email])).rows[0];
      if (!user) {
        if (!firstName || !lastName) throw new Error("First and last names are required.");
        user = { id: randomUUID() };
        await client.query(
          'INSERT INTO "user" (id,email,"firstName","lastName",name,"farmId","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)',
          [user.id, email, firstName, lastName, `${firstName} ${lastName}`, farmId],
        );
      }
      await client.query('DELETE FROM account WHERE "userId"=$1 AND "providerId"=$2', [user.id, "credential"]);
      await client.query('INSERT INTO account (id,"accountId","providerId","userId",password,"updatedAt") VALUES ($1,$2,$3,$2,$4,CURRENT_TIMESTAMP)',
        [randomUUID(), user.id, "credential", hashed]);
      await client.query('DELETE FROM session WHERE "userId"=$1', [user.id]);
      await client.query("COMMIT");
      console.log("Local password configured. Existing local sessions revoked; cloud credentials were not changed.");
    } catch (error) { await client.query("ROLLBACK"); throw error; }
    finally { client.release(); }
  }
} finally {
  await pool.end();
}
