"use client";
import { AuthCard } from "@daveyplate/better-auth-ui";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthCard pathname={pathname ?? "/signup"} />
      </div>
    </div>
  );
}
