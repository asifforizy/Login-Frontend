"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginAction, loginAction } from "../actions/auth";


export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await loginAction(formData);

    if (result.success) {
      const data = result.data as { accessToken: string };
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

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

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-4 text-right text-sm">
        <Link href="/forgot-password" className="text-blue-600 underline">
          Forgot password?
        </Link>
      </div>

      <div className="my-6 text-center text-gray-500">or</div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;
            setLoading(true);
            setError("");
            const result = await googleLoginAction(credentialResponse.credential);

            if (result.success) {
              const data = result.data as { accessToken: string };
              localStorage.setItem("accessToken", data.accessToken);
              router.push("/dashboard");
            } else {
              setError(result.error || "Google login failed");
            }
            setLoading(false);
          }}
          onError={() => setError("Google login failed")}
        />
      </div>

      <p className="mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}