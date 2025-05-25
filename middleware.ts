import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { pathname } = req.nextUrl

    console.log(`Middleware: ${pathname}, Session: ${!!session}`)

    // Define route types
    const isAuthPage = pathname === "/login" || pathname === "/signup"
    const isDashboardPage = pathname.startsWith("/dashboard")
    const isPublicPage = pathname === "/" || pathname === "/platform" || pathname === "/pricing"

    // Allow public pages without authentication
    if (isPublicPage) {
      return res
    }

    // Redirect unauthenticated users trying to access dashboard
    if (!session && isDashboardPage) {
      console.log("Middleware: Redirecting to login - no session")
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect authenticated users away from auth pages
    if (session && isAuthPage) {
      console.log("Middleware: Redirecting to dashboard - has session")
      const redirectUrl = new URL("/dashboard", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
