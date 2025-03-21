import TaskList from "../views/TaskList";
import TaskShow from "../views/TaskShow";
import TaskCreate from "../views/TaskCreate";
import { EmployeeCreateModal } from "../views/EmployeeCreateModal";
import { Navigate } from "react-router-dom";

export const webRoutes = [
  {
    path: "/",
    element: <TaskList />,
  },
  {
    path: "/task/:id",
    element: <TaskShow />,
  },
  {
    path: "/task/create",
    element: <TaskCreate />,
  },
  {
    path: "/employee/create",
    element: <EmployeeCreateModal />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
