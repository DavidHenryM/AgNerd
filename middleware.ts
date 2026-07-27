import { NextRequest, NextResponse } from "next/server"

// Paths that do not require authentication
const PUBLIC_PATH_PREFIXES = ["/signin", "/signin-error", "/api/auth"]

// better-auth session cookie (see better-auth/dist/cookies/index.mjs)
const SESSION_COOKIE = "better-auth.session_token"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  const hasSession = request.cookies.has(SESSION_COOKIE)

  if (!hasSession) {
    const signInUrl = new URL("/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico / icon.ico (browser icons)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.ico).*)",
  ],
}
