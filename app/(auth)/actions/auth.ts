"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ActionResult = {
  success: boolean;
  error?: string;
  data?: unknown;
};

async function setRefreshCookie(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    user: {
      contactNumber: (formData.get("contactNumber") as string) || "",
    },
  };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Registration failed" };
    }

    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function verifyEmailAction(formData: FormData): Promise<ActionResult> {
  const payload = {
    email: formData.get("email") as string,
    otp: formData.get("otp") as string,
  };

  try {
    const res = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Verification failed" };
    }

    if (data.data?.refreshToken) {
      await setRefreshCookie(data.data.refreshToken);
    }

    return { success: true, data: data.data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Login failed" };
    }

    if (data.data?.refreshToken) {
      await setRefreshCookie(data.data.refreshToken);
    }

    return { success: true, data: data.data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function googleLoginAction(idToken: string): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Google login failed" };
    }

    if (data.data?.refreshToken) {
      await setRefreshCookie(data.data.refreshToken);
    }

    return { success: true, data: data.data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function forgotPasswordAction(formData: FormData): Promise<ActionResult> {
  const payload = {
    email: formData.get("email") as string,
  };

  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Failed to send OTP" };
    }

    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function resetPasswordAction(formData: FormData): Promise<ActionResult> {
  const payload = {
    email: formData.get("email") as string,
    otp: formData.get("otp") as string,
    newPassword: formData.get("newPassword") as string,
  };

  try {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Password reset failed" };
    }

    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
}