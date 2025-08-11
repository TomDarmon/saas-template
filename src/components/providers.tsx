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
      Link={Link}
      viewPaths={{
        SIGN_IN: "/api/auth/sign-in",
        SIGN_UP: "/api/auth/sign-up",
        FORGOT_PASSWORD: "/api/auth/email-verified",
        RESET_PASSWORD: "/api/auth/forgot-password",
      }}
    >
      {children}
    </AuthUIProvider>
  );
}


