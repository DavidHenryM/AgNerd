"use client"

import { BeastView } from './beastView';
import { useEffect, useRef, useState } from 'react';
import Loading from './loading';
import { getLivestock } from '@lib/queries';
import ControlBar from "./components/ControlBar";
import StockPreviewCard from "./components/cards/StockPreview";
import { getArrayTrues } from './utils/utils';
import { CommercialClass, LivestockUnit } from './generated/prisma/browser';
import Content from './components/Content';
import { Grid } from '@mui/material';
import { LivestockUnitWhereInput } from './generated/prisma/models';

export function ActiveLivestock() {
  const commercialClasses = Object.keys(CommercialClass)
  const livestockUnits = useRef<LivestockUnit[]>([])
  const [livestockDisplay, setLivestockDisplay] = useState<LivestockUnit[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockUnit>()
  const [loading, setLoading] = useState(true)
  const [whereFilter, setWhereFilter] = useState<LivestockUnitWhereInput>({active: {equals: true}, commercialClass: {in: commercialClasses as CommercialClass[]}})
  const [filterChecked, setFilterChecked] = useState(new Array<boolean>(commercialClasses.length).fill(true))
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    async function filterLivestock() {
      const checkedClasses: Array<string> = getArrayTrues(commercialClasses, filterChecked)
      const livestockToDisplay: Array<LivestockUnit> = []
      livestockUnits.current.map((livestockUnit: LivestockUnit)=>{
        if(livestockUnit.commercialClass != null){
          if(checkedClasses.includes(livestockUnit.commercialClass)){
            livestockToDisplay.push(livestockUnit)
          }
        }
      })
      setLivestockDisplay(livestockToDisplay)
    }
    filterLivestock()
  }, [openFilter, filterChecked, commercialClasses])

  useEffect(() => {
    async function updateWhereFilter() {
      setLoading(true)
      getLivestock(whereFilter)
        .then((livestock: LivestockUnit[]) => {
          console.log("Livestock fetched:", livestock)
          livestockUnits.current = livestock
          setLivestockDisplay(livestockUnits.current)
          setLoading(false)
        })
      }
    updateWhereFilter()
  },[whereFilter])

  if (loading){
    return (<Loading/>)
  } else {
    if (!stockFocus){
      return (
        <Content backgroundImageIndex={1}>
          {/* <Grid spacing={2} > */}
            <ControlBar filterChecked={filterChecked} setFilterChecked={setFilterChecked} openFilter={openFilter} setOpenFilter={setOpenFilter}/>
            {/* <Grid spacing={2}> */}
              {
                livestockDisplay.map((stock: LivestockUnit, index: number)=>{
                  return (
                    <Grid key={stock.id} spacing={2}>
                      <StockPreviewCard key={stock.id} stock={stock} index={index} onClick={() => setStockFocus(stock)}/>
                    </Grid>
                  )
                })
              }
            {/* </Grid> */}
          {/* </Grid> */}
        </Content>
      )
    } else {
      return (
        <BeastView 
          stock={stockFocus}
        />
      )
    }
  }
}