import { ITaskRepository } from '@/domain/repositories/task.repository.js'
import { Task } from '@/domain/entities/task.js'
import { TypeOrmClient } from '../database/typeorm.client.js'
import { TaskSchema } from '../models/task.schema.js'

export class TypeOrmTaskRepository implements ITaskRepository {
    private get repo() {
        return TypeOrmClient.getRepository(TaskSchema)
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.repo.find()
        return tasks.map((item: TaskSchema) => this.mapperToEntity(item))
    }

    async findById(id: string): Promise<Task | null> {
        const task = await this.repo.findOneBy({ id })
        return this.mapperToEntity(task)
    }

    async create(task: Task): Promise<Task> {
        const newTask = this.repo.create({
            title: task.getTitle(),
            completed: task.isCompleted(),
        })

        await this.repo.save(newTask)

        return this.mapperToEntity(newTask)
    }

    async update(id: string, task: Task): Promise<Task> {
        const findTask = await this.repo.findOneByOrFail({ id })
        Object.assign(findTask, { ...task })
        const updated = await this.repo.save(findTask)
        return this.mapperToEntity(updated)
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete({ id })
    }

    private mapperToEntity(data: TaskSchema): Task | null {
        if (!data) {
            return null
        }

        return new Task(data.title, data.completed, data.id)
    }
}
