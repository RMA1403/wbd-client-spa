import { useEffect, useState } from "react";
import Episode, { episodeProps } from "../../components/EpisodeList";
import PodcastHeader, { headerProps } from "../../components/PodcastHeader";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function PodcastPage(): JSX.Element {
  const { podcastId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // component states
  const [episodes, setEpisodes] = useState<episodeProps[]>([]);
  const [podcastHeader, setPodcastHeader] = useState<headerProps>();

  useEffect(() => {
    (async () => {
      if (searchParams.get("premium") === null) {
        navigate(`/podcast/${podcastId}?premium=true`);
      }

      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const resPodcast = await axiosInstance.get(
        `${
          import.meta.env.VITE_REST_URL
        }/podcast/${podcastId}?premium=${searchParams.get("premium")}`
      );
      if (!resPodcast.data.podcast) {
        navigate(`/`);
      }
      setPodcastHeader(resPodcast.data.podcast);
      setEpisodes(resPodcast.data.podcast.PremiumEpisodes);
    })();
  }, [podcastId, searchParams, navigate]);

  return (
    <div className="ml-[32px] xl:ml-[100px]">
      {podcastHeader ? (
        <PodcastHeader
          {...podcastHeader}
          premium={searchParams.get("premium") == "true"}
        />
      ) : (
        <h1 className="h1"></h1>
      )}
      <div>
        <hr className="h-px mt-[30px] ml-[-100px] bg-black bg-opacity-40" />
      </div>

      <section className="mt-[20px] overflow-y-scroll h-[60vh] pb-[60px] ml-[-16px] xl:ml-0">
        {episodes?.map((episode: episodeProps, idx: number) => (
          <Episode
            key={idx}
            id_episode={episode.id_episode}
            title={episode.title}
            description={episode.description}
            url_thumbnail={episode.url_thumbnail}
            order={idx + 1}
            premium={searchParams.get("premium") == "true"}
          />
        ))}
      </section>
    </div>
  );
}
