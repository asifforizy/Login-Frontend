import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/form/reset-pass-form";

export default function ResetPasswordPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading reset form...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}