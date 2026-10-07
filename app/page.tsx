import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <div className="space-y-3">
        <Link
          href="/login"
          className="block w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="block w-full border border-blue-600 text-blue-600 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
}