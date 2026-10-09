import assert from "node:assert/strict";
import { register } from "tsx/esm/api";
import test from "node:test";
import { NextRequest } from "next/server.js";

register();
const { getAuthCallbackURL } = await import("../app/lib/auth-navigation.ts");
const { proxy } = await import("../proxy.ts");

const origin = "https://agnerd.example";

await test("preserves local callback paths, queries and fragments", () => {
  for (const callback of ["/home", "/farm/my-farm?tab=users#details"]) {
    assert.equal(getAuthCallbackURL(`callbackUrl=${encodeURIComponent(callback)}`, origin), callback);
  }
});

await test("defaults to home for missing or external callbacks", () => {
  assert.equal(getAuthCallbackURL("", origin), "/home");
  for (const callback of ["https://evil.example", "//evil.example", "/\\evil.example", "farm", ""]) {
    assert.equal(getAuthCallbackURL(`callbackUrl=${encodeURIComponent(callback)}`, origin), "/home");
  }
});

await test("retains a safe callback through the password reset redirect", () => {
  const callback = "/farm/my-farm?tab=users#details";
  const redirect = new URL(`/reset-password?callbackUrl=${encodeURIComponent(callback)}`, origin);
  redirect.searchParams.set("token", "test-token");
  assert.equal(getAuthCallbackURL(redirect.search, origin), callback);
});

await test("allows password reset links without a session cookie", () => {
  for (const suffix of ["", "?token=test-token&callbackUrl=%2Ffarm", "?error=INVALID_TOKEN"]) {
    const response = proxy(new NextRequest(`${origin}/reset-password${suffix}`));
    assert.equal(response.headers.get("x-middleware-next"), "1");
    assert.equal(response.headers.get("location"), null);
  }
});

await test("continues to require authentication for protected pages", () => {
  const response = proxy(new NextRequest(`${origin}/farm`));
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), `${origin}/signin?callbackUrl=%2Ffarm`);
});
