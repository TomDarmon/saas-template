import { SecuritySettingsCards } from "@daveyplate/better-auth-ui";
import { loadOrgFromParamsOrThrow } from "~/lib/org";

export default async function OrgSettingsPage({ params }: { params: { org: string } }) {
  await loadOrgFromParamsOrThrow(params);
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>
      <SecuritySettingsCards />
    </div>
  );
}


