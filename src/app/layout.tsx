import "~/styles/globals.css";

import { type Metadata } from "next";

import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "SAAS template",
  description: "SAAS template",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-foreground">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
