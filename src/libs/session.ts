"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { siteConfig } from "@/config/site";
import { TSession } from "@/types";
import "server-only";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as unknown as TSession;
  } catch (error) {
    throw error;
  }
}

export async function getSession(): Promise<TSession> {
  const cookie = cookies().get("accessToken")?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (session?.user) {
      return {
        name: session.name,
        email: session.email,
        phone: session.phone,
        avatar: session.avatar,
        isAuth: true,
        isPremium: session?.isPremium,
        user: session.user,
        role: session.role,
        status: session.status,
      };
    }
  }

  return {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    isAuth: false,
    isPremium: false,
    user: null,
    role: "guest",
    status: "guest",
  };
}


export async function updateSession() {

  try {
    const res = await fetch(`${siteConfig.host}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie : `refreshToken=${cookies().get('refreshToken')}`
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        errors: result?.message || "Login failed",
      };
    }

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    if (result?.success)
      cookies().set("accessToken", result?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
        expires: expiresAt,
      });

    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle any network or unexpected errors
    return {
      success: false,
      errors: "Something went wrong. Please try again.",
    };
  }

}