"use client";
import { Task } from "@/@types/tasks";
import List from "@/components/tasks/List";
import { BASE_URL } from "@/constant";
import { nextLocalStorage } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = nextLocalStorage()?.getItem("auth_token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          alert("Task created successfully");
        });
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
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
  }, []);
  return (
    <div className="min-w-[600px] bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg flex flex-col item-middle justify-center">
      <div className="w-[500px]">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <form action="#" onSubmit={handleSubmit}>
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
