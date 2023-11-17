// Asset imports
import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import { Queue, useQueue, useQueueDispatch } from "../contexts/QueueContext";
import { useNavigate } from "react-router-dom";

export type cardEpsProps = {
  idEpisode: number;
  title: string;
  description: string;
  imageurl: string;
  podcast_title: string;
  premium: boolean;
};

export default function EpisodeCard({
  idEpisode,
  title,
  description,
  imageurl,
  podcast_title,
  premium,
}: cardEpsProps): JSX.Element {
  const urlPrefix = premium
    ? "http://localhost:3000/images/"
    : "http://localhost:8080/app/storage";

  const dispatchQueue = useQueueDispatch();
  const queue = useQueue();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/episode/${idEpisode}?premium=${premium}`);
  };

  const handleAddToQueue = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axiosInstance.delete(`${import.meta.env.VITE_REST_URL}/queue`);

    await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/queue/episode`, {
      idEpisode: idEpisode,
    });

    if (queue.current) {
      await axiosInstance.post(
        `${import.meta.env.VITE_REST_URL}/queue/forward`
      );
    }

    const [current, next, prev] = await Promise.all([
      axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/current`),
      axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/next`),
      axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/previous`),
    ]);

    const tempQueue: Queue = {
      prev: prev.data.result,
      current: current.data.result,
      next: next.data.result,
    };

    dispatchQueue({ type: "SET_QUEUE", payload: tempQueue });
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer w-[160px] h-[230px] rounded-xl overflow-hidden border-NAVY-5 border-2 shadow-[-2px_2px_4px_0_#5C67DE,2px_-2px_4px_0_#5C67DE,-2px_-2px_4px_0_#5C67DE,2px_2px_4px_0_#5C67DE] hover:shadow-[-2px_2px_4px_0_#F5D049,2px_-2px_4px_0_#F5D049,-2px_-2px_4px_0_#F5D049,2px_2px_4px_0_#F5D049] hover:bg-YELLOW-5 hover:border-YELLOW-1 group shrink-0 xl:w-[200px] xl:h-[288px]"
    >
      <img
        className="w-[160px] h-[140px] object-cover object-center xl:w-[200px] xl:h-[175px]"
        src={urlPrefix + imageurl || Placeholder}
        width={200}
        height={175}
        alt="podcast-thumbnail"
      />

      <div className="pt-3 pb-5 px-1.5 w-full group-hover:text-NAVY-2 relative xl:pt-4 xl:pb-6 xl:px-2.5">
        {premium ? (
          <button
            onClick={handleAddToQueue}
            className="invisible hover:scale-100 scale-90 group-hover:visible flex absolute right-2.5 top-0 -translate-y-[10px] group-hover:-translate-y-[32px] items-center justify-center rounded-full bg-BLACK py-4 pl-[18px] pr-3.5 transition-transform duration-500"
          >
            <img src={PlayIcon} width={16} height={16} alt="pause-episode" />
          </button>
        ) : null}

        <h4 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-xs">
          {title}
        </h4>
        <h3 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-xs">
          {podcast_title}
        </h3>
        <p className="mt-2.5 text-[10px] w-full md:max-xl:text-[8px]">
          {description}
        </p>
      </div>
    </div>
  );
}
