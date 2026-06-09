import { randomUUID } from 'node:crypto'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('tasks')
export class TaskSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string = randomUUID()

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'boolean' })
    completed: boolean

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Date = new Date()
}
