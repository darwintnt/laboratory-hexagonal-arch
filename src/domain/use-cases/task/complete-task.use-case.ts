import type { ITaskRepository } from "../../repositories/task.repository.js";

export class CompleteTaskUseCase {
  private readonly repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    task.complete();

    return await this.repository.update(task);
  }
}
