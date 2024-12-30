'use client'

import { CurrencyStat, NumberStat } from "./Stats"
import {  Card, Heading, VStack, Flex } from "@chakra-ui/react"
import { getActiveLivestockCount, getFarmName, getTotalActiveDSE } from "../queries"
import { useEffect, useState } from "react"
import { LoadingBar } from "../loading"
import { StockingRateCard } from "./Cards"


export function FarmCard(){
  let [livestockCount, setLivestockCount] = useState<number>(0)
  let [loadingLivestockCount, setLoadingLivestockCount] = useState<boolean>(true)

  let [farmName, setFarmName] = useState<string>("")
  let [loadingFarmName, setLoadingFarmName] = useState<boolean>(true)
    
  let [totalActiveDSE, setTotalActiveDSE] = useState<number>(0)
  let [loadingTotalActiveDSE, setLoadingTotalActiveDSE] = useState<boolean>(true)

  useEffect(() => {
    setLoadingFarmName(true)
    getFarmName()
      .then((name: string) => {
        setFarmName(name)
        setLoadingFarmName(false)
      })
  }, [])

  useEffect(() => {
    setLoadingLivestockCount(true)
    getActiveLivestockCount()
      .then((count: number) => {
        setLivestockCount(count)
        setLoadingLivestockCount(false)
      })
  }, [])

  useEffect(() => {
    setLoadingTotalActiveDSE(true)
    getTotalActiveDSE()
      .then((count: number) => {
        setTotalActiveDSE(count)
        setLoadingTotalActiveDSE(false)
      })
  }, [])


  return (
    <Card.Root variant={"subtle"} gap={"6"} padding={"6"} maxW={"1040px"}>
      <Card.Header>
        <VStack>
          <Heading>
            {loadingFarmName ? <LoadingBar/>: farmName} 
          </Heading>
          <Heading>
            Farm Statistics
          </Heading>
        </VStack>
      </Card.Header>
      <Flex justifyContent={"center"} gap="6">
        <StockingRateCard 
          livestockCount={livestockCount} 
          loadingLivestockCount={loadingLivestockCount} 
          totalActiveDSE={totalActiveDSE} 
          loadingTotalActiveDSE={loadingTotalActiveDSE} 
        />
        <Card.Root variant={"elevated"}>
        </Card.Root>
        <Card.Root variant={"elevated"}>
          <Card.Header>
            Livestock Value
          </Card.Header>
          <Card.Body>
            <CurrencyStat label={"total market value"} value={99999} trend={{direction: "up", value: "$10", label:"since last week"}}/>
          </Card.Body>
        </Card.Root>
        <Card.Root variant={"elevated"}>
          <Card.Header>Rainfall</Card.Header>
          <Card.Body>
            <NumberStat label={"last 30 days"} value={20.5} style={undefined} currency={undefined} unit={"mm"} trend={{direction: "down", value:"23.36%", unit: undefined, label:"from last year" }}/>
          </Card.Body>
        </Card.Root>
      </Flex>
    </Card.Root>
  )
}