import type { ITaskRepository } from '../../repositories/task.repository.js'

export class DeleteTaskUseCase {
    private readonly repository: ITaskRepository

    constructor(repository: ITaskRepository) {
        this.repository = repository
    }

    async execute(id: string) {
        return await this.repository.delete(id)
    }
}
