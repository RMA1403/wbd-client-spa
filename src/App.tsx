import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/SidebarLayout";
import HomePage from "./pages/home";

export default function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SidebarLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/search",
          element: <h1>Hello search</h1>
        },
        {
          path: "/library",
          element: <h1>Hello library</h1>
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />
}
