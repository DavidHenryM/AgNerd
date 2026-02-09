'use client'

import { CurrencyStat, NumberStat } from "@components/Stats"
import {  Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { getActiveLivestockCount, getFarmName, getTotalActiveDSE } from "@lib/queries"
import { useEffect, useState } from "react"
import  LoadingBar  from "@app/loading"
import StockingRateCard from "./StockingRateCard"


export function FarmCard(){
  const [livestockCount, setLivestockCount] = useState<number>(0)
  const [loadingLivestockCount, setLoadingLivestockCount] = useState<boolean>(true)

  const [farmName, setFarmName] = useState<string>("")
  const [loadingFarmName, setLoadingFarmName] = useState<boolean>(true)
    
  const [totalActiveDSE, setTotalActiveDSE] = useState<number>(0)
  const [loadingTotalActiveDSE, setLoadingTotalActiveDSE] = useState<boolean>(true)

  useEffect(() => {
    async function fetchFarmName() {
      setLoadingFarmName(true)
      getFarmName()
        .then((name: string) => {
          setFarmName(name)
          setLoadingFarmName(false)
        })
    }
    fetchFarmName()
  }, [])

  useEffect(() => {
    async function fetchLivestockCount() {
    setLoadingLivestockCount(true)
    getActiveLivestockCount()
      .then((count: number) => {
        setLivestockCount(count)
        setLoadingLivestockCount(false)
      })
    }
    fetchLivestockCount()
  }, [])

  useEffect(() => {
    async function fetchTotalActiveDSE() {
    setLoadingTotalActiveDSE(true)
    getTotalActiveDSE()
      .then((count: number) => {
        setTotalActiveDSE(count)
        setLoadingTotalActiveDSE(false)
      })
    }
    fetchTotalActiveDSE()
  }, [])


  return (
    <>
      <StockingRateCard 
        livestockCount={livestockCount} 
        loadingLivestockCount={loadingLivestockCount} 
        totalActiveDSE={totalActiveDSE} 
        loadingTotalActiveDSE={loadingTotalActiveDSE} 
      />
      <Card>
      <CardHeader
          title="Livestock Value"
      />
      <CardContent>
        <CurrencyStat label={"Seed Stock"} value={99999} trend={{direction: "up", value: "$10", label:"since last week"}}/>
        <CurrencyStat label={"Commercial Stock"} value={99999} trend={{direction: "up", value: "$10", label:"since last week"}}/>
        <CurrencyStat label={"Total market value"} value={99999} trend={{direction: "up", value: "$10", label:"since last week"}}/>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Rainfall" />
      <CardContent>
        <NumberStat label={"last 30 days"} value={20.5} style={undefined} currency={undefined} unit={"mm"} trend={{direction: "down", value:"23.36%", unit: undefined, label:"from last year" }}/>
      </CardContent>
    </Card>
  </>
  )
}