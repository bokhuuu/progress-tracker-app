import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { webRoutes } from "./routes/webRoutes";

const router = createBrowserRouter(webRoutes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
