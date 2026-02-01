import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import  LoadingBar  from "@app/loading";
import { LiveStockCountStat, NumberStat } from "../Stats";

export default function StockingRateCard(
  props: {
    livestockCount: number,
    loadingLivestockCount: boolean,
    totalActiveDSE: number,
    loadingTotalActiveDSE: boolean
  }
){
  return (
    <Card>
      <CardHeader>Stocking Rate</CardHeader>
      <CardContent>
        <Stack gap={"6"}>
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
        </Stack>
      </CardContent>
    </Card>
  )
}