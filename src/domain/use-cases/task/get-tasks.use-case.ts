import type { ITaskRepository } from '../../repositories/task.repository.js'

export class GetTasksUseCase {
    private readonly repository: ITaskRepository

    constructor(repository: ITaskRepository) {
        this.repository = repository
    }

    async execute() {
        return await this.repository.findAll()
    }
}
