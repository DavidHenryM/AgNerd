import assert from "node:assert/strict";
import { register } from "tsx/esm/api";
import { register as registerCjs } from "tsx/cjs/api";
import test from "node:test";
import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

register();
registerCjs();
const { auth } = await import("../app/lib/auth.ts");
const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = await import("../app/lib/password-policy.ts");

const baseURL = "http://localhost:3199";
const email = "existing@example.test";
const password = "test-only-password";

function fixture(t) {
  const now = new Date();
  const database = {
    user: [{ id: "existing-user", email, name: "Existing user", emailVerified: true, createdAt: now, updatedAt: now }],
    account: [],
    session: [],
    verification: [],
  };
  const emails = [];
  const configKeys = ["BREVO_API_KEY", "EMAIL_FROM"];
  const previous = new Map(configKeys.map((key) => [key, process.env[key]]));
  process.env.BREVO_API_KEY = "xkeysib-test-only";
  process.env.EMAIL_FROM = "sender@example.test";
  t.after(() => {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(String(url), "https://api.brevo.com/v3/smtp/email");
    emails.push(JSON.parse(init.body));
    return Response.json({ messageId: "test-message" }, { status: 201 });
  });
  const instance = betterAuth({
    ...auth.options,
    baseURL,
    secret: "test-only-secret-with-at-least-32-characters",
    trustedOrigins: [baseURL],
    database: memoryAdapter(database),
    rateLimit: { enabled: false },
    logger: { disabled: true },
  });
  function post(endpoint, body) {
    return instance.handler(new Request(`${baseURL}/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: baseURL },
      body: JSON.stringify(body),
    }));
  }
  async function requestToken() {
    const previousEmailCount = emails.length;
    const response = await post("request-password-reset", {
      email,
      redirectTo: "/reset-password?callbackUrl=%2Ffarm",
    });
    assert.equal(response.status, 200);
    assert.equal(emails.length, previousEmailCount + 1);
    const sentEmail = emails.at(-1);
    assert.deepEqual(sentEmail.to, [{ email }]);
    assert.match(sentEmail.subject, /Set or reset/);
    const url = sentEmail.textContent.match(/http:\/\/\S+/)[0];
    const callback = await instance.handler(new Request(url));
    assert.equal(callback.status, 302);
    const redirect = new URL(callback.headers.get("location"));
    assert.equal(redirect.pathname, "/reset-password");
    assert.equal(redirect.searchParams.get("callbackUrl"), "/farm");
    return redirect.searchParams.get("token");
  }
  return { database, emails, post, requestToken };
}

await test("existing link-only accounts can set a hashed password and sign in", async (t) => {
  const { database, post, requestToken } = fixture(t);
  const before = await post("sign-in/email", { email, password });
  assert.equal(before.status, 401);

  const token = await requestToken();
  const reset = await post("reset-password", { token, newPassword: password });
  assert.equal(reset.status, 200);
  assert.equal(database.user.length, 1);
  assert.equal(database.account.length, 1);
  assert.equal(database.account[0].providerId, "credential");
  assert.notEqual(database.account[0].password, password);
  const signIn = await post("sign-in/email", { email, password });
  assert.equal(signIn.status, 200);
  assert.equal((await signIn.json()).user.id, "existing-user");
  assert.match(signIn.headers.get("set-cookie"), /better-auth.session_token/);
  assert.equal((await post("sign-in/email", { email, password: "wrong-password" })).status, 401);
  assert.equal((await post("reset-password", { token, newPassword: password })).status, 400);
});

await test("password resets enforce length limits and revoke previous sessions", async (t) => {
  const { database, post, requestToken } = fixture(t);
  const token = await requestToken();
  for (const newPassword of ["a".repeat(MIN_PASSWORD_LENGTH - 1), "a".repeat(MAX_PASSWORD_LENGTH + 1)]) {
    assert.equal((await post("reset-password", { token, newPassword })).status, 400);
    assert.equal(database.account.length, 0);
  }
  assert.equal((await post("reset-password", { token, newPassword: password })).status, 200);
  assert.equal((await post("sign-in/email", { email, password })).status, 200);
  assert.equal(database.session.length, 1);
  const secondToken = await requestToken();
  assert.equal((await post("reset-password", { token: secondToken, newPassword: "replacement-password" })).status, 200);
  assert.equal(database.session.length, 0);
  assert.equal(database.account.length, 1);
  assert.equal((await post("sign-in/email", { email, password })).status, 401);
  assert.equal((await post("sign-in/email", { email, password: "replacement-password" })).status, 200);
});

await test("unknown reset emails stay generic and password registration remains disabled", async (t) => {
  const { database, emails, post } = fixture(t);
  const response = await post("request-password-reset", { email: "unknown@example.test", redirectTo: "/reset-password" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, true);
  assert.equal(emails.length, 0);
  assert.equal((await post("reset-password", { token: "invalid-token", newPassword: password })).status, 400);
  assert.equal((await post("sign-up/email", { email: "new@example.test", name: "New user", password })).status, 400);
  assert.equal(database.user.length, 1);
});

await test("accepts passwords at both configured length boundaries", async (t) => {
  const { post, requestToken } = fixture(t);
  for (const length of [MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH]) {
    const token = await requestToken();
    const boundaryPassword = "a".repeat(length);
    assert.equal((await post("reset-password", { token, newPassword: boundaryPassword })).status, 200);
    assert.equal((await post("sign-in/email", { email, password: boundaryPassword })).status, 200);
  }
});

await test("expired reset tokens cannot set a password", async (t) => {
  const { database, post, requestToken } = fixture(t);
  const token = await requestToken();
  const verification = database.verification.find((entry) => entry.identifier === `reset-password:${token}`);
  verification.expiresAt = new Date(Date.now() - 1000);
  assert.equal((await post("reset-password", { token, newPassword: password })).status, 400);
  assert.equal(database.account.length, 0);
});
