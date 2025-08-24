"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "~/server/auth/client";
import { ThemeProvider } from "~/hooks/use-theme";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const pathname = usePathname();

  // We provide the slug name to the auth context from the path given
  // If a fake slug is given it will render a 404 and be redirected to the dashboard so this is safe
  const slug = pathname?.startsWith("/dashboard/organization/")
    ? pathname.split("/")[3]
    : undefined;

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
          slug,
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
