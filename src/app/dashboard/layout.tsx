import Link from "next/link";
import { type ReactNode } from "react";
import { SquareKanban, UserCircle, Sparkles } from "lucide-react";
import { UserButton } from "@daveyplate/better-auth-ui";
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
} from "~/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Sidebar className="hidden w-[240px] md:block">
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-semibold">SaaS Template</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard"><SquareKanban className="size-4" />Overview</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/profile"><UserCircle className="size-4" />Profile</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {/* User actions handled by UserButton in header */}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main */}
        <div className="flex min-h-dvh flex-col">
          <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger aria-label="Open menu" />
            <Link href="/" className="ml-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-semibold">SaaS Template</span>
            </Link>
            <div className="ml-auto" />
            <UserButton />
          </header>
          <main className="container mx-auto max-w-6xl flex-1 px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}


