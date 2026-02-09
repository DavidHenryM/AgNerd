import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { notFound } from "next/navigation"
import { getFarmBySlug } from "@lib/queries"
import  Content  from "@components/Content"
import { FarmCard } from "@/app/components/cards/FarmCard"

const detailLabelStyle = { fontWeight: 600 }

export default async function FarmDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const farm = await getFarmBySlug(slug)

  if (!farm) {
    return notFound()
  }

  return (
    <Content backgroundImageIndex={1}>
    <Card>
      <CardHeader
        title={farm.name}
        subheader={farm.businessName ?? "Farm details"}
      />
      <CardContent>
        <Stack spacing={1}>
          {farm.pic ? (
            <Typography variant="body2">
              <span style={detailLabelStyle}>PIC:</span> {farm.pic}
            </Typography>
          ) : null}
          {farm.abn ? (
            <Typography variant="body2">
              <span style={detailLabelStyle}>ABN:</span> {farm.abn}
            </Typography>
          ) : null}
          {farm.acn ? (
            <Typography variant="body2">
              <span style={detailLabelStyle}>ACN:</span> {farm.acn}
            </Typography>
          ) : null}
          {farm.areaHa ? (
            <Typography variant="body2">
              <span style={detailLabelStyle}>Area:</span> {farm.areaHa} ha
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
    <FarmCard />
    </Content>
  )
}
