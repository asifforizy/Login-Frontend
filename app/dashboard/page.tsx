import { redirect } from "next/navigation";
import { getMe } from "@/service/getme";

export default async function DashboardPage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="rounded-2xl border bg-card p-8">
        <p className="text-sm text-muted-foreground">
          Welcome back
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {user.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user.email}
        </p>

        <div className="mt-6">
          <p className="text-sm">
            Role:{" "}
            <span className="font-medium">
              {user.role}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}