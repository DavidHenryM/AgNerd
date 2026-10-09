import assert from "node:assert/strict";
import { register } from "tsx/esm/api";
import test from "node:test";

register();
const { sendEmail } = await import("../app/lib/brevo.ts");

const options = {
  to: "recipient@example.test",
  subject: "Test verification",
  text: "Test code",
};

function configure(t, key = "xkeysib-test-only") {
  const names = ["BREVO_API_KEY", "EMAIL_FROM", "EMAIL_FROM_NAME"];
  const previous = new Map(names.map((name) => [name, process.env[name]]));
  t.after(() => {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });
  process.env.BREVO_API_KEY = key;
  process.env.EMAIL_FROM = "sender@example.test";
  process.env.EMAIL_FROM_NAME = "AgNerd";
}

test("rejects SMTP credentials without a network request or exposing the key", async (t) => {
  const key = "xsmtpsib-test-secret";
  configure(t, key);
  const fetch = t.mock.method(globalThis, "fetch", () => {
    throw new Error("Unexpected network request");
  });
  await assert.rejects(sendEmail(options), (error) => {
    assert.match(error.message, /SMTP key.*Brevo API key/);
    assert.ok(!error.message.includes(key));
    return true;
  });
  assert.equal(fetch.mock.callCount(), 0);
});

test("requires the API key and sender", async (t) => {
  configure(t);
  delete process.env.BREVO_API_KEY;
  await assert.rejects(sendEmail(options), /BREVO_API_KEY is not configured/);
  process.env.BREVO_API_KEY = "xkeysib-test-only";
  delete process.env.EMAIL_FROM;
  await assert.rejects(sendEmail(options), /EMAIL_FROM is not configured/);
});

test("sends the expected HTTP API payload", async (t) => {
  configure(t);
  const fetch = t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(String(url), "https://api.brevo.com/v3/smtp/email");
    assert.equal(new Headers(init.headers).get("api-key"), "xkeysib-test-only");
    assert.equal(init.method, "POST");
    assert.deepEqual(JSON.parse(init.body), {
      subject: options.subject,
      textContent: options.text,
      sender: { email: "sender@example.test", name: "AgNerd" },
      to: [{ email: options.to }],
    });
    return Response.json({ messageId: "test-message" }, { status: 201 });
  });
  await sendEmail(options);
  assert.equal(fetch.mock.callCount(), 1);
});

test("propagates provider authorization failures", async (t) => {
  configure(t);
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ message: "Key not found", code: "unauthorized" }, { status: 401 }),
  );
  await assert.rejects(sendEmail(options), (error) => {
    assert.equal(error.statusCode, 401);
    assert.equal(error.body.code, "unauthorized");
    return true;
  });
});
