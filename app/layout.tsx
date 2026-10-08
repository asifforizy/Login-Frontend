import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { GoogleProvider } from "@/components/provider/google-provider";


export const metadata: Metadata = {
  title: "Mini Coders",
  description: "Learn coding with Mini Coders",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <GoogleProvider>
          {children}
        </GoogleProvider>

        <Toaster />
      </body>
    </html>
  );
}