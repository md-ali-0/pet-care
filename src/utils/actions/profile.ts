"use server";

import { cookies } from "next/headers";

import { siteConfig } from "@/config/site";

export async function getProfile(id: string) {
  try {
    const res = await fetch(`${siteConfig.host}/api/users/profile/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export async function getMe() {
  try {
    const token = cookies().get("session")?.value;
    const res = await fetch(`${siteConfig.host}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token as string,
      },
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        errors: result?.message || "Login failed",
      };
    }

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
