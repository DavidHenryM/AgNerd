"use server"

import { prisma } from "@lib/prisma"
import { CommercialClass, LivestockUnit, Sex, StockClass, User, VisualIdColour, WeighMethod } from "@generated/client"
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
    sire: {
      select: {
        id: true,
        name: true,
        angusTechId: true,
      },
    },
    dam: {
      select: {
        id: true,
        name: true,
        angusTechId: true,
      },
    },
    birthed: {
      select: {
        id: true,
        name: true,
        angusTechId: true,
        birthDate: true,
      },
    },
    sired: {
      select: {
        id: true,
        name: true,
        angusTechId: true,
        birthDate: true,
      },
    },
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

export async function createLivestockUnit(data: {
  name?: string | null
  angusTechId?: string | null
  nlisId?: string | null
  birthDate: Date
  sex: Sex
  desexed: boolean
  class: StockClass
  commercialClass?: CommercialClass | null
  sireId?: string | null
  damId?: string | null
  farmId?: string | null
  visualIdLine1?: string | null
  visualIdLine2?: string | null
  visualIdLine3?: string | null
  visualIdBackgroundColour?: VisualIdColour | null
  visualIdTextColour?: VisualIdColour | null
}) {
  const onFarmHistory = data.farmId
    ? {
      create: {
        farmId: data.farmId,
        startDate: data.birthDate,
      },
    }
    : undefined

  const response = await prisma.livestockUnit.create({
    data: {
      name: data.name ?? null,
      angusTechId: data.angusTechId ?? null,
      nlisId: data.nlisId ?? null,
      birthDate: data.birthDate,
      sex: data.sex,
      desexed: data.desexed,
      class: data.class,
      commercialClass: data.commercialClass ?? null,
      sireId: data.sireId ?? null,
      damId: data.damId ?? null,
      onFarmHistory: onFarmHistory,
      visualIdLine1: data.visualIdLine1 ?? null,
      visualIdLine2: data.visualIdLine2 ?? null,
      visualIdLine3: data.visualIdLine3 ?? null,
      visualIdBackgroundColour: data.visualIdBackgroundColour ?? null,
      visualIdTextColour: data.visualIdTextColour ?? null,
    }
  })
  console.log("Response from creating livestock unit: ", response)
  return response
}

export async function updateLivestockUnit(
  id: string,
  data: {
    name?: string | null
    angusTechId?: string | null
    nlisId?: string | null
    birthDate?: Date
    sex?: Sex
    desexed?: boolean
    class?: StockClass
    commercialClass?: CommercialClass | null
    sireId?: string | null
    damId?: string | null
    visualIdLine1?: string | null
    visualIdLine2?: string | null
    visualIdLine3?: string | null
    visualIdBackgroundColour?: VisualIdColour | null
    visualIdTextColour?: VisualIdColour | null
    comment?: string | null
    purchasePrice?: number | null
    purchaseDate?: Date | null
    drySheepEquivalent?: number
    active?: boolean
  }
) {
  const updateData: Record<string, unknown> = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.angusTechId !== undefined) updateData.angusTechId = data.angusTechId
  if (data.nlisId !== undefined) updateData.nlisId = data.nlisId
  if (data.birthDate !== undefined) updateData.birthDate = data.birthDate
  if (data.sex !== undefined) updateData.sex = data.sex
  if (data.desexed !== undefined) updateData.desexed = data.desexed
  if (data.class !== undefined) updateData.class = data.class
  if (data.commercialClass !== undefined) updateData.commercialClass = data.commercialClass
  if (data.sireId !== undefined) updateData.sireId = data.sireId
  if (data.damId !== undefined) updateData.damId = data.damId
  if (data.visualIdLine1 !== undefined) updateData.visualIdLine1 = data.visualIdLine1
  if (data.visualIdLine2 !== undefined) updateData.visualIdLine2 = data.visualIdLine2
  if (data.visualIdLine3 !== undefined) updateData.visualIdLine3 = data.visualIdLine3
  if (data.visualIdBackgroundColour !== undefined) updateData.visualIdBackgroundColour = data.visualIdBackgroundColour
  if (data.visualIdTextColour !== undefined) updateData.visualIdTextColour = data.visualIdTextColour
  if (data.comment !== undefined) updateData.comment = data.comment
  if (data.purchasePrice !== undefined) updateData.purchasePrice = data.purchasePrice
  if (data.purchaseDate !== undefined) updateData.purchaseDate = data.purchaseDate
  if (data.drySheepEquivalent !== undefined) updateData.drySheepEquivalent = data.drySheepEquivalent
  if (data.active !== undefined) updateData.active = data.active

  const response = await prisma.livestockUnit.update({
    where: { id },
    data: updateData,
  })
  console.log("Response from updating livestock unit: ", response)
  return response
}

export async function getOnFarmStatus(livestockUnitId: string, farmId: string) {
  return prisma.onFarm.findFirst({
    where: {
      livestockUnitId: livestockUnitId,
      farmId: farmId,
      endDate: null,
    },
    orderBy: {
      startDate: "desc",
    },
  })
}

export async function setOnFarmStatus(data: {
  livestockUnitId: string
  farmId: string
  onFarm: boolean
  startDate?: Date
}) {
  if (data.onFarm) {
    const existing = await prisma.onFarm.findFirst({
      where: {
        livestockUnitId: data.livestockUnitId,
        farmId: data.farmId,
        endDate: null,
      },
      orderBy: {
        startDate: "desc",
      },
    })
    if (existing) {
      return prisma.onFarm.update({
        where: { id: existing.id },
        data: {
          startDate: data.startDate ?? existing.startDate,
          endDate: null,
        },
      })
    }
    return prisma.onFarm.create({
      data: {
        livestockUnitId: data.livestockUnitId,
        farmId: data.farmId,
        startDate: data.startDate ?? new Date(),
      },
    })
  }

  return prisma.onFarm.updateMany({
    where: {
      livestockUnitId: data.livestockUnitId,
      farmId: data.farmId,
      endDate: null,
    },
    data: {
      endDate: new Date(),
    },
  })
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

export type FarmListItem = {
  id: string
  name: string
  slug: string | null
  businessName: string | null
}

export async function getUserFarms(userId: string): Promise<FarmListItem[]> {
  const farms = await prisma.farm.findMany({
    where: {
      users: {
        some: {
          id: { equals: userId },
        },
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      businessName: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  return farms
}

export async function getFarmBySlug(slug: string) {
  const farm = await prisma.farm.findFirst({
    where: {
      slug: { equals: slug },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      businessName: true,
      pic: true,
      abn: true,
      acn: true,
      areaHa: true,
    },
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


  