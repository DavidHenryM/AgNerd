"use server"

import { prisma } from "@lib/prisma"
import { LivestockUnit, User, WeighMethod } from "@generated/client"
import { LivestockUnitSelect, LivestockUnitWhereInput } from "@generated/models"
import { FarmAndLocation, GetOrganisationsResult } from "@lib/types"

export async function getLivestock(whereFilter: LivestockUnitWhereInput) {
  const select: LivestockUnitSelect = {
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
    commercialClass: true,
    comment: true,
    sireId: true,
    damId: true,
    mobRef: true,
    // pregnancyId: true,
    purchasePrice: true, 
    purchaseDate: true,
  }

  const livestockActive = await prisma.livestockUnit.findMany({where: whereFilter, select: select})
  return livestockActive 
}

export async function getActiveLivestock(): Promise<LivestockUnit[]>{
  return getLivestock({active: {equals: true}})
}

export async function getLivestockUnit(id: string): Promise<LivestockUnit | null> {
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
        commercialClass: true,
        comment: true,
        sireId: true,
        damId: true,
        mobRef: true,
        // pregnancyId: true,
        purchasePrice: true, 
        purchaseDate: true,
      }
    }
  )
  console.log('livestock unit retrieved: ', livestockUnit)
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
  console.log(livestockActiveCount)
  return livestockActiveCount
}

export async function getFarmName(): Promise<string> {
  const farm = await prisma.farm.findFirst()
  if (farm){
    return farm.name
  } else {
    return 'My Farm'
  }
}

export async function getTotalActiveDSE(): Promise<number> {
  const totalActiveDSE = await prisma.livestockUnit.aggregate({
    _sum: {
      drySheepEquivalent: true
    },
    where: {
      active: true
    }
  })
  return totalActiveDSE._sum.drySheepEquivalent ? totalActiveDSE._sum.drySheepEquivalent : 0
}

export async function getUsersFarm(userId: string): Promise<FarmAndLocation | null> {
  const farm = await prisma.farm.findFirst({
    where: {
      users: {
        some: {
          id: {equals: userId}
        }
      },
    },
    include: {
      locationCentre: true
    }
  })

  return farm
}

export async function getUserFromId(userId: string): Promise<User | null>{
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    }
  })

  return user
}

export async function getUserFromEmail(email: string): Promise<User | null>{
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    }
  })

  return user
}


export async function getOrganisations(contactPersonId: string): Promise<GetOrganisationsResult[]> {
  const organisations = prisma.organization.findMany({
    where: {
      contactPersonId: contactPersonId
    },
    select: {
      shippingAddresses: true,
      billingAddresses: true,
      name: true
    }
  })
  return organisations
}


  