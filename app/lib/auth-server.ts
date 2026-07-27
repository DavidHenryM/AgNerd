"use server"

import { auth } from "@lib/auth"
import { headers } from "next/headers"
import { prisma } from "@lib/prisma"

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}

export async function getSessionFarmId(userId: string): Promise<string> {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { farmId: true },
  })
  if (!user) {
    throw new Error("User not found")
  }
  return user.farmId
}
