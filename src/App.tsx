import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import DummyPage from "./pages/dummy";
import SidebarLayout from "./components/SidebarLayout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SidebarLayout />,
      children: [
        {
          path: "/",
          element: <h1>Hello home</h1>
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
