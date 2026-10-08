export async function googleLogin(payload: { idToken: string }) {
  const res = await fetch("/api/v1/auth/google", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Google login failed");
  return data;
}