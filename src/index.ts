import 'reflect-metadata'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
// import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository.js'
import { TaskController } from './application/controllers/task.controller.js'
import { validateBody } from './application/middleware/validate.middleware.js'
import { CreateTaskDto } from './application/dtos/create-task.dto.js'
import { UpdateTaskDto } from './application/dtos/update-task.dto.js'
import { TypeOrmTaskRepository } from './infrastructure/repositories/typeorm-task.repository.js'
import { TypeOrmClient } from './infrastructure/database/typeorm.client.js'

dotenv.config()

async function bootstrap() {
    await TypeOrmClient.connect()

    const port = process.env.PORT ?? 3000
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())

    const repository = new TypeOrmTaskRepository()
    const taskController = new TaskController(repository)

    app.get('/tasks/:id', (req, res) => taskController.getById(req, res))
    app.get('/tasks', (req, res) => taskController.getAll(req, res))
    app.post('/tasks', validateBody(CreateTaskDto), (req, res) =>
        taskController.create(req, res)
    )
    app.put('/tasks/:id', validateBody(UpdateTaskDto), (req, res) =>
        taskController.update(req, res)
    )
    app.patch('/tasks/:id/complete', (req, res) =>
        taskController.complete(req, res)
    )
    app.delete('/tasks/:id', (req, res) => taskController.delete(req, res))

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
}

bootstrap()
