"use client"

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, Home, IceCream, type LucideIcon } from "lucide-react";
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
  SidebarFooter,
} from "~/components/ui/sidebar";


const PREFIX = "/dashboard/organization/";

// Define the structure for menu items
export interface MenuItem {
  id: string;
  label: string;
  href: string | ((slug: string) => string);
  icon: LucideIcon;
}

export interface MenuGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

// Default menu configuration - keeping only Home for now
const defaultMenuGroups: MenuGroup[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "home",
        label: "Home",
        href: (slug: string) => `/dashboard/organization/${slug}`,
        icon: Home,
      },
      { 
        id: "fakepage", 
        label: "Fake Page", 
        href: (slug: string) => `/dashboard/organization/${slug}/fakepage`, 
        icon: IceCream 
      },
    ],
  },
];

interface DashboardSidebarProps {
  menuGroups?: MenuGroup[];
}

export function DashboardSidebar({ menuGroups = defaultMenuGroups }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the current organization slug from the pathname
  const currentSlug = pathname?.startsWith("/dashboard/organization/")
    ? pathname.split("/")[3]
    : undefined;

    if (!currentSlug) {
        throw new Error("No organization slug found");
    }

  return (
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
                // Navigate to the organization page
                router.push(`${PREFIX}${organization.slug}`)
              } 
            }}
            hidePersonal={true}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
                // Generate the href based on current organization slug
                const href = typeof item.href === 'function' && currentSlug 
                  ? item.href(currentSlug)
                  : typeof item.href === 'string' 
                  ? item.href 
                  : '/dashboard'; // Fallback to dashboard if no slug available
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      {/* @ts-expect-error Path of better-auth-ui is not compatible with Next.js 15 */}
                      <Link href={href}>
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserButton size="lg" />
      </SidebarFooter>
    </Sidebar>
  );
}
