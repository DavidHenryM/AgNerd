'use client'
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"
import { ProgressBar, ProgressRoot } from "@/components/ui/progress"
import SidebarWithHeader from "./components/SideBar"
import { AbsoluteCenter, Card, Center, Heading, VStack } from "@chakra-ui/react"
import { NerdCowboy } from "./components/Images"

export function Loading() {
  return (
    <LoadingCard></LoadingCard>
  )
}

export function LoadingBar(){
  return (
  <ProgressRoot width={"80px"} colorPalette={"teal"} value={null}>
    <ProgressBar />
  </ProgressRoot>
  )
}

export function LoadingCard() {
  return (
    <AbsoluteCenter>
      <Card.Root variant={"elevated"} minW={"200px"} maxW={"300px"} >
        <Card.Body>
          <VStack gap={6}>
            <Heading>Loading...</Heading>
            <NerdCowboy size={60}/>
            <LoadingBar/>
          </VStack>
        </Card.Body>
        <Card.Footer/>
      </Card.Root>
</AbsoluteCenter>  )
}

export function LoadingPage(){
  return (
    <SidebarWithHeader Content={LoadingCard}></SidebarWithHeader>
  )
}

export default Loading