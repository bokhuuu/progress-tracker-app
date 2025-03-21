import TaskList from "../views/TaskList";
import TaskShow from "../views/TaskShow";
import TaskCreate from "../views/TaskCreate";
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
    path: "*",
    element: <Navigate to="/" />,
  },
];
