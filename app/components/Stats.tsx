import { WeightRecord } from "@generated/browser"
import { sortWeightsByDate } from "../utils/utils"
import { Box, Stack, Typography } from "@mui/material"
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses, lineElementClasses } from '@mui/x-charts/LineChart';
import { chartsAxisHighlightClasses } from '@mui/x-charts/ChartsAxisHighlight';

export function WeightStats(props: {weights: WeightRecord[]}){
  if (props.weights.length > 0){
    const sortedWeights = sortWeightsByDate(props.weights)
    const latestWeight = sortedWeights[sortedWeights.length-1]
    const lastWeightDate = latestWeight.dateMeasured
    if (props.weights.length > 1){
      return (
        <Box
          role="button"
          aria-label="Showing weekly downloads"
          tabIndex={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="column" width={300}>
            <Typography
              sx={{
                color: 'rgb(117, 117, 117)',
                fontWeight: 500,
                fontSize: '0.9rem',
                pt: 1,
              }}
            >
              {`Last weighed ${lastWeightDate.toLocaleDateString()}`}
            </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ borderBottom: 'solid 2px rgba(137, 86, 255, 0.2)' }}
        >
          <Typography variant="caption">
            {latestWeight.weight.toString() + ' kg'}
          </Typography>

        <SparkLineChart 
          showHighlight={true}
          showTooltip={true}
          area={true}
          xAxis={{
            scaleType: 'time',
            data: sortedWeights.flatMap((w: WeightRecord) => w.dateMeasured),
            valueFormatter: (value) => value.toLocaleDateString(),
          }}
          yAxis={{
            data: sortedWeights.flatMap((w: WeightRecord) => w.weight),
            min: 0,
            valueFormatter: (value: number) => `${value} kg`,
          }}
          
          data={sortedWeights.flatMap((w: WeightRecord) => w.weight)}
          height={50}
          sx={{
            [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
            [`& .${lineElementClasses.root}`]: { strokeWidth: 3 },
            [`& .${chartsAxisHighlightClasses.root}`]: {
              stroke: 'rgb(137, 86, 255)',
              strokeDasharray: 'none',
              strokeWidth: 2,
            },
          }}
          slotProps={{
            lineHighlight: { r: 4 }, // Reduce the radius of the axis highlight.
          }}
        />
        </Stack>
      </Stack>
    </Box>

      )
    } else {
      return (
        <WeightKgStat 
          label={`Weighed ${lastWeightDate.toLocaleDateString()}`} 
          value={latestWeight.weight} 
          trend={undefined}
        >
        </WeightKgStat>
      )
    }
  } 
}

export function LiveStockCountStat(
  props: {
    currentCount: number,
    priorCount: number | undefined,
    trendLabel: string | undefined
  }
){
  return (
    <CountStat 
      label={"Livestock"} 
      currentCount={props.currentCount} 
      priorCount={props.priorCount} 
      trendLabel={props.trendLabel}
    >
    </CountStat>
  )
}

export function CountStat(
  props: {
    label: string,
    currentCount: number,
    priorCount: number | undefined,
    trendLabel: string | undefined
  }
){
  if (props.priorCount){
    return (
      <NumberStat 
        label={props.label} 
        value={props.currentCount} 
        style={undefined} 
        currency={undefined}
        unit={undefined} 
        trend={
          {
            direction: props.currentCount >= props.priorCount ? "up" : "down",
            label: props.trendLabel,
            value: String(props.priorCount - props.currentCount),
            unit: undefined
          }
        }
      >
      </NumberStat>
    )
  } else {
    return (
      <NumberStat 
        label={props.label} 
        value={props.currentCount} 
        style={undefined}
        currency={undefined}
        unit={undefined} 
        trend={undefined}
      >
      </NumberStat>
    )
  }
}

export function WeightKgStat(
  props: {
    label: string, 
    value: number, 
    trend: {
      direction: "up" | "down" | undefined,
      value: string | undefined,
      label: string | undefined
    } | undefined
  }
){
  return (
    <NumberStat 
      label={props.label} 
      value={props.value} 
      style={undefined} 
      currency={undefined}
      unit={"kg"} 
      trend={
        {
          direction: props.trend?.direction,
          value: props.trend?.value,
          unit: "kg",
          label: props.trend?.label
        }
      }
    >
    </NumberStat>
  )
}

export function CurrencyStat(
  props: {
    label: string, 
    value: number, 
    trend: {
      direction: "up" | "down" | undefined,
      value: string | undefined,
      label: string | undefined
    } | undefined
  }
){
  return (
    <NumberStat 
      label={props.label} 
      value={props.value} 
      style={"currency"} 
      currency={"AUD"}
      unit={undefined} 
      trend={
        {
          direction: props.trend?.direction,
          value: props.trend?.value,
          unit: "AUD",
          label: props.trend?.label
        }
      }
    >
    </NumberStat>
  )
}

export function NumberStat( props: {
    label: string, 
    value: number, 
    style: "unit" | "currency" | undefined, 
    currency: string | undefined,
    unit: string | undefined,
    trend: {
      direction: "up" | "down" | undefined,
      value: string | undefined,
      unit: string | undefined,
      label: string | undefined
    } | undefined}){
    
  return (
    <Box
      role="button"
      aria-label="Showing weekly downloads"
      tabIndex={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" width={300}>
        <Typography
          sx={{
            color: 'rgb(117, 117, 117)',
            fontWeight: 500,
            fontSize: '0.9rem',
            pt: 1,
          }}
        >

          {props.label}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ borderBottom: 'solid 2px rgba(137, 86, 255, 0.2)' }}
        >
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
            {props.value.toString()}
          </Typography>

        {/* <SparkLineChart data={} height={100} /> */}
        </Stack>
      </Stack>
    </Box>
  );
}


//   props: {
//     label: string, 
//     value: number, 
//     style: "unit" | "currency" | undefined, 
//     currency: string | undefined,
//     unit: string | undefined,
//     trend: {
//       direction: "up" | "down" | undefined,
//       value: string | undefined,
//       unit: string | undefined,
//       label: string | undefined
//     } | undefined
//   }
//   ){
//     let StatTrend = function (){
//       return (<></>)
//     }
//     if (props.trend){ 
//       if(props.trend.direction == "up" && props.trend.value){
//         StatTrend = function (){
//           return (
//             <StatUpTrend>
//               {props.trend?.value}
//             </StatUpTrend>
//           )
//         }
//       } else if (props.trend.direction == "down" && props.trend.value){
//         StatTrend = function (){
//           return (
//             <StatDownTrend>
//               {props.trend?.value}
//             </StatDownTrend>
//           )
//         }
//       }
//     }
//     return (
//       <StatRoot>
//       <StatLabel>{props.label}</StatLabel>
//       <VStack>
//         <HStack>
//           <StatValueText
//             value={props.value}
//             formatOptions={{style: props.style, currency: props.currency }}>
//           </StatValueText>
//           {props.unit ? <StatValueUnit>{props.unit}</StatValueUnit>:<></>}
//         </HStack>
//         <HStack>
//           <StatTrend/>
//           {props.trend?.label ? <StatLabel>{props.trend.label}</StatLabel> : <></>}
//         </HStack>
//       </VStack>
//     </StatRoot>
//     )
// }