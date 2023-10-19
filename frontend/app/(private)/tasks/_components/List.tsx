"use client";

import { Task } from "@/@types/tasks";
import { useState } from "react";
import { TaskItem } from "./Item";
import { useTaskContext } from "@/app/(private)/_context/tasks";

export default function List({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState("all");
  const { removeTask, updateTaskStatus } = useTaskContext();

  return (
    <div className="bg-white rounded-tl-[60px] text-[#ececeb] py-10 overflow-y-scroll h-[500px] card-body">
      <div className="filter-container">
        <div className="flex justify-between mb-4 gap-4 w-full pl-4 overflow-x-hidden">
          {["backlog", "pending", "completed"].map((status) => (
            <div
              key={status}
              onClick={() => setFilter(status)}
              className={`p-3 cursor-pointer font-semibold center relative inline-block select-none whitespace-nowrap rounded-lg  align-baseline font-sans text-xs uppercase leading-none text-white ${
                status.toLowerCase() == filter
                  ? "bg-orange-900"
                  : "text-[#ff9100] border border-[#ff9100] border-dashed"
              } hover:bg-orange-900 hover:text-white`}
            >
              {status}
            </div>
          ))}
          <div
            onClick={() => setFilter("")}
            className="text-center cursor-pointer bg-orange-900 text-white flex items-center rounded-lg mr-2 p-3"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff">
              <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="items-container">
        {tasks
          .filter((task) =>
            filter == ""
              ? true
              : task.status.toLowerCase() == filter.toLowerCase()
          )
          .map((task, i) => (
            <TaskItem
              key={i}
              task={task}
              onStatusChange={updateTaskStatus}
              onRemove={removeTask}
            />
          ))}
      </div>
    </div>
  );
}
