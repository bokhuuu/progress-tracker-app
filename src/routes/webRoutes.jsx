import TaskList from "../pages/TaskList";
import TaskShow from "../pages/TaskShow";
import TaskCreate from "../pages/TaskCreate";

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
];
