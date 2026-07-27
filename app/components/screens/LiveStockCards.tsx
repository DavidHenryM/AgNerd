import { Skeleton, Stack } from "@mui/material"
import { useState, useEffect } from "react"
import { BeastView } from "../../beastView"
import StockPreviewCard, { type LivestockWithRelations } from "@components/cards/StockPreview"
import { getLivestock } from "@lib/queries"
import { LivestockUnitWhereInput } from "@/app/generated/prisma/models"


export default function LivestockCardsScreen(props: {whereFilter: Partial<LivestockUnitWhereInput>}) { 
  const filterKey = JSON.stringify(props.whereFilter)
  const [livestockResponse, setLivestockResponse] = useState<{
    filterKey: string
    livestockUnits: LivestockWithRelations[]
  }>()
  const [stockFocus, setStockFocus] = useState<LivestockWithRelations>()
  const livestockUnits = livestockResponse?.livestockUnits ?? []
  const loading = livestockResponse?.filterKey !== filterKey

  useEffect(() => {
    let cancelled = false

    getLivestock(props.whereFilter)
      .then((livestock: LivestockWithRelations[]) => {
        if (cancelled) {
          return
        }

        setLivestockResponse({
          filterKey,
          livestockUnits: livestock,
        })
        setStockFocus((currentFocus) =>
          currentFocus ? livestock.find((unit) => unit.id === currentFocus.id) : undefined
        )
      })

    return () => {
      cancelled = true
    }
  }, [filterKey, props.whereFilter])

  if (loading){
    return (
      <Stack direction="row" flexWrap="wrap" gap={6}>
        {Array.from(Array(12).keys()).map((value: number) => (
          <Skeleton key={`stockPreviewCardSkeleton_${value}`} variant="rectangular" width={210} height={118} />
        ))}
      </Stack>
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
        <Stack direction="row" flexWrap="wrap" gap={6}>
          {livestockUnits.map((stock: LivestockWithRelations, index: number) => (
            <StockPreviewCard
              key={stock.id}
              stock={stock}
              index={index}
              onClick={() => setStockFocus(stock)}
              onFocusById={handleFocusById}
            />
          ))}
        </Stack>
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