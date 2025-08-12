import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";
import type { Session } from "~/server/auth";

const ADMIN_ROUTES = ["/admin"];
const PUBLIC_ROUTES = ["/", "/auth/signin", "/auth/signup"];
const SIGN_OUT_ROUTE = "/auth/sign-out";

async function getSession(request: NextRequest): Promise<Session | null> {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );
  return session;
}

function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith("/auth/");
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname) || isAuthRoute(pathname);
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.includes(pathname);
}

function isDashboardRoute(pathname: string): boolean {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/o/");
}

function redirectTo(url: string, request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, request.url));
}

function handleUnauthenticatedUser(pathname: string, request: NextRequest): NextResponse {
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  // Redirect unauthenticated users trying to access protected routes to signin
  return redirectTo("/auth/signin", request);
}

function handleAuthenticatedUser(pathname: string, session: Session, request: NextRequest): NextResponse {
  // Redirect authenticated users away from auth routes (except sign-out)
  if (isAuthRoute(pathname) && pathname !== SIGN_OUT_ROUTE) {
    return redirectTo("/dashboard", request);
  }

  // Admin route protection
  if (isAdminRoute(pathname) && session.user.role !== "admin") {
    console.log("User is not an admin");
    return redirectTo("/", request);
  }

  return NextResponse.next();
}

export default async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession(request);

  if (!session) {
    return handleUnauthenticatedUser(pathname, request);
  }

  return handleAuthenticatedUser(pathname, session, request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
