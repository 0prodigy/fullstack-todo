export type TaskStatus = "BACKLOG" | "COMPLETED" | "CANCELED";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  reminder?: string;
}
