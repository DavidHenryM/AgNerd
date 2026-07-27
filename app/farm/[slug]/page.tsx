import { notFound } from "next/navigation"
import Content from "@components/Content"
import FarmWorkspace from "@components/farm/FarmWorkspace"
import { getFarmWorkspaceBySlug } from "@lib/queries"

export default async function FarmDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const farm = await getFarmWorkspaceBySlug(slug)

  if (!farm) {
    return notFound()
  }

  return (
    <Content backgroundImageIndex={1}>
      <FarmWorkspace farm={farm} />
    </Content>
  )
}
