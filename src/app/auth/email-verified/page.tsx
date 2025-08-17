"use client";
import { AuthView } from "@daveyplate/better-auth-ui";
import { usePathname } from "next/navigation";

export default function EmailVerifiedPage() {
  const pathname = usePathname();
  return (
    <div className="flex grow flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <AuthView pathname={pathname} />
      </div>
    </div>
  );
}
