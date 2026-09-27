"use server"

import { prisma } from "@lib/prisma"
import { requireSession, getSessionFarmId } from "@lib/auth-server"
import { Role } from "better-auth/plugins"
import { Address, FeedSourceType, GateState, PaddockWorkType } from "@generated/client"
import { OrganizationCreateInput } from "../generated/prisma/models"
import { calculatePolygonAreaHa, centroidFromPoints, type CoordinatePoint } from "./farmUtils"

export async function setLivestockUnitInactive(livestockUnitId: string) {
  const session = await requireSession()
  const farmId = await getSessionFarmId(session.user.id)

  const owned = await prisma.livestockUnit.findFirst({
    where: { id: livestockUnitId, onFarmHistory: { some: { farmId } } },
    select: { id: true },
  })
  if (!owned) {
    throw new Error("Not found")
  }

  return await prisma.livestockUnit.update({
      where: { id: livestockUnitId },
      data: { active: false }
  })
}

export async function setLivestockUnitActive(livestockUnitId: string) {
  const session = await requireSession()
  const farmId = await getSessionFarmId(session.user.id)

  const owned = await prisma.livestockUnit.findFirst({
    where: { id: livestockUnitId, onFarmHistory: { some: { farmId } } },
    select: { id: true },
  })
  if (!owned) {
    throw new Error("Not found")
  }

  return await prisma.livestockUnit.update({
      where: { id: livestockUnitId },
      data: { active: true }
  })
}

export async function updateUserName(email: string, firstName: string, lastName: string){
  const session = await requireSession()
  if (session.user.email !== email) {
    throw new Error("Unauthorized")
  }
  const updatedUser = await prisma.user.update({
    where: {
      email: email
    },
    data: {
      firstName: firstName,
      lastName: lastName
    }
  })
  return updatedUser
}

function hasCompleteAddress(address: Partial<Address> | null | undefined): boolean {
  if (!address) return false
  const requiredFields = ['streetNumber', 'streetName', 'suburb', 'state', 'postCode', 'country']
  return requiredFields.every(field => address[field as keyof Address] !== undefined && address[field as keyof Address] !== null)
}
  
export async function updateUser(id: string, data: Partial<{
  email: string
  name: string
  firstName: string | null
  lastName: string | null
  role: Role
  mobileNumber: string | null
  landlineNumber: string | null
  billingAddress: Partial<Address> | null
  shippingAddress: Partial<Address> | null
}>) {
  const session = await requireSession()
  if (session.user.id !== id) {
    throw new Error("Unauthorized")
  }
  const updateData: Record<string, unknown> = {
    email: data.email,
    name: data.name,
    firstName: data.firstName ?? null,
    lastName: data.lastName ?? null,
    role: data.role,
    mobileNumber: data.mobileNumber ?? null,
    landlineNumber: data.landlineNumber ?? null
  }
  if (hasCompleteAddress(data.billingAddress)) {
    updateData.billingAddress = {
      upsert: {
        update: data.billingAddress,
        create: data.billingAddress
      }
    }
  }
  if (hasCompleteAddress(data.shippingAddress)) {
    updateData.shippingAddress = {
      upsert: {
        update: data.shippingAddress,
        create: data.shippingAddress
      }
    }
  }
  const user = await prisma.user.update({
    where: { id },
    data: updateData
  })
  return user
}

export async function deleteUser(id: string){
  const session = await requireSession()
  if (session.user.id !== id) {
    throw new Error("Unauthorized")
  }
  const user = await prisma.user.delete({
    where: { id }
  })
  return user
}

export async function createOrganisation(organisationData: OrganizationCreateInput){
  await requireSession()
  const createdOrganisation = await prisma.organization.create({
    data: organisationData
  })
  return createdOrganisation
}

export async function updateFarmBoundary(
  farmId: string,
  boundaryPoints: CoordinatePoint[],
  areaHa?: number | null
) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)
  if (sessionFarmId !== farmId) {
    throw new Error("Unauthorized")
  }

  const locationCentre = centroidFromPoints(boundaryPoints)

  return prisma.farm.update({
    where: { id: farmId },
    data: {
      areaHa: areaHa ?? calculatePolygonAreaHa(boundaryPoints),
      boundaryPoints: {
        deleteMany: {},
        create: boundaryPoints.map((point, index) => ({
          latitude: point.latitude,
          longitude: point.longitude,
          sortOrder: point.sortOrder ?? index,
        })),
      },
      locationCentre: locationCentre
        ? {
            upsert: {
              update: {
                latitude: locationCentre.latitude,
                longitude: locationCentre.longitude,
              },
              create: {
                latitude: locationCentre.latitude,
                longitude: locationCentre.longitude,
              },
            },
          }
        : undefined,
    },
  })
}

export async function createPaddock(data: {
  farmId: string
  name: string
  description?: string | null
  areaHa?: number | null
  boundaryPoints: CoordinatePoint[]
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)
  if (sessionFarmId !== data.farmId) {
    throw new Error("Unauthorized")
  }

  const derivedAreaHa = calculatePolygonAreaHa(data.boundaryPoints)

  return prisma.paddock.create({
    data: {
      farmId: data.farmId,
      name: data.name,
      description: data.description ?? null,
      areaHa: data.areaHa ?? derivedAreaHa,
      polygon: {
        create: data.boundaryPoints.map((point, index) => ({
          latitude: point.latitude,
          longitude: point.longitude,
          sortOrder: point.sortOrder ?? index,
        })),
      },
    },
  })
}

