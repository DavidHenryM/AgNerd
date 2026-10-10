import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const installer = readFileSync(new URL("../install.sh", import.meta.url), "utf8");
const bash = process.platform === "win32"
  ? path.join(process.env.ProgramFiles, "Git", "bin", "bash.exe")
  : "bash";
const build = installer.slice(installer.indexOf("(\nset -e"), installer.indexOf("has_env_files()"));
const deployment = installer.slice(installer.lastIndexOf("(\nset -e"), installer.indexOf('echo -e "\\033[35mReloading systemd'));

function run(failure = "") {
  const result = spawnSync(bash, ["--noprofile", "--norc", "-s"], {
    input: `
npm() {
    echo "NPM $*"
    [ "$*" != "${failure}" ]
}
sudo() {
    echo "SUDO $*"
    [ "$*" != "${failure}" ]
}
${build}
${deployment}
echo COMPLETED
`,
    encoding: "utf8",
  });
  assert.ifError(result.error);
  return result;
}

await test("dependency, asset and build failures never modify the deployment", () => {
  for (const failure of ["ci", "run copy-cesium", "run build"]) {
    const result = run(failure);
    assert.equal(result.status, 1);
    assert.doesNotMatch(result.stdout, /SUDO|COMPLETED/);
    assert.match(result.stderr, /existing deployment has not been changed/);
  }
});

await test("stages new directories before stopping services and replaces only managed directories", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /NPM run build[\s\S]*cp -R .next\/. \/opt\/agnerd\/.next.incoming\/[\s\S]*systemctl stop[\s\S]*rm -rf -- \/opt\/agnerd\/.next \/opt\/agnerd\/node_modules[\s\S]*mv \/opt\/agnerd\/.next.incoming \/opt\/agnerd\/.next/);
  assert.doesNotMatch(result.stdout, /rm .*\/etc\/|rm .*\/public|rm .*\/maps/);
});

await test("staging failures leave running services and existing build alone", () => {
  const result = run("cp -R .next/. /opt/agnerd/.next.incoming/");
  assert.equal(result.status, 1);
  assert.doesNotMatch(result.stdout, /systemctl stop|rm -rf -- \/opt\/agnerd\/.next \/opt\/agnerd\/node_modules|COMPLETED/);
  assert.match(result.stderr, /deployment failed/);
});

await test("replacement failures stop installation without reporting completion", () => {
  const result = run("mv /opt/agnerd/.next.incoming /opt/agnerd/.next");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /systemctl stop/);
  assert.doesNotMatch(result.stdout, /COMPLETED|mv \/opt\/agnerd\/node_modules.incoming/);
  assert.match(result.stderr, /deployment failed/);
});
