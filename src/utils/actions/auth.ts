"use server";

import { cookies } from "next/headers";

import { siteConfig } from "@/config/site";
import { forgotPasswordSchema } from "@/schema/forgot-password.schema";
import { resetPasswordSchema } from "@/schema/reset-password.schema";
import { signInSchema } from "@/schema/siginin.schema";

interface FormValues {
  id?: string;
  name?: string;
  email?: string;
  newPassword?: string;
  password?: string;
  rememberMe?: boolean;
  token?: string;
}

export async function signin(formData: FormValues) {
  const validatedFields = signInSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${siteConfig.host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
      cookies().set("session", result?.data, {
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

export async function signup(formData: FormValues) {
  const validatedFields = signInSchema.safeParse({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${siteConfig.host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        errors: result?.message || "Signup failed",
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

export async function forgotPassword(formData: FormValues) {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.email,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${siteConfig.host}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        errors: result?.message || "Password Reset Email Send failed",
      };
    }

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

export async function resetPassword(formData: FormValues) {
  const validatedFields = resetPasswordSchema.safeParse({
    newPassword: formData.newPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${siteConfig.host}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: formData.token as string,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        errors: result?.message || "Password Change failed",
      };
    }

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

export async function signout() {
  cookies().delete("session");
}
