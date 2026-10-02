"use client"

import { BeastView } from './beastView';
import { useEffect, useMemo, useState } from 'react';
import Loading from './loading';
import { getLivestock } from '@lib/queries';
import ControlBar from "./components/ControlBar";
import StockPreviewCard, { type LivestockWithRelations } from "./components/cards/StockPreview";
import { getArrayTrues } from './utils/utils';
import { CommercialClass } from './generated/prisma/browser';
import Content from './components/Content';
import { Grid } from '@mui/material';
import { LivestockUnitWhereInput } from './generated/prisma/models';

export function ActiveLivestock() {
  const commercialClasses = useMemo(() => Object.keys(CommercialClass), [])
  const [livestockUnits, setLivestockUnits] = useState<LivestockWithRelations[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockWithRelations>()
  const [loadedFilterKey, setLoadedFilterKey] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [onFarmOnly, setOnFarmOnly] = useState(true)
  const whereFilter = useMemo<LivestockUnitWhereInput>(() => ({
    active: { equals: true },
    commercialClass: { in: commercialClasses as CommercialClass[] },
    ...(onFarmOnly ? { onFarmHistory: { some: { endDate: { equals: null } } } } : {}),
  }), [commercialClasses, onFarmOnly])
  const filterKey = JSON.stringify(whereFilter)
  const loading = refreshing || loadedFilterKey !== filterKey
  const [filterChecked, setFilterChecked] = useState(new Array<boolean>(commercialClasses.length).fill(true))
  const [openFilter, setOpenFilter] = useState(false)

  const checkedClasses = getArrayTrues(commercialClasses, filterChecked)
  const livestockDisplay = livestockUnits.filter((livestockUnit) =>
    livestockUnit.commercialClass != null
    && checkedClasses.includes(livestockUnit.commercialClass)
  )

  useEffect(() => {
    let cancelled = false
    void getLivestock(whereFilter)
      .then((livestock: LivestockWithRelations[]) => {
        if (cancelled) {
          return
        }
        setLivestockUnits(livestock)
        setLoadedFilterKey(filterKey)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Failed to load livestock:", error)
          setLoadedFilterKey(filterKey)
        }
      })
    return () => {
      cancelled = true
    }
  }, [filterKey, whereFilter])

  const refreshLivestock = () => {
    setRefreshing(true)
    void getLivestock(whereFilter)
      .then((livestock: LivestockWithRelations[]) => {
        setLivestockUnits(livestock)
      })
      .catch((error: unknown) => {
        console.error("Failed to refresh livestock:", error)
      })
      .finally(() => {
        setRefreshing(false)
      })
  }

  if (loading){
    return (
      <Content backgroundImageIndex={1}>
        <Loading/>
      </Content>
    )
  } else {
    if (!stockFocus){
      const handleFocusById = (id: string) => {
        const match = livestockUnits.find((unit) => unit.id === id)
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
              onCreated={refreshLivestock}
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