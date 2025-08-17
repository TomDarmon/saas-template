"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/auth/client";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={(path) => router.push(path)}
      replace={(path) => router.replace(path)}
      onSessionChange={() => router.refresh()}
      organization={{
        logo: true,
        pathMode: "slug",
        basePath: "/dashboard/organization",
      }}
      Link={Link}
      viewPaths={{
        // Use path segments, not absolute paths
        SIGN_IN: "signin",
        SIGN_UP: "signup",
        FORGOT_PASSWORD: "forgot-password",
        RESET_PASSWORD: "reset-password",
        ACCEPT_INVITATION: "accept-invitation",
      }}
    >
      {children}
    </AuthUIProvider>
  );
}


