import type { ITaskRepository } from "../../repositories/task.repository.js";

export class GetTaskUseCase {
  private readonly repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    return await this.repository.findById(id);
  }
}
