"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

import { verifyEmail } from "@/service/verify-email";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(Boolean(token));
  const [verified, setVerified] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {

    if (!token) return;


    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      try {
        await verifyEmail({ token });

        setVerified(true);
        toast.success("Email verified successfully");

        setTimeout(() => router.push("/login"), 1500);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Email verification failed"
        );
      } finally {
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
          {!token
            ? `We sent a verification link${email ? ` to ${email}` : ""}. Open it to verify your account.`
            : loading
              ? "We're verifying your email address."
              : verified
                ? "Your email is verified. Redirecting to login..."
                : "Verification failed. The link may be invalid or expired."}
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