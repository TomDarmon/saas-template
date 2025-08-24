import Link from "next/link";
import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { DashboardSidebar } from "~/components/dashboard-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";


export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[240px_1fr]">
        <DashboardSidebar />

        <div className="flex min-h-dvh flex-col">
          <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger aria-label="Open menu" />
            <Link href="/dashboard" className="ml-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-semibold">SaaS Template</span>
            </Link>
          </header>
          <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 sm:px-6 lg:px-10 py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
