import assert from "node:assert/strict";
import { register } from "tsx/esm/api";
import test from "node:test";
import { NextRequest } from "next/server.js";

register();
const { getAuthCallbackURL } = await import("../app/lib/auth-navigation.ts");
const { proxy } = await import("../proxy.ts");
const { navigationSignInURL, fetchNavigationApi } = await import("../app/lib/navigation-auth.ts");

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

await test("unauthenticated API requests return JSON 401 without a sign-in redirect", async () => {
  for (const endpoint of ["/api/maps/manifest", "/api/gnss/status", "/api/internet-status"]) {
    const response = proxy(new NextRequest(`${origin}${endpoint}`));
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("location"), null);
    assert.deepEqual(await response.json(), { error: "Unauthorized" });
  }
});

await test("recognizes both HTTP and HTTPS session cookies but leaves validation to the API", () => {
  for (const name of ["better-auth.session_token", "__Secure-better-auth.session_token"]) {
    const response = proxy(new NextRequest(`${origin}/api/maps/manifest`, { headers: { cookie: `${name}=test-only` } }));
    assert.equal(response.headers.get("x-middleware-next"), "1");
  }
  assert.equal(proxy(new NextRequest(`${origin}/api/maps/manifest`, {
    headers: { cookie: "better-auth.session_token=" },
  })).status, 401);
});

await test("navigation sign-in returns to the page, retaining query parameters rather than an API URL", () => {
  assert.equal(navigationSignInURL("/navigation", "?test=1"), "/signin?callbackUrl=%2Fnavigation%3Ftest%3D1");
  assert.equal(proxy(new NextRequest(`${origin}/navigation?test=1`)).headers.get("location"),
    `${origin}/signin?callbackUrl=%2Fnavigation%3Ftest%3D1`);
  assert.equal(proxy(new NextRequest(`${origin}/api/gnss/position`, { method: "POST" })).headers.get("x-middleware-next"), "1");
});

await test("navigation fetch redirects once on expired sessions, preserving other responses", async (t) => {
  const previousWindow = globalThis.window;
  const redirects = [];
  globalThis.window = {
    location: {
      pathname: "/navigation", search: "?test=1",
      replace: url => redirects.push(url),
    },
  };
  try {
    for (const status of [200, 500]) {
      t.mock.method(globalThis, "fetch", async () => new Response(null, { status }));
      assert.equal((await fetchNavigationApi("/api/maps/manifest")).status, status);
      assert.equal(redirects.length, 0);
    }
    t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 401 }));
    await assert.rejects(fetchNavigationApi("/api/maps/manifest"), /session has expired/);
    await assert.rejects(fetchNavigationApi("/api/gnss/status"), /session has expired/);
    assert.deepEqual(redirects, ["/signin?callbackUrl=%2Fnavigation%3Ftest%3D1"]);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
