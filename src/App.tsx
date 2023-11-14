import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/layouts/SidebarLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import HomePage from "./pages/home";
import QueuePage from "./pages/queue";
import ProfilePage from "./pages/profile";
import axios from "axios";

export default function App(): JSX.Element {
  const userQueueLoader = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REST_URL}/queue`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.queue;
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      window.location.replace("http://localhost:8080/public/login");
    }
  };

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
              loader: userQueueLoader,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
              
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
