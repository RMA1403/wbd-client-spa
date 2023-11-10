import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/layouts/SidebarLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import HomePage from "./pages/home";
import PodcastPage from "./pages/podcast";
import EpisodePage from "./pages/episode"

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
              element: <h1>Hello Library</h1>,
            },
            {
              path: "/podcast",
              element: <PodcastPage/>,
            },
            {
              path: "/episode",
              element: <EpisodePage/>,
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
