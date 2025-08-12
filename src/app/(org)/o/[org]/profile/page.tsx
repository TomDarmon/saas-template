import { SessionsCard, UserAvatar } from "@daveyplate/better-auth-ui";
import { loadOrgFromParamsOrThrow } from "~/lib/org";

export default async function OrgProfilePage({ params }: { params: { org: string } }) {
  const { session } = await loadOrgFromParamsOrThrow(params);
  const user = session.user;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      <div className="flex items-center gap-4">
        <UserAvatar user={user} />
        <div>
          <div className="font-medium">{user.name ?? user.email}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      <SessionsCard />
    </div>
  );
}


