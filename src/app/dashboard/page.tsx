import { redirect } from "next/navigation";
import { getDefaultOrgSlugOrRedirect } from "~/lib/org";

export default async function DashboardPage() {
  const slug = await getDefaultOrgSlugOrRedirect();
  redirect(`/o/${slug}`);
}


