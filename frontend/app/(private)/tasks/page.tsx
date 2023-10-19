"use client";
import List from "@/app/(private)/tasks/_components/List";
import { TasksProvider, useTaskContext } from "../_context/tasks";
import TodoForm from "./_components/Form";

function Tasks() {
  const { tasks } = useTaskContext();
  const date = new Date();
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
              <button className="py-4 px-7 text-[#ff9000] flex gap-1 bg-white border-none rounded-2xl font-semibold text-sm">
                <span>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                        stroke="#ff9103"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                        stroke="#ff9103"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>{" "}
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>
        <List tasks={tasks} />
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <TasksProvider>
      <Tasks />
      <TodoForm />
    </TasksProvider>
  );
}
