import { Task, TaskStatus } from "@/@types/tasks";

export function TaskItem({
  task,
  onStatusChange,
  onRemove,
}: {
  task: Task;
  onStatusChange: (status: TaskStatus, task: Task) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <div className="status font-bold text-sm -rotate-90 py-3">Backlog</div>
        <div className="py-3 relative">
          {task.status.toLowerCase() == "backlog" ? (
            <span
              onClick={() => onStatusChange("PENDING" as TaskStatus, task)}
              className="cursor-pointer"
            >
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
                    d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                    stroke="#ff9103"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          ) : (
            <input
              checked={task.status.toLowerCase() == "completed"}
              onChange={() =>
                onStatusChange(
                  task.status.toLowerCase() == "completed"
                    ? ("PENDING" as TaskStatus)
                    : "COMPLETED",
                  task
                )
              }
              type="checkbox"
              className="w-5 h-5 relative border rounded-md checked:accent-orange-900 after:content-[''] after:absolute after:-bottom-1 after:-right-1 after:bg-orange-900 after:p-1.5 after:rounded-lg"
            />
          )}
        </div>
        <div className="py-3 pl-2 text-start border-r min-w-[70%]">
          <h4 className="text-black align-top font-semibold">{task?.title}</h4>
          <p className="text-[#d4d3d8] text-md">{task.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="cursor-pointer">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24.00 24.00"
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
                  d="M12 9V13L14.5 15.5"
                  stroke="#ff9103"
                  strokeWidth="1.488"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M3.5 4.5L7.50002 2"
                  stroke="#ff9103"
                  strokeWidth="1.488"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M20.5 4.5L16.5 2"
                  stroke="#ff9103"
                  strokeWidth="1.488"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M7.5 5.20404C8.82378 4.43827 10.3607 4 12 4C16.9706 4 21 8.02944 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 11.3607 3.43827 9.82378 4.20404 8.5"
                  stroke="#ff9103"
                  strokeWidth="1.488"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          </span>

          <span onClick={() => onRemove(task.id)} className="cursor-pointer">
            <svg
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
                  d="M10 12V17"
                  stroke="#ff9103"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M14 12V17"
                  stroke="#ff9103"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M4 7H20"
                  stroke="#ff9103"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="#ff9103"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#ff9103"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
