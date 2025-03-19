import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTaskById, fetchStatuses } from "../services/api";
import { getDepartmentColors, getpPriorityColors } from "../helpers/colors";
import { formatDateWithDayAbbr } from "../helpers/dates";
import CommentsSection from "../components/CommentsSection";

const TaskShowPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    fetchTaskById(token, id)
      .then((data) => setTask(data))
      .catch((error) => console.error(error));

    fetchStatuses(token)
      .then((data) => setStatuses(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: {
        ...prevTask.status,
        name: newStatus,
      },
    }));
  };

  if (!task)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          <div className="w-[715px] h-[239px] top-[140px] left-[121px] mt-[50px]">
            <div className="flex justify-between items-center mb-5 cl">
              <div className="flex items-center justify-center">
                <div
                  className={`flex items-center gap-1 mr-4 px-2 py-1 border rounded-sm text-sm ${getpPriorityColors(
                    task.priority.name
                  )}`}
                >
                  <img src={task.priority.icon} alt="priority icon" />
                  <span>{task.priority.name}</span>
                </div>

                <div
                  className={`flex items-center justify-center w-[88px] h-[24px] rounded-[15px] text-white font-bold text-xs px-2 py-1 ${getDepartmentColors(
                    task.department.name
                  )}`}
                >
                  <span>
                    {task.department.name.length > 6
                      ? task.department.name.substring(0, 6) + "..."
                      : task.department.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="font-semibold text-[34px] leading-[100%] text-[#212529] mb-7">
                {task.name}
              </h3>
              <p>{task.description}</p>
            </div>
          </div>

          <div className="w-[493px] h-[277px] top-[442px] left-[121px] flex flex-col justify-between mt-7">
            <div className="text-[#2A2A2A] text-[24px] font-bold">
              დავალების დეტალები
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img src="/assets/pie-chart.png" />
                <span>სტატუსი</span>
              </div>
              <select
                value={task.status.name}
                className="w-[259px] h-[45px] rounded-[5px] border-[1px] border-[#CED4DA] p-[10px] text-sm"
                onChange={(e) => {
                  handleStatusChange(e.target.value);
                }}
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img src="/assets/user.png" alt="user" />
                <span>თანამშრონელი</span>
              </div>
              <div className="flex items-start gap-2 mr-5">
                <img
                  src={task.employee.avatar}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div className="flex flex-col ml-1">
                  <span className="font-[300] text-[11px] leading-[100%] tracking-[0%] text-[#474747]">
                    {task.department.name}
                  </span>
                  <span className="font-[400] text-[14px] text-[#0D0F10] mt-1">
                    {task.employee.name} {task.employee.surname}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mr-[130px]">
              <div className="flex items-center gap-2">
                <img src="/assets/calendar.png" alt="calendar" />
                <span>დედლაინი</span>
              </div>
              <span>{formatDateWithDayAbbr(task.due_date)}</span>
            </div>
          </div>
        </div>

        <div className="w-[741px] max-h-[975px] top-[199px] left-[1059px] rounded-[10px] border-[#DDD2FF] bg-[#F8F3FEA6] border-[3px] mt-[95px] p-[45px] overflow-y-auto">
          <CommentsSection taskId={id} token={token} />
        </div>
      </div>
    </Layout>
  );
};
export default TaskShowPage;
