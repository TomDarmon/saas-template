import { redirect } from "next/navigation";
import { getDefaultOrgSlugOrRedirect } from "~/lib/org";

export default async function AccountSettings() {
  const slug = await getDefaultOrgSlugOrRedirect();
  redirect(`/o/${slug}/settings`);
}