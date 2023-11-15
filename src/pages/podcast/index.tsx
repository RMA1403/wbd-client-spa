import { useEffect, useState } from "react";
import Episode, { episodeProps } from "../../components/EpisodeList";
import PodcastHeader, { headerProps } from "../../components/PodcastHeader";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PodcastPage(): JSX.Element {
  const { podcastId } = useParams();
  // component states
  const [episodes, setEpisodes] = useState<episodeProps[]>([]);
  const [podcastHeader, setPodcastHeader] = useState<headerProps>();

  useEffect(() => {
    (async () => {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const [resPodcastHeader, resEpisodes] = await Promise.all([
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/podcast/${podcastId}`
        ),
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/podcast/episode/${podcastId}`
        ),
      ]);

    //   const resPodcastHeader = await axiosInstance.get(
    //     `${import.meta.env.VITE_REST_URL}/podcast/${podcastId}`
    //   );
      setPodcastHeader(resPodcastHeader.data.podcast);

    //   const resEpisodes = await axiosInstance.get(
    //     `${import.meta.env.VITE_REST_URL}/podcast/episode/${podcastId}`
    //   );
      setEpisodes(resEpisodes.data.episodes);
    })();
  }, [podcastId]);

  return (
    <div className="ml-[100px]">
      {podcastHeader ? (
        <PodcastHeader {...podcastHeader} />
      ) : (
        <h1 className="h1"></h1>
      )}
      <div>
        <hr className="h-px mt-[30px] ml-[-100px] bg-black bg-opacity-40" />
      </div>

      <section className="mt-[20px] overflow-y-scroll h-[60vh] mb-[60px]">
        {episodes?.map((episode: episodeProps, idx: number) => (
          <Episode
            key={idx}
            title={episode.title}
            description={episode.description}
            url_thumbnail={episode.url_thumbnail}
            order={idx + 1}
          />
        ))}
      </section>
    </div>
  );
}
