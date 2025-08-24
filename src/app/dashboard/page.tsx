import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const organizations = await api.auth.getOrganizationsList();
  
  // Redirect to the first organization if available
  if (organizations.length > 0) {
    redirect(`/dashboard/organization/${organizations[0]!.slug}`);
  } else {
    redirect("/onboarding");
  }
  
  // If no organizations, show empty state
  return (
    <div className="container p-4 md:p-6">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold">No Organizations Found</h2>
        <p className="text-muted-foreground">You don&apos;t have access to any organizations yet.</p>
      </div>
    </div>
  );
}
