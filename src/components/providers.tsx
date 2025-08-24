"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/auth/client";
import { ThemeProvider } from "~/hooks/use-theme";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider
      defaultTheme="system"
    >
      <AuthUIProvider
        authClient={authClient}
        // @ts-expect-error Path of better-auth-ui is not compatible with Next.js 15
        navigate={(path) => router.push(path)}
        // @ts-expect-error Path of better-auth-ui is not compatible with Next.js 15
        replace={(path) => router.replace(path)}
        onSessionChange={() => router.refresh()}
        organization={{
          logo: true,
          pathMode: "slug",
          basePath: "/dashboard/organization",
        }}
        // @ts-expect-error Path of better-auth-ui is not compatible with Next.js 15
        Link={Link}
        viewPaths={{
          // Use path segments, not absolute paths
          SIGN_IN: "signin",
          SIGN_UP: "signup",
          SIGN_OUT: "signout",
          FORGOT_PASSWORD: "forgot-password",
          RESET_PASSWORD: "reset-password",
          ACCEPT_INVITATION: "accept-invitation",
        }}
      >
        {children}
      </AuthUIProvider>
    </ThemeProvider>
  );
}
