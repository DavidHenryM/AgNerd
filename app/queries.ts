'use server'

import { WeighMethod } from "@prisma/client"
import prisma from './lib/prisma'
import { IoContrastOutline } from "react-icons/io5"

export async function getLivestock(whereFilter: string): Promise<any> {
  const parsedWhereFilter = JSON.parse(whereFilter)
  const livestockActive = await prisma.livestockUnit.findMany(
    {
      where: parsedWhereFilter,
      select: {
        id: true,
        name: true,
        class: true,
        sex: true,
        desexed: true,
        visualIdLine1: true,
        visualIdLine2: true,
        visualIdLine3: true,
        visualIdBackgroundColour: true,
        visualIdTextColour: true,
        nlisId: true,
        birthDate: true,
        angusTechId: true,
        active: true,
        weights: true,
        drySheepEquivalent: true,
        commercialClass: true
      }
    })

  return livestockActive 
}

export async function getLivestockUnit(id: string): Promise<any> {
  const livestockUnit = await prisma.livestockUnit.findFirst(
    {
      where: {id: {equals: id}},
      select: {
        id: true,
        name: true,
        class: true,
        sex: true,
        desexed: true,
        visualIdLine1: true,
        visualIdLine2: true,
        visualIdLine3: true,
        visualIdBackgroundColour: true,
        visualIdTextColour: true,
        nlisId: true,
        birthDate: true,
        angusTechId: true,
        active: true,
        weights: true,
        drySheepEquivalent: true,
        commercialClass: true
      }
    })
  console.log('livestock unit retrieved: ',livestockUnit)
  return livestockUnit
}

export async function addWeightRecord(
  livestockUnitId: string, 
  weight: number, 
  weighMethod: WeighMethod,
  dateMeasured: string | Date | undefined) 
  {

  const response = await prisma.weightRecord.create({
    data: { 
      weight: weight, 
      livestockUnitId: livestockUnitId,
      method: weighMethod,
      dateMeasured: dateMeasured

    }
  })
  console.log("Response from writing weight record: ",response)
  return response
}

  
export async function setLivestockUnitInactive(livestockUnitId: string){
  const response = await prisma.livestockUnit.update({
    where: {
        id: livestockUnitId,
    },
    data: {
      active: false
    }
  })
  return response
}

export async function setLivestockUnitActive(
  livestockUnitId: string){
    const response = await prisma.livestockUnit.update({
      where: {
          id: livestockUnitId,
      },
      data: {
        active: false
      }
    })
    return response
  }

export async function getActiveLivestockCount(): Promise<number> {
  const livestockActiveCount = await prisma.livestockUnit.count(
    {
      where: {active: {equals: true}},
    }
  )
  return livestockActiveCount
}
