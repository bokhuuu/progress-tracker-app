import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TaskCard from "../components/cards/TaskCard";
import {
  fetchTasks,
  fetchDepartments,
  fetchEmployees,
  fetchPriorities,
  fetchStatuses,
} from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    fetchTasks(token).then((fetchedTasks) => setTasks(fetchedTasks));

    fetchDepartments(token).then((fetchedDepartments) =>
      setDepartments(fetchedDepartments)
    );

    fetchEmployees(token).then((fetchedEmployees) =>
      setEmployees(fetchedEmployees)
    );

    fetchPriorities(token).then((fetchedPriorities) =>
      setPriorities(fetchedPriorities)
    );

    fetchStatuses(token).then((fetchedStatuses) =>
      setStatuses(fetchedStatuses)
    );
  }, []);

  return (
    <Layout pageTitle="Tasks Page">
      <div>
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div>
        <h2>Departments</h2>
        {departments.map((department) => (
          <p key={department.id}>{department.name}</p>
        ))}
      </div>

      <div>
        <h2>Employees</h2>
        {employees.map((employee) => (
          <p key={employee.id}>{employee.name}</p>
        ))}
      </div>

      <div>
        <h2>Priorities</h2>
        {priorities.map((priority) => (
          <p key={priority.id}>{priority.name}</p>
        ))}
      </div>

      <div>
        <h2>Statuses</h2>
        {statuses.map((status) => (
          <p key={status.id}>{status.name}</p>
        ))}
      </div>
    </Layout>
  );
};

export default TaskList;
