import type { Task } from "../../../domain/entities/task.js";
import type { ITaskRepository } from "../../../domain/repositories/task.repository.js";

export class PrismaTaskRepository implements ITaskRepository {
  private repository: any;

  async findAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }

  async create(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }

  async update(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
