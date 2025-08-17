import { OrganizationView } from "@daveyplate/better-auth-ui"

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return (
        <main className="container p-4 md:p-6">
            <OrganizationView slug={slug}/>
        </main>
    )
}