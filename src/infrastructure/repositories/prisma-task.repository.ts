import { ITaskRepository } from "@/domain/repositories/task.repository.js";
import { Task } from "@/domain/entities/task.js";
import {
  PrismaClient,
  TaskSchema,
} from "../database/generated/prisma/client.js";
import { getPrismaClient } from "../database/prisma.client.js";

export class PrismaTaskRepository implements ITaskRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = getPrismaClient();
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.repository.taskSchema.findMany();
    return tasks.map((item: TaskSchema) => this.mapperToEntity(item));
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.repository.taskSchema.findUnique({ where: { id } });
    return this.mapperToEntity(task);
  }

  async create(task: Task): Promise<Task> {
    const newTask = await this.repository.taskSchema.create({
      data: {
        title: task.getTitle(),
        completed: task.isCompleted(),
      },
    });

    return this.mapperToEntity(newTask);
  }

  async update(task: Task): Promise<Task> {
    const newTask = await this.repository.taskSchema.update({
      where: { id: task.getId() },
      data: {
        title: task.getTitle(),
        completed: task.isCompleted(),
      },
    });

    return this.mapperToEntity(newTask);
  }

  async delete(id: string): Promise<void> {
    await this.repository.taskSchema.delete({ where: { id } });
  }

  private mapperToEntity(data: TaskSchema): Task {
    return new Task(data.title, data.completed, data.id);
  }
}
