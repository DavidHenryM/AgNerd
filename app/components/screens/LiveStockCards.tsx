import { Skeleton, Stack } from "@mui/material"
import { LivestockUnit } from '@generated/browser'
import { useRef, useState, useEffect } from "react"
import { BeastView } from "../../beastView"
import StockPreviewCard from "@components/cards/StockPreview"
import { getLivestock } from "@lib/queries"
import { LivestockUnitWhereInput } from "@/app/generated/prisma/models"


export default function LivestockCardsScreen(props: {whereFilter: Partial<LivestockUnitWhereInput>}) { 
  const livestockUnits = useRef<LivestockUnit[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockUnit>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getLivestock(props.whereFilter)
      .then((livestock: LivestockUnit[]) => {
        livestockUnits.current = livestock
        
      }).finally(()=>setLoading(false))
  },[props])

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
      return (
        <Stack direction="row" flexWrap="wrap" gap={6}>
          {livestockUnits.current.map((stock: LivestockUnit, index: number) => (
            <StockPreviewCard key={stock.id} stock={stock} index={index} onClick={() => setStockFocus(stock)}/>
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