import EpisodeHeader, { headerProps } from "../../components/EpisodeHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function PodcastPage(): JSX.Element {
  const { episodeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [episodeHeader, setEpisodeHeader] = useState<headerProps>();

  useEffect(() => {
    (async () => {
      if (searchParams.get("premium") === null) {
        navigate(`/episode/${episodeId}?premium=true`);
      }

      const resEpisodeHeader = await axios.get(
        `http://localhost:3000/episode/${episodeId}?premium=${searchParams.get(
          "premium"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEpisodeHeader(resEpisodeHeader.data.episode);
    })();
  }, [episodeId, searchParams, navigate]);

  return (
    <div className="ml-[100px]">
      {episodeHeader ? (
        <EpisodeHeader {...episodeHeader} premium={searchParams.get("premium") == "true"} />
      ) : (
        <h1 className="h1"></h1>
      )}
    </div>
  );
}
