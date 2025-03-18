import React from "react";

const TaskCard = ({ task }) => {
  const statusColors = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };

  const priorityColors = {
    დაბალი: "border-[#08A508] text-[#08A508]",
    საშუალო: "border-[#FFBE0B] text-[#FFBE0B]",
    მაღალი: "border-[#FA4D4D] text-[#FA4D4D]",
  };

  const departmentColors = {
    "ადმინისტრაციის დეპარტამენტი": "bg-[#FF66A8]",
    "ადამიანური რესურსების დეპარტამენტი": "bg-[#FFD86D]",
    "ფინანსების დეპარტამენტი": "bg-[#89B6FF]",
    "გაყიდვები და მარკეტინგის დეპარტამენტი": "bg-[#FF66A8]",
    "ლოჯოსტიკის დეპარტამენტი": "bg-[#FD9A6A]",
    "ტექნოლოგიების დეპარტამენტი": "bg-[#89B6FF]",
    "მედიის დეპარტამენტი": "bg-[#FF66A8]",
  };

  const statusColor = statusColors[task.status.name] || "";
  const priorityClass = priorityColors[task.priority.name] || "";
  const departmentClass = departmentColors[task.department.name] || "";

  const formatDate = (dateString) => {
    const months = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()].substring(0, 3);
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div
      className="w-full h-[217px] rounded-[15px] p-[15px] mb-[30px] bg-white flex flex-col justify-between"
      style={{ border: `1px solid ${statusColor}` }}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center gap-1 mr-4 px-2 py-1 border rounded-sm text-sm ${priorityClass}`}
          >
            <img src={task.priority.icon} alt="priority icon" />
            <span>{task.priority.name}</span>
          </div>

          <div
            className={`flex items-center justify-center w-[88px] h-[24px] rounded-[15px] text-white font-bold text-xs px-2 py-1 ${departmentClass}`}
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

export default TaskCard;
