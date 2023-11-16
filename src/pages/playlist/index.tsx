import { useEffect, useState } from "react";
import PodcastCard, { cardProps } from "../../components/PodcastCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlaylistPage(): JSX.Element {
  const { playlistId } = useParams();
  // component states
  const [playlistTitle, setPlaylistTitle] = useState<string>("");
  const [playlistPodcast, setPlaylistPodcast] = useState<cardProps[]>([]);

  useEffect(() => {
    (async () => {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const [resPlaylistTitle, resPlaylistPodcast] = await Promise.all([
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/playlist/title/${playlistId}`
        ),
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/playlist/${playlistId}`
        ),
      ]);

      setPlaylistTitle(resPlaylistTitle.data.playlist);
      setPlaylistPodcast(resPlaylistPodcast.data.podcasts);
    })();
  }, [playlistId]);

  return (
    <section className="px-6 pb-10 xl:px-8 xl:pb-20 mt-8">
        <div className="flex justify-between">
          <h2 className="h1 md:max-lg:text-xl lg:max-xl:text-2xl">{playlistTitle? playlistTitle : "Playlist Title"}</h2>
        </div>
      
        <div className="mt-4 -ml-1.5 px-1.5 py-2 xl:mt-4 flex flex-wrap align-start gap-20">
          { playlistPodcast?.map((data: cardProps, idx: number ) => (
            < PodcastCard {...data} key={idx}/>
          )) }
        </div>

    </section>
  );
}
