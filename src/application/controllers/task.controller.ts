import { Request, Response } from 'express'
import { ITaskRepository } from '@/domain/repositories/task.repository.js'
import { CompleteTaskUseCase } from '@/domain/use-cases/task/complete-task.use-case.js'
import { DeleteTaskUseCase } from '@/domain/use-cases/task/delete-task.use-case.js'
import { GetTaskUseCase } from '@/domain/use-cases/task/get-task.use-case.js'
import { GetTasksUseCase } from '@/domain/use-cases/task/get-tasks.use-case.js'
import { UpdateTaskUseCase } from '@/domain/use-cases/task/update-task.use-case.js'
import { CreateTaskUseCase } from '@/domain/use-cases/task/create-task.use-case.js'

export class TaskController {
    private readonly getTasksUseCase: GetTasksUseCase
    private readonly getTaskUseCase: GetTaskUseCase
    private readonly createTaskUseCase: CreateTaskUseCase
    private readonly updateTaskUseCase: UpdateTaskUseCase
    private readonly deleteTaskUseCase: DeleteTaskUseCase
    private readonly completeTaskUseCase: CompleteTaskUseCase

    constructor(repository: ITaskRepository) {
        this.getTasksUseCase = new GetTasksUseCase(repository)
        this.getTaskUseCase = new GetTaskUseCase(repository)
        this.createTaskUseCase = new CreateTaskUseCase(repository)
        this.updateTaskUseCase = new UpdateTaskUseCase(repository)
        this.deleteTaskUseCase = new DeleteTaskUseCase(repository)
        this.completeTaskUseCase = new CompleteTaskUseCase(repository)
    }

    async getAll(req: Request, res: Response) {
        try {
            const tasks = await this.getTasksUseCase.execute()
            res.json(tasks)
        } catch (error: any) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            const task = await this.getTaskUseCase.execute(id)
            res.json(task)
        } catch (error: any) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const tasks = await this.createTaskUseCase.execute(req.body.title)
            res.status(201).json(tasks)
        } catch (error: any) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const task = await this.updateTaskUseCase.execute(
                req.params.id as string,
                req.body
            )
            res.json(task)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            await this.deleteTaskUseCase.execute(id)
            res.status(204).send()
        } catch (error: any) {
            res.status(404).json({ message: error.message })
        }
    }

    async complete(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            const tasks = await this.completeTaskUseCase.execute(id)
            res.json(tasks)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}
