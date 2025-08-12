import Link from "next/link";
import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { redirect } from "next/navigation";
import { getDefaultOrgSlugOrRedirect } from "~/lib/org";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const slug = await getDefaultOrgSlugOrRedirect();
  redirect(`/o/${slug}`);
}
