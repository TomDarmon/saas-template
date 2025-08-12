import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { getServerSession } from "~/server/auth";
import { member, organization } from "~/server/db/auth/organization";

export type OrgRecord = typeof organization.$inferSelect;

export async function getRequiredSession() {
  const session = await getServerSession();
  if (!session) redirect("/auth/signin");
  return session;
}

export async function getOrganizationBySlug(slug: string): Promise<OrgRecord | null> {
  const rows = await db.select().from(organization).where(eq(organization.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function assertUserIsOrgMember(params: { userId: string; orgId: string }): Promise<boolean> {
  const rows = await db
    .select({ id: member.id })
    .from(member)
    .where(and(eq(member.userId, params.userId), eq(member.organizationId, params.orgId)))
    .limit(1);
  return Boolean(rows[0]);
}

export async function getDefaultOrgForUser(userId: string): Promise<OrgRecord | null> {
  const rows = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo,
      metadata: organization.metadata,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, userId))
    .limit(1);
  return (rows as unknown as OrgRecord[])[0] ?? null;
}

export async function getDefaultOrgSlugOrRedirect(): Promise<string> {
  const session = await getRequiredSession();
  const org = await getDefaultOrgForUser(session.user.id);
  if (!org) redirect("/onboarding");
  return org.slug;
}

export async function loadOrgFromParamsOrThrow(params: { org: string }) {
  const session = await getRequiredSession();
  const org = await getOrganizationBySlug(params.org);
  if (!org) notFound();
  const isMember = await assertUserIsOrgMember({ userId: session.user.id, orgId: org.id });
  if (!isMember) notFound();
  return { session, org } as const;
}


