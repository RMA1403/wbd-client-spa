import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DummyPage from "./pages/dummy";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/dummy",
      element: <DummyPage />,
    },
  ]);

  return <RouterProvider router={router} />
}
