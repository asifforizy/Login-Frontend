import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(
    `${API_URL}/api/v1/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}