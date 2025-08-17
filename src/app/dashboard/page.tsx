import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const organizations = await api.auth.getOrganizationsList();
  return <div>
    <div className="mt-4">
      <h2 className="mb-2 text-lg font-semibold">Organizations:</h2>
      <div className="flex flex-col gap-2">
        {organizations.map((organization) => (
          <Button key={organization.id} asChild variant="outline">
            <Link href={`/dashboard/organization/${organization.slug}`}>
              {organization.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  </div>
}
