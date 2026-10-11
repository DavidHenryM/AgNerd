import { PrismaClient } from '@app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { databaseURL } from './deployment'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaPg({
  connectionString: databaseURL(),
})

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }