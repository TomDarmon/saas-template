import { OrganizationView } from "@daveyplate/better-auth-ui"
import { organizationViewPaths } from "@daveyplate/better-auth-ui/server"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(organizationViewPaths).map((path) => ({ path }))
}

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string, path: string }> }) {
    const { slug, path } = await params

    return (
        <main className="container p-4 md:p-6">
            <OrganizationView slug={slug} path={path} />
        </main>
    )
}