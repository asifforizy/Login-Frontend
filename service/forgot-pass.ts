export async function forgotPassword(payload: { email: string }) {
  const res = await fetch("/api/v1/auth/forgot-password", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Unable to process request");
  return data;
}