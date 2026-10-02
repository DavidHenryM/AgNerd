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
      <CardHeader title={"Stocking Rate"} />
      <CardContent>
        <Stack sx={{ gap: "6px" }}>
          {
            props.loadingLivestockCount ? 
            <LoadingBar/> : 
            <LiveStockCountStat currentCount={props.livestockCount} priorCount={10} trendLabel={undefined}/>
          }
          {
            props.loadingTotalActiveDSE ? 
            <LoadingBar/> : 
            <NumberStat 
              label={"Equivalent DSE"} 
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