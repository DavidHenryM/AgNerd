import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { notFound } from "next/navigation"
import { getFarmBySlug } from "@lib/queries"

const detailLabelStyle = { fontWeight: 600 }

export default async function FarmDetailsPage({ params }: { params: { slug: string } }) {
  const farm = await getFarmBySlug(params.slug)

  if (!farm) {
    return notFound()
  }

  return (
    <Card>
      <CardHeader
        title={farm.name}
        subheader={farm.businessName ?? "Farm details"}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2">
            <span style={detailLabelStyle}>Slug:</span> {farm.slug}
          </Typography>
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
  )
}
