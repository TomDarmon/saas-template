"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/server/auth/client";

export function TopnavSignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={pending}>
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}



