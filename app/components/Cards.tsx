import { Card, Flex } from "@chakra-ui/react";
import { LoadingBar } from "../loading";
import { LiveStockCountStat, NumberStat } from "./Stats";

export function StockingRateCard(
  props: {
    livestockCount: number,
    loadingLivestockCount: boolean,
    totalActiveDSE: number,
    loadingTotalActiveDSE: boolean
  }
){
  return (
    <Card.Root variant={"elevated"}>
      <Card.Header>Stocking Rate</Card.Header>
      <Card.Body>
        <Flex gap={"6"}>
          {
            props.loadingLivestockCount ? 
            <LoadingBar/> : 
            <LiveStockCountStat currentCount={props.livestockCount} priorCount={10} trendLabel={undefined}/>
          }
          {
            props.loadingTotalActiveDSE ? 
            <LoadingBar/> : 
            <NumberStat 
              label={"Equivalent"} 
              value={props.totalActiveDSE} 
              style={undefined} 
              currency={undefined} 
              unit={"DSE"} 
              trend={undefined}/>
          }
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}