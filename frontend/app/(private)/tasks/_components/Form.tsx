import { useTaskContext } from "../../_context/tasks";
import { TaskStatus } from "@/@types/tasks";

function TodoForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const { createTask } = useTaskContext();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, reminder } = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      reminder: { value: string };
    };
    const task = {
      title: title.value,
      description: description.value,
      reminder: new Date(reminder.value).toISOString(),
      status: "BACKLOG" as TaskStatus,
    };

    createTask(task);
    onFormSubmit();
  };

  return (
    <div className="bg-white rounded-tl-[60px] text-black py-10 overflow-y-scroll h-[500px] form-body px-10 ">
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <div className="text-center text-lg font-bold">
          <h3>Create new task</h3>
        </div>
        <div>
          <input
            type="text"
            name="title"
            required
            className="border-b-2 w-full py-2 text-lg font-semibold focus:outline-none focus:border-orange-900 invalid:border-red-500"
            placeholder="title"
          />
        </div>
        <div>
          <textarea
            cols={30}
            rows={4}
            required
            name="description"
            className="border-b-2 w-full py-2 text-lg font-semibold focus:outline-none focus:border-orange-900 invalid:border-red-500"
            placeholder="description"
          ></textarea>
        </div>
        <div>
          <label htmlFor="reminder" className="font-bold text-[#9ca3af]">
            set reminder
          </label>
          <input
            name="reminder"
            type="datetime-local"
            className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-orange-900 focus:border-orange-900 block w-full pl-10 p-2.5"
            placeholder="Select date"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-4 bg-orange-900 text-white font-bold rounded-xl mt-5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
