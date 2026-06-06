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
    throw new Error("Method not implemented.");
  }

  async create(task: Task): Promise<Task> {
    console.log(task);

    const newTask = await this.repository.taskSchema.create({
      data: {
        title: task.getTitle(),
        completed: task.isCompleted(),
      },
    });

    return this.mapperToEntity(newTask);
  }

  async update(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private mapperToEntity(data: TaskSchema): Task {
    return new Task(data.title, data.completed, data.id);
  }
}
