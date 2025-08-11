"use client";
import { AuthCard } from "@daveyplate/better-auth-ui";
import { usePathname } from "next/navigation";

export default function EmailVerifiedPage() {
  const pathname = usePathname();
  return (
    <div className="flex grow flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <AuthCard pathname={pathname ?? "/email-verified"} />
      </div>
    </div>
  );
}
