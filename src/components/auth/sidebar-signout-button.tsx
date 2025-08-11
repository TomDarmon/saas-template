"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import { authClient } from "~/server/auth/client";

export function SidebarSignOutButton() {
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
    <SidebarMenuButton onClick={handleSignOut} disabled={pending} className="gap-2">
      <LogOut className="size-4" />
      Sign out
    </SidebarMenuButton>
  );
}


