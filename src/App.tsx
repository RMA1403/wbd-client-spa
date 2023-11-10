import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/layouts/SidebarLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";

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
              element: <SearchPage/>,
            },
            {
              path: "/library",
              element: <h1>Hello library</h1>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
