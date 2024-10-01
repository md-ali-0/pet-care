"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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
  const cookie = cookies().get("session")?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (session?.user) {
      return {
        name: session.name,
        email: session.email,
        phone: session.phone,
        avatar: session.avatar,
        isAuth: true,
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
    user: null,
    role: "guest",
    status: "guest",
  };
}
