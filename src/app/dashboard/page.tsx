import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerSession } from "~/server/auth";
import { BarChart3, Users, Zap } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();
  const displayName = session?.user?.name ?? session?.user?.email ?? "there";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">Here is a quick overview of your project.</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Getting started</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Invite your team</li>
            <li>Set up your environment variables</li>
            <li>Deploy to production</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}


