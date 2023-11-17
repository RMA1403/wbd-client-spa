import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";
import { Queue, useQueue, useQueueDispatch } from "../contexts/QueueContext";

export type headerProps = {
  title: string;
  description: string;
  url_thumbnail: string;
  id_episode: number;
  premium: boolean;
};

export default function EpisodeHeader({
  title,
  description,
  url_thumbnail,
  id_episode,
  premium,
}: headerProps): JSX.Element {
  const urlPrefix = premium
    ? "http://localhost:3000/images/"
    : "http://localhost:8080/app/storage";

  const queue = useQueue();
  const dispatchQueue = useQueueDispatch();

  const handlePlay = async () => {
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

  const handleAddToQueue = async () => {
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
    <div className="block">
      <div className="w-[950px] inline-flex mt-[20px]">
        <div className="">
          <div className="w-[225px] h-[225px]">
            <img
              className="rounded-[20px] w-[225px] h-[225px] object-cover object-center"
              width={225}
              height={225}
              src={urlPrefix + url_thumbnail || Placeholder}
              alt="podcast thumbnail"
            />
          </div>
        </div>

        <div className="ml-[30px]">
          <div className="block"></div>
          <div className="block">
            <h1 className="h1 my-[10px] leading-tight">{title}</h1>
          </div>

          <div className="block">
            <p className="b3 text-gray-600 ">{description}</p>
          </div>
        </div>
      </div>

      {premium ? (
        <div className="block mt-[20px]">
          <button
            onClick={handlePlay}
            data-te-toggle="tooltip"
            title="play episode"
            className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4"
          >
            Play Episode
            <img
              className="inline ml-[45px]"
              width={16}
              height={16}
              src={PlayIcon}
              alt=""
            />
          </button>

          <button
            onClick={handleAddToQueue}
            data-te-toggle="tooltip"
            title="add episode to queue"
            className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4 ml-[30px]"
          >
            Add To Queue
            <img
              className="inline ml-[45px]"
              width={16}
              height={16}
              src={PlusIcon}
              alt=""
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
