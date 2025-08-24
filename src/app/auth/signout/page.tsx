"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "~/components/loading-button";
import { authClient } from "~/server/auth/client";
import { useToast } from "~/hooks/use-toast";

export default function SignOutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = useCallback(async (): Promise<void> => {
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
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive", 
      });
    } finally {
      setPending(false);
    }
  }, [router, toast]);

  // Auto-trigger sign out on page load
  useEffect(() => {
    void handleSignOut();
  }, [handleSignOut]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">Signing out...</h1>
        <LoadingButton
          pending={pending}
          onClick={handleSignOut}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign Out
        </LoadingButton>
      </div>
    </div>
  );
}