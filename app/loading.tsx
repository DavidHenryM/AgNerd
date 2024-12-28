'use client'
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"
import { ProgressBar, ProgressRoot } from "@/components/ui/progress"

export function Loading() {
  return (
    <ProgressCircleRoot value={null} size="lg" colorPalette={"teal"}>
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  )
}

export function LoadingBar(){
  return (
  <ProgressRoot maxW="80px" value={null}>
    <ProgressBar />
  </ProgressRoot>
  )
}

export default Loading