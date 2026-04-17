"use client"

import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
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
  return (
    <Box sx={{
      position: 'fixed',
      top: { xs: '56px', sm: '64px' },
      bottom: { xs: 0, md: footerHeight },
      right: 0,
      left: {
        xs: 0,
        sm: drawerWidth.sm,
        md: drawerWidth.md,
        lg: drawerWidth.lg
      },
      overflow: 'hidden',
    }}>
      <NavigationScreen/>
    </Box>
  )
}