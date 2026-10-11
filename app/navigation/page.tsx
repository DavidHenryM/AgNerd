"use client"

import dynamic from 'next/dynamic'
import { Alert, Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { authClient } from '@lib/auth-client'
import { redirectNavigationToSignIn } from '@lib/navigation-auth'
import { drawerWidth, footerHeight } from '@app/settings'
import { Ion } from 'cesium';

if (typeof window !== "undefined") {
  // Must be set before Cesium resolves asset paths
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).CESIUM_BASE_URL = "/cesium/";
}

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || '';

const NavigationScreen = dynamic(
  () => import('../components/screens/Navigation'),
  { ssr: false }
)


export default function Navigation(){
  const { data: session, isPending, error } = authClient.useSession()
  useEffect(() => {
    if (!isPending && !error && !session) redirectNavigationToSignIn()
  }, [session, isPending, error])
  return (
    <Box sx={{
      position: 'fixed',
      top: { xs: '56px', sm: '64px' },
      bottom: { xs: 0, xl: footerHeight },
      right: 0,
      left: { xs: 0, xl: drawerWidth.lg },
      overflow: 'hidden',
    }}>
      {error ? <Alert severity="error">Unable to check your session. Reload to try again.</Alert>
        : isPending ? <CircularProgress aria-label="Checking session" />
        : session ? <NavigationScreen/> : null}
    </Box>
  )
}