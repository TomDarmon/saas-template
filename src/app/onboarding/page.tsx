"use client";

import { OrganizationSwitcher } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        SaaS Template
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Create your organization</h1>
      <p className="text-muted-foreground">You don’t seem to belong to an organization yet. Create one below, or accept an invite link from a teammate.</p>
      <div className="rounded-lg border p-4">
        <OrganizationSwitcher />
      </div>
      <p className="text-xs text-muted-foreground">Tip: Use the menu above to create a new organization, then you’ll be redirected into it.</p>
    </main>
  );
}


