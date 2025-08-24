export default async function Test2Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return <div>Organization Page of {slug} test page</div>
}