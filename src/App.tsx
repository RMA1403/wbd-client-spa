import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component imports
import SidebarLayout from "./components/layouts/SidebarLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PodcastPage from "./pages/podcast";
import EpisodePage from "./pages/episode"
import QueuePage from "./pages/queue";
import NotFoundPage from "./pages/not-found";
import axios from "axios";
import LibraryPage from "./pages/library";
import PlaylistPage from "./pages/playlist"

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
              element: <SearchPage/>,
            },
            {
              path: "/library",
              element: <LibraryPage/>,
            },
            {
              path: "/podcast/:podcastId",
              element: <PodcastPage/>,
            },
            {
              path: "/episode/:episodeId",
              element: <EpisodePage/>,
            },
            { path: "/queue",
              element: <QueuePage />,
              loader: userQueueLoader,
            },
            {
              path: "/playlist/:idPlaylist",
              element: <PlaylistPage/>,
            }
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
