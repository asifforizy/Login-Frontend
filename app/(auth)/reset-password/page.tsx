"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "../actions/auth";


function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await resetPasswordAction(formData);

    if (result.success) {
      router.push("/login?reset=success");
    } else {
      setError(result.error || "Reset failed");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
      <p className="text-gray-600 mb-6">
        Enter the OTP sent to <strong>{email}</strong>
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

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            name="newPassword"
            type="password"
            required
            minLength={8}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}