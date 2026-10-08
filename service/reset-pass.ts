export async function resetPassword(payload: { token: string; password: string }) {
  const res = await fetch("/api/v1/auth/reset-password", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Password reset failed");
  return data;
}