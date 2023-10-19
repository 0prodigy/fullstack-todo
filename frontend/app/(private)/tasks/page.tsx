"use client";
import List from "@/app/(private)/tasks/_components/List";
import { TasksProvider, useTaskContext } from "../_context/tasks";
import TodoForm from "./_components/Form";
import { useState } from "react";

function Tasks() {
  const { tasks } = useTaskContext();
  const date = new Date();
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="w-[400px] p-3 ">
      <div className="w-full bg-orange-900 text-white rounded-3xl ">
        <div className="pt-8 pb-2 px-5">
          <div className="main-action flex justify-center font-semibold">
            <p>{date.toDateString().slice(4, -5)}</p>
          </div>
          <div className="flex justify-between items-center py-5">
            <div>
              <h3 className="font-bold text-xl">Today</h3>
              <p className="text-sm text-[#ecececbe] text-start">
                {tasks.length} tasks
              </p>
            </div>
            <div>
              <button
                onClick={() => setOpenForm(!openForm)}
                className="py-4 px-7 text-[#ff9000] flex gap-1 bg-white border-none rounded-2xl font-semibold text-sm"
              >
                {openForm ? (
                  <span>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11 6L21 6.00072M11 12L21 12.0007M11 18L21 18.0007M3 11.9444L4.53846 13.5L8 10M3 5.94444L4.53846 7.5L8 4M4.5 18H4.51M5 18C5 18.2761 4.77614 18.5 4.5 18.5C4.22386 18.5 4 18.2761 4 18C4 17.7239 4.22386 17.5 4.5 17.5C4.77614 17.5 5 17.7239 5 18Z"
                          stroke="#ff9103"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                ) : (
                  <span>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                          stroke="#ff9103"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                          stroke="#ff9103"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                )}{" "}
                {openForm ? <span>Tasks</span> : <span>Add New</span>}
              </button>
            </div>
          </div>
        </div>
        {openForm ? (
          <TodoForm onFormSubmit={() => setOpenForm(false)} />
        ) : (
          <List tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
}
