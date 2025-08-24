export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return <div>Organization Page of {slug}</div>
}