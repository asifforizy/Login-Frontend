"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authRequest } from "@/lib/auth-api";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Verification token is missing");
        setLoading(false);
        return;
      }

      try {
        await authRequest("/verify-email", {
          method: "POST",
          body: JSON.stringify({
            token,
          }),
        });

        toast.success("Email verified successfully");

        router.push("/login");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Email verification failed"
        );

        setLoading(false);
      }
    };

    verify();
  }, [token, router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <MailCheck className="mx-auto mb-3 size-10 text-primary" />

        <CardTitle>Verify your email</CardTitle>

        <CardDescription>
          We're verifying your email address.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        {loading && (
          <Loader2 className="size-6 animate-spin text-primary" />
        )}

        {!loading && (
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        )}
      </CardContent>
    </Card>
  );
}