import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/layouts/SidebarLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import HomePage from "./pages/home";
import QueuePage from "./pages/queue";

export default function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SidebarLayout />,
      children: [
        {
          path: "/",
          element: <ProfileLayout />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/search",
              element: <h1>Hello search</h1>,
            },
            {
              path: "/library",
              element: <h1>Hello library</h1>,
            },
            {
              path: "/queue",
              element: <QueuePage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
