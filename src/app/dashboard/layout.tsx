"use client"

import Link from "next/link";
import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Home } from "lucide-react";
import { UserButton, OrganizationSwitcher } from "@daveyplate/better-auth-ui";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "~/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <SidebarProvider>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[240px_1fr]">
        <Sidebar className="hidden w-[240px] md:block">
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <span className="text-sm font-semibold">SaaS Template</span>
              </Link>
              <ThemeToggle />
            </div>
            <div className="mt-4">
              <OrganizationSwitcher
                onSetActive={(organization) => {
                  if (organization) {
                    router.push(`/dashboard/organization/${organization.slug}`)
                  } 
                }}
                hidePersonal={true}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard"><Home className="size-4" />Home</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <UserButton size="lg" />
          </SidebarFooter>
        </Sidebar>

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
