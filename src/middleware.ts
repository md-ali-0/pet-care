import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { decrypt } from "@/libs/session";
import { TSession } from "@/types";

// Define role-based access for routes
const roleBasedAccess: { [key: string]: string[] } = {
  "/dashboard": ["admin"],
  "/user": ["user", "admin"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the request is for static assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("accessToken")?.value;

  let session: TSession | undefined = {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    isAuth: false,
    isPremium: false,
    user: null,
    role: "guest",
    status: "guest",
    iat: 0,
    exp: 0,
  };

  if (cookie) {
    session = await decrypt(cookie);
  }

  // If the user is not logged in and tries to access the home route or other protected routes
  if (!session?.user) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/auth/signin?redirect=${pathname}`, req.url)
      );
    }
  }

  // Redirect logged-in users away from the auth pages
  if (session?.user && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Role-based access control
  const requiredRole = Object.keys(roleBasedAccess).find((route) =>
    pathname.startsWith(route)
  );

  if (requiredRole) {
    const allowedRoles = roleBasedAccess[requiredRole];

    if (!allowedRoles.includes(session?.role)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Matcher for middleware to include the home route and protected routes
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/user/:path*",
    "/auth/:path*",
  ],
};
