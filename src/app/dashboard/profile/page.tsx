import { SessionsCard, UserAvatar } from "@daveyplate/better-auth-ui";
import { getServerSession } from "~/server/auth";

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user ?? null;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <UserAvatar user={user} />
          <div>
            <div className="font-medium">{user.name ?? user.email}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ) : null}
      <SessionsCard />
    </div>
  );
}


