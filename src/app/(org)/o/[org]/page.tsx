import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart3, Users, Zap } from "lucide-react";
import { loadOrgFromParamsOrThrow } from "~/lib/org";

export default async function OrgDashboardPage({ params }: { params: { org: string } }) {
  const { session, org } = await loadOrgFromParamsOrThrow(params);
  const displayName = session.user.name ?? session.user.email ?? "there";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to {org.name}, {displayName}</h1>
        <p className="text-muted-foreground">Here is a quick overview of your organization.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              Active users
              <Users className="size-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              API requests
              <Zap className="size-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84k</div>
            <p className="text-xs text-muted-foreground">+3.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              Conversions
              <BarChart3 className="size-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.4% from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


