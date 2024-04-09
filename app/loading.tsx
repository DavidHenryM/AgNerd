'use client'
import { CircularProgress } from "@chakra-ui/react"
export function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <CircularProgress isIndeterminate/>
    </>
  )
}

export default Loading