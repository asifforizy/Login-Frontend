import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/form/verify-email-form";

export default function VerifyEmailPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading verification form...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </main>
    );
}