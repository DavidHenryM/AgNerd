'use client'
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"

export function Loading() {
  return (
    <ProgressCircleRoot value={null} size="lg" colorPalette={"teal"}>
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  )
}

export default Loading