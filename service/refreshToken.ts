import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "No refresh token" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/auth/refresh-token`,
    {
      method: "POST",
      headers: { Cookie: `refreshToken=${refreshToken}` },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: data?.message ?? "Refresh failed" },
      { status: res.status }
    );
  }

  const accessToken = data?.data?.accessToken ?? data?.accessToken;
  const newRefreshToken = data?.data?.refreshToken ?? data?.refreshToken;

  if (accessToken) {
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  if (newRefreshToken) {
    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return NextResponse.json({ success: true });
}