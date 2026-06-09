import { DataSource, Repository } from 'typeorm'
import { TaskSchema } from '../models/task.schema.js'

export class TypeOrmClient {
    private static instance: DataSource
    private static initPromise: Promise<DataSource> | null = null
    private static readonly repositoryMap = new Map<string, Repository<any>>()

    private constructor() {}

    static getInstance(): DataSource {
        if (!TypeOrmClient.instance) {
            TypeOrmClient.instance = new DataSource({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [TaskSchema],
                synchronize: false,
            })
        }

        return TypeOrmClient.instance
    }

    static async connect(): Promise<DataSource> {
        if (TypeOrmClient.instance?.isInitialized) {
            return TypeOrmClient.instance
        }

        if (!TypeOrmClient.initPromise) {
            TypeOrmClient.initPromise = TypeOrmClient.getInstance().initialize()
        }

        return TypeOrmClient.initPromise
    }

    static getRepository<T extends object>(entity: new () => T): Repository<T> {
        const entityName = entity.name
        if (!TypeOrmClient.repositoryMap.has(entityName)) {
            TypeOrmClient.repositoryMap.set(
                entityName,
                TypeOrmClient.getInstance().getRepository(entity)
            )
        }
        return TypeOrmClient.repositoryMap.get(entityName) as Repository<T>
    }
}
