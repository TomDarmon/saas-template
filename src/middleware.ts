import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";
import type { Session } from "~/server/auth";

function createRouteMatcher(patterns: string[]) {
  return (request: NextRequest): boolean => {
    const pathname = request.nextUrl.pathname;
    return patterns.some(pattern => {
      // Convert pattern to regex, handling wildcards
      const regexPattern = pattern
        .replace(/\*\*/g, '.*') // ** matches any path segments
        .replace(/\*/g, '[^/]*') // * matches within a segment
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\\\.\\\*\\\)/g, '(/.*)?'); // Convert \(\.\*\) back to (/.*)?
      
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(pathname);
    });
  };
}

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

async function protect(request: NextRequest): Promise<NextResponse | null> {

  const session = await getSession(request);
  
  if (!session) {
    // Redirect unauthenticated users to landing page
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Admin route protection
  if (isAdminRoute(request) && session.user.role !== "admin") {
    console.log(`User ${session.user.id} is not an admin and tried to enter the admin page`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard/*",
]);

const isAdminRoute = createRouteMatcher([
  "/admin",
  "/admin/*",
]);

export default async function authMiddleware(request: NextRequest) {

  if (isProtectedRoute(request)) {
    return protect(request);
  }
  // User is authorized to access the route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
