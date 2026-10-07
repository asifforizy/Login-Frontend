"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { forgotPasswordAction } from "../actions/auth";


export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await forgotPasswordAction(formData);

    if (result.success) {
      const email = formData.get("email") as string;
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      setError(result.error || "Failed to send OTP");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-blue-600 underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}