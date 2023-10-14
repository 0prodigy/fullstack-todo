"use client";
import List from "@/components/tasks/List";
import { TasksProvider, useTaskContext } from "../_context/tasks";

function Tasks() {
  const { tasks, createTask } = useTaskContext();

  return (
    <div className="min-w-[600px] p-6 flex flex-col align-middle justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
      <div className="w-[500px]">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <form action="#" onSubmit={createTask}>
            <div className="flex flex-col mt-4">
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Title"
                  required
                  name="task"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description"
                  required
                  name="description"
                />
              </div>
              <div>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  name="status"
                >
                  <option value="TODO">TODO</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELED">CANCELED</option>
                </select>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <List tasks={tasks} />
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
