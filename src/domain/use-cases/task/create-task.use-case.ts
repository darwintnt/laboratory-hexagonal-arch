import { Task } from "../../entities/task.js";
import type { ITaskRepository } from "../../repositories/task.repository.js";

export class CreateTaskUseCase {
  private readonly repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(title: string) {
    const task = new Task(title, false);
    return await this.repository.create(task);
  }
}
