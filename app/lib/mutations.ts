"use server"

import { prisma } from "@lib/prisma"
import { Role } from "better-auth/plugins"
import { Address } from "@generated/client"
import { OrganizationCreateInput } from "../generated/prisma/models"

export async function setLivestockUnitInactive(livestockUnitId: string) {
  return await prisma.livestockUnit.update({
      where: { id: livestockUnitId },
      data: { active: false }
  })
}

export async function setLivestockUnitActive(livestockUnitId: string) {
  return await prisma.livestockUnit.update({
      where: { id: livestockUnitId },
      data: { active: true }
  })
}

export async function updateUserName(email: string, firstName: string, lastName: string){
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
  const user = await prisma.user.delete({
    where: { id }
  })
  return user
}

export async function createOrganisation(organisationData: OrganizationCreateInput){
  const createdOrganisation = await prisma.organization.create({
    data: organisationData
  })
  return createdOrganisation
}