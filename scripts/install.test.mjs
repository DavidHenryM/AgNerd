import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const installer = readFileSync(new URL("../install.sh", import.meta.url), "utf8");
const setup = installer.match(/<<'NVM_SETUP'\r?\n([\s\S]*?)\r?\nNVM_SETUP/)[1];
const bash = process.platform === "win32"
  ? path.join(process.env.ProgramFiles, "Git", "bin", "bash.exe")
  : "bash";
const mockNvm = `
if [ "\${1:-}" != "--no-use" ]; then
    return 3
fi
nvm() {
    echo "nvm $*" >&2
    case "$1" in
        install) return "\${INSTALL_STATUS:-0}" ;;
        use)
            [ "\${USE_STATUS:-0}" -eq 0 ] || return "$USE_STATUS"
            export PATH="$NVM_DIR/bin:$PATH"
            ;;
    esac
}
`;

function runSetup({ fresh = false, source = mockNvm, env = {} } = {}) {
  const home = mkdtempSync(path.join(tmpdir(), "agnerd-nvm-"));
  try {
    const nvmDir = path.join(home, ".nvm");
    mkdirSync(path.join(nvmDir, "bin"), { recursive: true });
    writeFileSync(path.join(nvmDir, "bin", "node"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    if (!fresh) writeFileSync(path.join(nvmDir, "nvm.sh"), source);
    const shellHome = process.platform === "win32"
      ? home.replaceAll("\\", "/").replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`)
      : home;
    const bootstrap = fresh ? `
curl() {
    printf '%s\\n' 'cat > "$NVM_DIR/nvm.sh" <<"MOCK_NVM"'
    cat <<'MOCK_SOURCE'
${source}
MOCK_SOURCE
    echo MOCK_NVM
}
` : "";
    const result = spawnSync(bash, ["--noprofile", "--norc", "-s"], {
      input: `export HOME='${shellHome.replaceAll("'", "'\\''")}'\n${bootstrap}\n${setup}`,
      encoding: "utf8",
      env: { ...process.env, ...env },
    });
    assert.ifError(result.error);
    return { ...result, shellHome };
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
}

for (const fresh of [false, true]) {
  test(`NVM setup installs and activates Node with ${fresh ? "fresh" : "existing"} NVM and no default version`, () => {
    const result = runSetup({ fresh });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), `${result.shellHome}/.nvm/bin/node`);
    assert.match(result.stderr, /nvm install node[\s\S]*nvm use node/);
  });
}

test("NVM loading failure stops before installation and reports the step", () => {
  const result = runSetup({ source: "return 7\n" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Failed to load NVM/);
  assert.doesNotMatch(result.stderr, /nvm install/);
  assert.equal(result.stdout, "");
});

test("Node installation failure stops before activation and reports the step", () => {
  const result = runSetup({ env: { INSTALL_STATUS: "8" } });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /could not install the latest stable Node.js/);
  assert.doesNotMatch(result.stderr, /nvm use/);
  assert.equal(result.stdout, "");
});

test("Node activation failure reports the step without returning a Node path", () => {
  const result = runSetup({ env: { USE_STATUS: "9" } });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /could not activate the installed Node.js version/);
  assert.equal(result.stdout, "");
});
