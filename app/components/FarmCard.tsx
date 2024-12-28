'use client'

import { CurrencyStat, LiveStockCountStat } from "./Stats"
import { LivestockCards } from "./LivestockCards"
import { Tabs, Card } from "@chakra-ui/react"
import { 
  StatLabel, 
  StatRoot, 
  StatValueText,
  StatValueUnit,
  StatHelpText,
  StatDownTrend,
  StatUpTrend
} from "@/components/ui/stat"
import { getActiveLivestockCount, getFarmName, getActiveLivestock } from "../queries"
import { useEffect, useState } from "react"
import Loading, { LoadingBar } from "../loading"


export function FarmCard(){
  let [livestockCount, setLivestockCount] = useState<number>(0)
  let [farmName, setFarmName] = useState<string>("")
  let [loadingFarmName, setLoadingFarmName] = useState<boolean>(true)
  let [loadingLivestockCount, setLoadingLivestockCount] = useState<boolean>(true)


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
        console.log(livestockCount)
        setLoadingLivestockCount(false)
      })
  }, [])


  return (
    <Card.Root>
      <Card.Header>
        {loadingFarmName ? <LoadingBar/>: farmName} 
      </Card.Header>
      <Card.Body>
        {loadingLivestockCount ? <LoadingBar/> : 
        <LiveStockCountStat currentCount={livestockCount} priorCount={10} trendLabel={undefined}/>}
        <StatRoot>
          <StatLabel>Dry sheep equivalent</StatLabel>
          <StatValueText>{"547?"}</StatValueText>
        </StatRoot>
        <StatRoot>
          <StatLabel>Days to next birth</StatLabel>
          <StatValueText>2</StatValueText>
        </StatRoot>
        <CurrencyStat label={"Livestock market value"} value={99999} trend={{direction: "up", value: "$10", label:"since last week"}}/>
        <StatRoot>
          <StatLabel>Livestock market value</StatLabel>
          <StatValueText value={99999} formatOptions={{style: "currency", currency: "AUD"}}></StatValueText>
          <StatUpTrend>"23.36%"</StatUpTrend>
          <StatHelpText>
          </StatHelpText>
        </StatRoot>
        <StatRoot>
          <StatLabel>Rainfall 30 days</StatLabel>
          <StatValueText>??? mm</StatValueText>
          <StatUpTrend>23.36%</StatUpTrend>
          <StatHelpText>
            from last the same period last year
          </StatHelpText>
        </StatRoot>
      </Card.Body>
      <Card.Footer>
        Farm Statistics
      </Card.Footer>
    </Card.Root>
  )
}