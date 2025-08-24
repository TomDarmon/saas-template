import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const organizations = await api.auth.getOrganizationsList();
  // Redirect to the first organization if available and set the active organization for the session
  if (organizations.length > 0) {
    console.log("Redirecting to organization", organizations[0]!.slug);
    redirect(`/dashboard/organization/${organizations[0]!.slug}`);
  } else {
    redirect("/onboarding");
  }
}
