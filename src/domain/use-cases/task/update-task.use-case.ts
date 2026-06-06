import type { Task } from "../../entities/task.js";
import type { ITaskRepository } from "../../repositories/task.repository.js";

export class UpdateTaskUseCase {
  private readonly repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(id: string, task: Task) {
    return await this.repository.update(id, task);
  }
}
