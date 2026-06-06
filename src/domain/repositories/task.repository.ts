import type { Task } from "../entities/task.js";

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
