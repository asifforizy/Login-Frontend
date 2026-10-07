import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/api/v1/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    const setCookies = response.headers.getSetCookie();

    for (const cookie of setCookies) {
      nextResponse.headers.append("Set-Cookie", cookie);
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to authentication server",
      },
      {
        status: 500,
      }
    );
  }
}