export class Task {
  private id?: string;
  private title: string;
  private completed: boolean;

  constructor(title: string, completed: boolean = false, id?: string) {
    if (!title) {
      throw new Error("the title is required");
    }
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  getId(): string | null {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  complete(): void {
    if (this.completed) {
      throw new Error("The task is completed");
    }

    this.completed = true;
  }
}
