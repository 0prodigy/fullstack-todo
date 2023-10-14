import { Task } from "@/@types/tasks";

export function TaskItem({
  task,
  onStatusChange,
  onRemove,
}: {
  task: Task;
  onStatusChange: (status: string, task: Task) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex mb-4 items-center gap-4">
      <div className="w-full">
        <h4
          className={`w-full font-bold text-grey-darkest ${
            task.status == "COMPLETED" && "line-through"
          }`}
        >
          {task.title}
        </h4>
        <p>{task.description}</p>
      </div>
      <div className="w-[300px]">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          name="status"
          onChange={(e) => onStatusChange(e.target.value, task)}
        >
          <option value="TODO">TODO</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <button
        onClick={() => onRemove(task.id)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-[90px] p-2.5 hover:text-white hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