export async function createGate(data: {
  farmId: string
  fromPaddockId: string
  toPaddockId: string
  latitude: number
  longitude: number
  name?: string | null
  notes?: string | null
  initialState: GateState
  recordedAt: Date
  note?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)
  if (sessionFarmId !== data.farmId) {
    throw new Error("Unauthorized")
  }

  return prisma.gate.create({
    data: {
      farmId: data.farmId,
      fromPaddockId: data.fromPaddockId,
      toPaddockId: data.toPaddockId,
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name ?? null,
      notes: data.notes ?? null,
      stateChanges: {
        create: {
          state: data.initialState,
          recordedAt: data.recordedAt,
          note: data.note ?? null,
        },
      },
    },
  })
}

export async function updateGateState(data: {
  gateId: string
  state: GateState
  recordedAt: Date
  note?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)

  const gate = await prisma.gate.findFirst({
    where: { id: data.gateId, farmId: sessionFarmId },
    select: { id: true },
  })
  if (!gate) {
    throw new Error("Not found")
  }

  return prisma.gateStateChange.create({
    data: {
      gateId: data.gateId,
      state: data.state,
      recordedAt: data.recordedAt,
      note: data.note ?? null,
    },
  })
}

export async function createMob(data: {
  farmId: string
  name: string
  comment?: string | null
  livestockUnitIds: string[]
  startedAt: Date
  note?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)
  if (sessionFarmId !== data.farmId) {
    throw new Error("Unauthorized")
  }

  return prisma.$transaction(async (transaction) => {
    const mob = await transaction.mob.create({
      data: {
        farmId: data.farmId,
        name: data.name,
        comment: data.comment ?? null,
      },
    })

    if (data.livestockUnitIds.length > 0) {
      await transaction.mobMembership.updateMany({
        where: {
          livestockUnitId: { in: data.livestockUnitIds },
          endDate: null,
        },
        data: {
          endDate: data.startedAt,
        },
      })

      await transaction.livestockUnit.updateMany({
        where: {
          id: { in: data.livestockUnitIds },
        },
        data: {
          mobRef: mob.id,
        },
      })

      await transaction.mobMembership.createMany({
        data: data.livestockUnitIds.map((livestockUnitId) => ({
          mobId: mob.id,
          livestockUnitId,
          startDate: data.startedAt,
          note: data.note ?? null,
        })),
      })
    }

    return mob
  })
}

export async function recordMobMovement(data: {
  mobId: string
  fromPaddockId?: string | null
  toPaddockId: string
  movedAt: Date
  note?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)

  const mob = await prisma.mob.findFirst({
    where: { id: data.mobId, farmId: sessionFarmId },
    select: { id: true },
  })
  if (!mob) {
    throw new Error("Not found")
  }

  return prisma.mobMovement.create({
    data: {
      mobId: data.mobId,
      fromPaddockId: data.fromPaddockId ?? null,
      toPaddockId: data.toPaddockId,
      movedAt: data.movedAt,
      note: data.note ?? null,
    },
  })
}

export async function createPaddockFeedRecord(data: {
  paddockId: string
  recordedAt: Date
  feedKgDmPerHa: number
  sourceType: FeedSourceType
  estimateMethod?: string | null
  confidencePct?: number | null
  note?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)

  const paddock = await prisma.paddock.findFirst({
    where: { id: data.paddockId, farmId: sessionFarmId },
    select: { id: true },
  })
  if (!paddock) {
    throw new Error("Not found")
  }

  return prisma.paddockFeedRecord.create({
    data: {
      paddockId: data.paddockId,
      recordedAt: data.recordedAt,
      feedKgDmPerHa: data.feedKgDmPerHa,
      sourceType: data.sourceType,
      estimateMethod: data.estimateMethod ?? null,
      confidencePct: data.confidencePct ?? null,
      note: data.note ?? null,
    },
  })
}

export async function createPaddockWorkEvent(data: {
  paddockId: string
  workType: PaddockWorkType
  startedAt: Date
  completedAt?: Date | null
  productName?: string | null
  rate?: number | null
  rateUnit?: string | null
  totalQuantity?: number | null
  totalQuantityUnit?: string | null
  cost?: number | null
  operatorName?: string | null
  notes?: string | null
}) {
  const session = await requireSession()
  const sessionFarmId = await getSessionFarmId(session.user.id)

  const paddock = await prisma.paddock.findFirst({
    where: { id: data.paddockId, farmId: sessionFarmId },
    select: { id: true },
  })
  if (!paddock) {
    throw new Error("Not found")
  }

  return prisma.paddockWorkEvent.create({
    data: {
      paddockId: data.paddockId,
      workType: data.workType,
      startedAt: data.startedAt,
      completedAt: data.completedAt ?? null,
      productName: data.productName ?? null,
      rate: data.rate ?? null,
      rateUnit: data.rateUnit ?? null,
      totalQuantity: data.totalQuantity ?? null,
      totalQuantityUnit: data.totalQuantityUnit ?? null,
      cost: data.cost ?? null,
      operatorName: data.operatorName ?? null,
      notes: data.notes ?? null,
    },
  })
}