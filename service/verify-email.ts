export async function verifyEmail(payload: { token: string }) {
  const res = await fetch("/api/v1/auth/verify-email", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Email verification failed");
  return data;
}