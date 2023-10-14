"use client";

import { Task } from "@/@types/tasks";
import { useState } from "react";
import { TaskItem } from "./Item";
import { BASE_URL } from "@/constant";
import { nextLocalStorage } from "@/utils/utils";

export default function List({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState("all");
  const handleStatusChange = (status: string, task: Task) => {
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
        alert("Task updated successfully");
      })
      .catch((e) => alert(e));
  };

  const handleRemove = (id: number) => {
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
        alert("Task removed successfully");
      })
      .catch((e) => alert(e));
  };
  return (
    <div>
      <div className="flex justify-between mb-4 gap-4 max-w-[300px]">
        {/* add dropdown to filter task based on status */}
        {["all", "TODO", "COMPLETED", "CANCELED"].map((status) => (
          <div
            key={status}
            className={`cursor-pointer center relative inline-block select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white ${
              filter == status ? "bg-primary-600" : "bg-gray-900"
            } hover:bg-primary-900`}
            onClick={() => setFilter(status)}
          >
            {status}
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between mb-4 gap-4">
        {tasks
          .filter((task) => (filter == "all" ? true : task.status == filter))
          .map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onStatusChange={handleStatusChange}
              onRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
}
