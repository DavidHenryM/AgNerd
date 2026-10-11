import { NextRequest, NextResponse } from "next/server"

// Paths that do not require authentication
const PUBLIC_PATH_PREFIXES = ["/signin", "/signin-error", "/reset-password", "/api/auth"]

// better-auth session cookie (see better-auth/dist/cookies/index.mjs)
const SESSION_COOKIE = "better-auth.session_token"

function isPublicGnssRequest(request: NextRequest) {
  return request.nextUrl.pathname === "/api/gnss/position" && request.method === "POST";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/cesium/") ||
    PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    isPublicGnssRequest(request)
  ) {
    return NextResponse.next()
  }

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value ||
    request.cookies.get(`__Secure-${SESSION_COOKIE}`)?.value)

  if (!hasSession) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      })
    }
    const signInUrl = new URL("/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico / icon.ico (browser icons)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.ico).*)",
  ],
}
