import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DummyPage from "./pages/dummy";
import SidebarLayout from "./components/SidebarLayout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/dummy",
      element: <DummyPage />,
    },
    {
      path: "/home",
      element: <SidebarLayout />
    }
  ]);

  return <RouterProvider router={router} />
}
