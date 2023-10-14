// create a react context for tasks

import { Task } from "@/@types/tasks";
import { createContext } from "react";

export interface TasksContextValue {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  setTasks: () => {},
});

export const TasksConsumer = TasksContext.Consumer;

export default TasksContext;
