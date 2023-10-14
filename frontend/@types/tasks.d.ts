export type TaskStatus = "TODO" | "COMPLETED" | "CANCELED";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
