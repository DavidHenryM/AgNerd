import { HStack, For, VStack, Stack, Flex } from "@chakra-ui/react"
import { LivestockUnit } from "@prisma/client"
import { useRef, useState, useEffect } from "react"
import { BeastView } from "../../beastView"
import StockPreviewCard, { StockPreviewCardSkeleton } from "../cards/StockPreview"
import Loading from "../../loading"
import { getLivestock } from "../../queries"
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@/components/ui/skeleton"

export default function LivestockCardsScreen(props: {whereFilter: any}) { 
  let livestockUnits = useRef<LivestockUnit[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockUnit>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getLivestock(props.whereFilter)
      .then((livestock: LivestockUnit[]) => {
        livestockUnits.current = livestock
        
      }).finally(()=>setLoading(false))
  },[])

  if (loading){
    // return (<Loading/>)
    return (
      <HStack wrap={"wrap"} gap="6">
        <For each={Array.from(Array(12).keys())}>
          {
            (value: number)=>(<StockPreviewCardSkeleton key={`stockPreviewCardSkeleton_${value}`}/>)
          }
        </For>
      </HStack>
    )
  } else {
    if (!stockFocus){
      return (
        <HStack wrap={"wrap"}>
          <For each={livestockUnits.current}>
            {
              (stock: LivestockUnit, index: number)=>(
                <StockPreviewCard key={stock.id} stock={stock} index={index} onClick={() => setStockFocus(stock)}/>
              )
            }
          </For>
        </HStack>
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