import TaskList from "../pages/TaskListPage";
import TaskShow from "../pages/TaskShowPage";
import TaskCreate from "../pages/TaskCreatePage";

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
