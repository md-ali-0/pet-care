import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { decrypt } from "@/libs/session";
import { TSession } from "@/types";

const roleBasedAccess: { [key: string]: string[] } = {
  "/dashboard": ["admin"],
  "/user": ["user"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookie = req.cookies.get("accessToken")?.value;

  let session: TSession | undefined = {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    isAuth: false,
    user: null,
    role: "guest",
    status: "guest",
    iat: 0,
    exp: 0,
  };

  if (cookie) {
    session = await decrypt(cookie);
  }

  if (!session?.user) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/auth/signin?redirect=${pathname}`, req.url),
      );
    }
  } else if (session?.user && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const requiredRole = Object.keys(roleBasedAccess).find((route) =>
    pathname.startsWith(route),
  );

  if (requiredRole) {
    const allowedRoles = roleBasedAccess[requiredRole];

    if (!allowedRoles.includes(session?.role)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/auth/:path*"],
};
