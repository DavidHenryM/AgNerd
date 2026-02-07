'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { authClient } from "@lib/auth-client"
import { getUserFarms, type FarmListItem } from "@lib/queries"
import { FarmCard } from "../components/cards/FarmCard"
import Content from "../components/Content"

export default function Farm(){
  const sessionData = authClient.useSession()
  const [farms, setFarms] = useState<FarmListItem[]>([])
  const [loadingFarms, setLoadingFarms] = useState(true)

  useEffect(() => {
    const userId = sessionData.data?.user?.id
    if (!userId) {
      setFarms([])
      setLoadingFarms(false)
      return
    }

    setLoadingFarms(true)
    getUserFarms(userId)
      .then((result) => {
        setFarms(result)
      })
      .finally(() => {
        setLoadingFarms(false)
      })
  }, [sessionData.data?.user?.id])

  return (
    <Content>
    <Stack spacing={3}>
      <Card>
        <CardHeader
          title="Your farms"
          subheader="Select a farm to view details"
        />
        <CardContent>
          {sessionData.isPending || loadingFarms ? (
            <Typography variant="body2" color="text.secondary">
              Loading farms...
            </Typography>
          ) : farms.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No farms found for your account.
            </Typography>
          ) : (
            <List disablePadding>
              {farms.map((farm, index) => (
                <ListItem key={farm.id} disablePadding divider={index < farms.length - 1}>
                  {farm.slug ? (
                    <Link href={`/farm/${farm.slug}`} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                      <ListItemButton>
                        <ListItemText
                          primary={farm.name}
                          secondary={farm.businessName ?? undefined}
                        />
                      </ListItemButton>
                    </Link>
                  ) : (
                    <ListItemButton disabled>
                      <ListItemText
                        primary={farm.name}
                        secondary="Missing slug"
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      <Divider />
      <FarmCard />
    </Stack>
    </Content>
  )
}