import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MovieCookieNames } from "./api/movieCookieNames";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLogin = req.cookies.has(MovieCookieNames.MOVIE_AUTH);

  if (!isLogin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLogin && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!logo|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
