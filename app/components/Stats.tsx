import { 
  StatLabel, 
  StatRoot, 
  StatValueText,
  StatValueUnit,
  StatHelpText,
  StatDownTrend,
  StatUpTrend
} from "@/components/ui/stat"
import { WeightRecord } from "@prisma/client"
import { daysBetween } from "../utils/utils"
import { HStack } from "@chakra-ui/react"

export function WeightStats(props: {weights: WeightRecord[]}){
  if (props.weights.length > 0){
    let statArrow: "increase" | "decrease" | undefined
    if (props.weights.length > 1){
      const statChange = Number(props.weights[props.weights.length-1].weight) - Number(props.weights[props.weights.length-2].weight)
      const statChangeString = String(statChange) + "kg"
      const lastWeightDate = props.weights[props.weights.length-1].dateMeasured
      const weighDeltaDays = daysBetween(props.weights[props.weights.length-1].dateMeasured, props.weights[props.weights.length-2].dateMeasured)
      return (
        <WeightKgStat 
          label={`Last weight ${lastWeightDate.toLocaleDateString()}`} 
          value={props.weights[0].weight} 
          trend={ 
            {
              direction: statChange >= 0 ? "up":"down",
              label: `since ${String(lastWeightDate.toLocaleDateString())}`,
              value: statChangeString
            }
          }>
        </WeightKgStat>
      )
    } else {
      return (
        <WeightKgStat 
          label={"Live weight"} 
          value={props.weights[0].weight}
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
        style={"unit"} 
        unit={undefined} 
        trend={
          {
            direction: props.currentCount >= props.priorCount ? "up" : "down",
            label: props.trendLabel,
            value: String(props.priorCount - props.currentCount),
            unit: "count"
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
        style={"unit"} 
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

function NumberStat(
  props: {
    label: string, 
    value: number, 
    style: "unit" | "currency" | undefined, 
    unit: string | undefined,
    trend: {
      direction: "up" | "down" | undefined,
      value: string | undefined,
      unit: string | undefined,
      label: string | undefined
    } | undefined
  }
  ){
    let StatTrend = function (){
      return (<></>)
    }
    if (props.trend){ 
      if(props.trend.direction == "up" && props.trend.value){
        StatTrend = function (){
          return (
            <StatUpTrend>
              {props.trend?.value}
            </StatUpTrend>
          )
        }
      } else if (props.trend.direction == "down" && props.trend.value){
        StatTrend = function (){
          return (
            <StatDownTrend>
              {props.trend?.value}
            </StatDownTrend>
          )
        }
      }
    }
    return (
      <StatRoot>
        <StatLabel>{props.label}</StatLabel>
        <HStack>
        <StatValueText
          value={props.value}
          formatOptions={{style: props.style}}>
        </StatValueText>
          {props.unit ? <StatValueUnit>{props.unit}</StatValueUnit>:<></>}
          </HStack>
        <StatTrend/>
        {props.trend?.label ? <StatLabel>{props.trend.label}</StatLabel> : <></>}
      </StatRoot>
    )
}