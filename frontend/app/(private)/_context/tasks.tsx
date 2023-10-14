"use client";
import { Task } from "@/@types/tasks";
import { BASE_URL } from "@/constant";
import { nextLocalStorage } from "@/utils/utils";
import { createContext, useContext, useEffect, useState } from "react";

export interface TasksContextValue {
  tasks: Task[];
  createTask: (e: React.FormEvent<HTMLFormElement>) => void;
  getTasks: () => void;
  removeTask: (id: number) => void;
  updateTaskStatus: (status: string, task: Task) => void;
}

export const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  createTask: () => {},
  getTasks: () => {},
  removeTask: () => {},
  updateTaskStatus: () => {},
});

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = nextLocalStorage()?.getItem("auth_token");

  const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.task.value;
    const description = e.currentTarget.description.value;
    const status = e.currentTarget.status.value;

    try {
      await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          setTasks([...tasks, res]);
          alert("Task created successfully");
        });
    } catch (e) {
      alert(e);
    }
  };

  const updateTaskStatus = (status: string, task: Task) => {
    fetch(`${BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...task, status: status }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nextLocalStorage()?.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        setTasks((prevTask) =>
          prevTask.map((t) => (t.id === task.id ? res : t))
        );
        alert("Task updated successfully");
      })
      .catch((e) => alert(e));
  };

  const removeTask = (id: number) => {
    fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${nextLocalStorage()?.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        setTasks((prevTask) => prevTask.filter((t) => t.id !== id));
        alert("Task removed successfully");
      })
      .catch((e) => alert(e));
  };

  const getTasks = () => {
    fetch(`${BASE_URL}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
          setTasks([]);
        } else {
          setTasks(res);
        }
      })
      .catch((e) => setTasks([]));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTasks, removeTask, updateTaskStatus }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTaskContext = () => useContext(TasksContext);

export default TasksContext;
