import {
  getDepartmentColors,
  getStatusColors,
  getpPriorityColors,
} from "../../helpers/colors";
import { formatDate } from "../../helpers/dates";

const TaskListCard = ({ task }) => {
  return (
    <div
      className="w-[381px] h-[217px] rounded-[15px] p-[15px] mb-[30px] bg-white flex flex-col justify-between"
      style={{
        border: `1px solid
        ${getStatusColors(task.status.name)}`,
      }}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center gap-1 mr-4 px-2 py-1 border rounded-sm text-sm 
              ${getpPriorityColors(task.priority.name)}`}
          >
            <img src={task.priority.icon} alt="priority icon" />
            <span>{task.priority.name}</span>
          </div>

          <div
            className={`flex items-center justify-center w-[88px] h-[24px] rounded-[15px] text-white font-bold text-xs px-2 py-1 
              ${getDepartmentColors(task.department.name)}`}
          >
            <span>
              {task.department.name.length > 6
                ? task.department.name.substring(0, 6) + "..."
                : department.name}
            </span>
          </div>
        </div>

        <span className="text-[#212529] font-[400] text-[12px] leading-[100%] tracking-[0%]">
          {formatDate(task.due_date)}
        </span>
      </div>

      <div className="mb-5 px-[15px]">
        <h3 className="mb-3 font-bold">{task.name}</h3>
        <p>{task.description}</p>
      </div>

      <div className="flex justify-between ">
        <img
          src={task.employee.avatar}
          className="w-[31px] h-[31px] rounded-full"
        />

        <div className="flex items-center gap-1 justify-center">
          <img src="/assets/comment.png" className="w-[24px] h-[22px}" />
          <span>{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
