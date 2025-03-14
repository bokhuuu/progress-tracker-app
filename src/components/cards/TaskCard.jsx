import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="mb-4 bg-blue-200">
      <p>{task.name}</p>
      <p>{task.description}</p>
      <p>{task.department.name}</p>
    </div>
  );
};

export default TaskCard;
