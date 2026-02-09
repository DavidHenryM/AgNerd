"use client"

import { BeastView } from './beastView';
import { useEffect, useRef, useState } from 'react';
import Loading from './loading';
import { getLivestock } from '@lib/queries';
import ControlBar from "./components/ControlBar";
import StockPreviewCard, { type LivestockWithRelations } from "./components/cards/StockPreview";
import { getArrayTrues } from './utils/utils';
import { CommercialClass, LivestockUnit } from './generated/prisma/browser';
import Content from './components/Content';
import { Grid } from '@mui/material';
import { LivestockUnitWhereInput } from './generated/prisma/models';

export function ActiveLivestock() {
  const commercialClasses = Object.keys(CommercialClass)
  const livestockUnits = useRef<LivestockWithRelations[]>([])
  const [livestockDisplay, setLivestockDisplay] = useState<LivestockWithRelations[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockWithRelations>()
  const [loading, setLoading] = useState(true)
  const [whereFilter, setWhereFilter] = useState<LivestockUnitWhereInput>({
    active: {equals: true},
    commercialClass: {in: commercialClasses as CommercialClass[]},
    onFarmHistory: { some: { endDate: { equals: null } } },
  })
  const [filterChecked, setFilterChecked] = useState(new Array<boolean>(commercialClasses.length).fill(true))
  const [openFilter, setOpenFilter] = useState(false)
  const [onFarmOnly, setOnFarmOnly] = useState(true)

  useEffect(() => {
    async function filterLivestock() {
      const checkedClasses: Array<string> = getArrayTrues(commercialClasses, filterChecked)
      const livestockToDisplay: Array<LivestockWithRelations> = []
      livestockUnits.current.map((livestockUnit: LivestockWithRelations)=>{
        if(livestockUnit.commercialClass != null){
          if(checkedClasses.includes(livestockUnit.commercialClass)){
            livestockToDisplay.push(livestockUnit)
          }
        }
      })
      setLivestockDisplay(livestockToDisplay)
    }
    filterLivestock()
  }, [filterChecked])

  useEffect(() => {
    async function updateWhereFilter() {
      setLoading(true)
      getLivestock(whereFilter)
        .then((livestock: LivestockWithRelations[]) => {
          console.log("Livestock fetched:", livestock)
          livestockUnits.current = livestock
          setLivestockDisplay(livestockUnits.current)
          setLoading(false)
        })
      }
    updateWhereFilter()
  },[whereFilter])

  useEffect(() => {
    setWhereFilter((prev) => {
      const next: LivestockUnitWhereInput = { ...prev }
      if (onFarmOnly) {
        next.onFarmHistory = { some: { endDate: { equals: null } } }
      } else {
        delete (next as { onFarmHistory?: LivestockUnitWhereInput["onFarmHistory"] }).onFarmHistory
      }
      return next
    })
  }, [onFarmOnly])

  if (loading){
    return (
      <Content backgroundImageIndex={1}>
        <Loading/>
      </Content>
    )
  } else {
    if (!stockFocus){
      const handleFocusById = (id: string) => {
        const match = livestockUnits.current.find((unit) => unit.id === id)
        if (match) {
          setStockFocus(match)
        }
      }

      return (
        <Content backgroundImageIndex={1}>
          {/* <Grid spacing={2} > */}
            <ControlBar
              filterChecked={filterChecked}
              setFilterChecked={setFilterChecked}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              onFarmOnly={onFarmOnly}
              setOnFarmOnly={setOnFarmOnly}
            />
            {/* <Grid spacing={2}> */}
              {
                livestockDisplay.map((stock: LivestockWithRelations, index: number)=>{
                  return (
                    <Grid key={stock.id} spacing={2}>
                      <StockPreviewCard
                        key={stock.id}
                        stock={stock}
                        index={index}
                        onClick={() => setStockFocus(stock)}
                        onFocusById={handleFocusById}
                      />
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