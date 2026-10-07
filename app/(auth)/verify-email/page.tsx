"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmailAction } from "../actions/auth";


function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await verifyEmailAction(formData);

    if (result.success) {
      const data = result.data as { accessToken: string };
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    } else {
      setError(result.error || "Verification failed");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
      <p className="text-gray-600 mb-6">
        We sent a 6-digit OTP to <strong>{email}</strong>
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="email" value={email} />

        <div>
          <label className="block text-sm font-medium mb-1">OTP</label>
          <input
            name="otp"
            required
            maxLength={6}
            className="w-full border rounded px-3 py-2 tracking-widest text-center text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
      <VerifyEmailForm />
    </Suspense>
  );
}