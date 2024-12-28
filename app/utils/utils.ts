import { LivestockUnit, WeightRecord } from "@prisma/client"

export function getAge(birth: any): {
  ageYears: number,
  ageMonths: number
  yearSuffix: string,
  monthSuffix: string
}{
  const yearMilliseconds = 3.154e+10
  const monthMilliseconds = yearMilliseconds/12.0
  const now = new Date()
  const birthDate = Date.parse(birth)
  const ageMilliseconds = now.valueOf() - birthDate.valueOf()
  const ageMonthsTotal = Math.floor(ageMilliseconds / monthMilliseconds);
  const ageYears = Math.floor(ageMonthsTotal / 12.0)
  const ageMonthsRemainder = Math.floor(ageMonthsTotal % 12)
  let monthSuffix = 'months'
  if (ageMonthsRemainder == 1) {
    monthSuffix = 'month'
  }
  let yearSuffix = 'years'
  if (ageYears == 1) {
    yearSuffix = 'year'
  }
  return { 
    ageYears: ageYears,
    ageMonths: ageMonthsRemainder, 
    yearSuffix: yearSuffix,
    monthSuffix: monthSuffix
  }
}

function treatAsUTC(date: Date): Date {
  let result = new Date(date)
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset())
  return result
}

export function daysBetween(startDate: Date, endDate: Date): number {
  let secondsPerDay = 24 * 60 * 60;
  return Math.floor((treatAsUTC(endDate).getTime() - treatAsUTC(startDate).getTime()) / secondsPerDay)
}


export function parseColour(tagColour: LivestockUnit["visualIdBackgroundColour"] | undefined): string {
  if (tagColour == "SKY_BLUE"){
    return '#03d7fc'
  } else if (tagColour == "YELLOW"){
    return '#fcdf03'
  } else {
    return 'green'
  }

}

export function sortWeightsByDate(weights: WeightRecord[]){
  return weights.sort((a,b) => a.dateMeasured.getTime() - b.dateMeasured.getTime())
}