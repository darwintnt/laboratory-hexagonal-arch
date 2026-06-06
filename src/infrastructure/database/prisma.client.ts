import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

let instance: PrismaClient | null = null

export function getPrismaClient(): PrismaClient {
    if (!instance) {
        const connectionString = `${process.env.DATABASE_URL}`

        const adapter = new PrismaPg({ connectionString })
        instance = new PrismaClient({ adapter })
    }
    return instance
}

export async function disconnectPrisma(): Promise<void> {
    await instance?.$disconnect()
    instance = null
}
