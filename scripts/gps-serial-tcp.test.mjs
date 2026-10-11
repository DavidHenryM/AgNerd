import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const script = readFileSync(new URL("gps-serial-tcp.sh", import.meta.url), "utf8").replaceAll("\r\n", "\n");
const bash = process.platform === "win32" ? path.join(process.env.ProgramFiles, "Git", "bin", "bash.exe") : "bash";

function run(args = "", occupied = 1) {
  const result = spawnSync(bash, ["--noprofile", "--norc", "-s"], {
    input: `
uname() { echo Linux; }
fuser() { return ${occupied}; }
socat() { printf 'SOCAT <%s>\\n' "$@"; }
exec() { "$@"; }
set -- ${args}
${script}
`,
    encoding: "utf8",
    env: {
      ...process.env,
      GNSS_READ_DEVICE: "/dev/null",
      GNSS_READ_BAUDRATE: "38400",
      GPS_TCP_HOST: "127.0.0.1",
      GPS_TCP_PORT: "5000",
    },
  });
  assert.ifError(result.error);
  return result;
}

await test("bridges raw binary serial bidirectionally with one client and safe loopback default", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /TCP4-LISTEN:5000,bind=127.0.0.1,reuseaddr/);
  assert.match(result.stdout, /FILE:\/dev\/null,raw,echo=0,b38400,cs8,parenb=0,cstopb=0,crtscts=0,ixon=0,ixoff=0/);
  assert.doesNotMatch(result.stdout, /fork|SOCAT <-u>|SOCAT <-U>/);
});

await test("supports configured LAN binding and baud rate and warns about receiver access", () => {
  const result = run("/dev/null 115200 192.168.1.50 05000");
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /TCP4-LISTEN:5000,bind=192.168.1.50/);
  assert.match(result.stdout, /b115200/);
  assert.match(result.stderr, /unauthenticated receiver configuration/);
});

await test("refuses occupied ports and ownership check errors without launching socat", () => {
  for (const status of [0, 2]) {
    const result = run("", status);
    assert.equal(result.status, 1);
    assert.doesNotMatch(result.stdout, /SOCAT/);
    assert.match(result.stderr, /already open|Could not check/);
  }
});

await test("rejects invalid device, baud, host and port inputs before launching socat", () => {
  for (const args of [
    "'/dev/null,echo=1'", "/dev/null 12345", "/dev/null 38400 256.1.1.1",
    "/dev/null 38400 localhost", "/dev/null 38400 127.0.0.1 0",
    "/dev/null 38400 127.0.0.1 65536", "/dev/null 38400 127.0.0.1 nope",
  ]) {
    const result = run(args);
    assert.equal(result.status, 1, args);
    assert.doesNotMatch(result.stdout, /SOCAT/);
  }
  const help = run("--help");
  assert.equal(help.status, 0);
  assert.match(help.stdout, /u-center 2/);
});
