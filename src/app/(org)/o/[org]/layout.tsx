import Link from "next/link";
import { type ReactNode } from "react";
import { SquareKanban, UserCircle, Sparkles, Settings } from "lucide-react";
import { UserButton, OrganizationSwitcher } from "@daveyplate/better-auth-ui";
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
import { loadOrgFromParamsOrThrow } from "~/lib/org";
import { Button } from "~/components/ui/button";

export default async function OrgLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { org: string };
}) {
  await loadOrgFromParamsOrThrow(params);

  const prefix = `/o/${params.org}`;

  return (
    <SidebarProvider>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[240px_1fr]">
        <Sidebar className="hidden w-[240px] md:block">
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Link href={prefix} className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <span className="text-sm font-semibold">SaaS Template</span>
              </Link>
            </div>
            <div className="mt-4">
              <OrganizationSwitcher trigger={<Button variant="outline">Switch Organization</Button>} />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`${prefix}`}><SquareKanban className="size-4" />Overview</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`${prefix}/profile`}><UserCircle className="size-4" />Profile</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`${prefix}/settings`}><Settings className="size-4" />Settings</Link>
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
            <Link href={prefix} className="ml-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
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


