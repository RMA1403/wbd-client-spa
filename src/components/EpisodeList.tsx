import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";
import { Queue, useQueue, useQueueDispatch } from "../contexts/QueueContext";
import { useNavigate } from "react-router-dom";

export type episodeProps = {
  order: number;
  id_episode: number;
  title: string;
  description: string;
  url_thumbnail: string;
};

export default function EpisodeList({
  order,
  title,
  description,
  url_thumbnail,
  id_episode,
}: episodeProps): JSX.Element {
  const urlPrefix = "http://localhost:3000/images/";

  const dispatchQueue = useQueueDispatch();
  const queue = useQueue();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/episode/${id_episode}`);
  };

  const handlePlay = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    try {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await axiosInstance.delete(`${import.meta.env.VITE_REST_URL}/queue`);

      await axiosInstance.post(
        `${import.meta.env.VITE_REST_URL}/queue/episode`,
        {
          idEpisode: id_episode,
        }
      );

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToQueue = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    try {
      await axios.post(
        `${import.meta.env.VITE_REST_URL}/queue/episode`,
        {
          idEpisode: id_episode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer group/item flex items-center w-[1100px] h-[110px] rounded-xl bg-white hover:bg-NAVY-5 text-black hover:text-white"
    >
      <h1 className="h2 ml-[30px] mr-[20px]">{order}</h1>
      <img
        className="rounded-lg w-[75px] h-[75px] object-cover object-center"
        width={75}
        height={75}
        src={urlPrefix + url_thumbnail || Placeholder}
        alt="episode thumbnail"
      />

      <div className="w-[650px] h-[59px] ml-5">
        <h2 className="h3 text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h2>
        <p className="b4 text-ellipsis whitespace-nowrap overflow-hidden">
          {description}
        </p>
      </div>
      <button
        onClick={handlePlay}
        data-te-toggle="tooltip"
        title="play episode"
        className="invisible hover:scale-110 group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[48px] h-[48px] ml-[70px] hover:bg-gray-600"
      >
        <img
          className="ml-[5px]"
          width={18}
          height={18}
          src={PlayIcon}
          alt="play episode"
        />
      </button>
      <button
        onClick={handleAddToQueue}
        data-te-toggle="tooltip"
        title="add to queue"
        className="invisible hover:scale-110 group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[48px] h-[48px] ml-[30px] hover:bg-gray-600"
      >
        <img
          className=""
          width={18}
          height={18}
          src={PlusIcon}
          alt="play episode"
        />
      </button>
    </div>
  );
}
