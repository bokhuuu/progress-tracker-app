import React from "react";

const TaskCard = ({ task }) => {
  const statusColors = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };

  const statusColor = statusColors[task.status.name] || "";

  return (
    <div
      className="w-full h-[217px] rounded-[15px] p-[10px] mb-[30px]"
      style={{ border: `1px solid ${statusColor}` }}
    >
      <p>{task.name}</p>
      <p>{task.description}</p>
      <p>{task.department.name}</p>
      <p>{task.due_date}</p>
      <p>{task.priority.name}</p>
      <img src={task.priority.icon} alt="priority icon" />

      <img
        src={task.employee.avatar}
        className="w-[50px] h-[50px] rounded-full"
      />
    </div>
  );
};

export default TaskCard;
