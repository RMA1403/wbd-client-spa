// Asset imports
import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import { Queue, useQueueDispatch } from "../contexts/QueueContext";

export type cardProps = {
  idpodcast: number;
  title: string;
  description: string;
  imageurl: string;
};

export default function PodcastCard({
  idpodcast,
  title,
  description,
  imageurl,
}: cardProps): JSX.Element {
  const dispatchQueue = useQueueDispatch()

  const handleAddToQueue = async () => {
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/queue/podcast`, {
      idPodcast: idpodcast,
    });

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
    <div className="w-[160px] h-[230px] rounded-xl overflow-hidden border-NAVY-5 border-2 shadow-[-2px_2px_4px_0_#5C67DE,2px_-2px_4px_0_#5C67DE,-2px_-2px_4px_0_#5C67DE,2px_2px_4px_0_#5C67DE] hover:shadow-[-2px_2px_4px_0_#F5D049,2px_-2px_4px_0_#F5D049,-2px_-2px_4px_0_#F5D049,2px_2px_4px_0_#F5D049] hover:bg-YELLOW-5 hover:border-YELLOW-1 group shrink-0 xl:w-[200px] xl:h-[288px]">
      <img
        className="w-[160px] h-[140px] object-cover object-center xl:w-[200px] xl:h-[175px]"
        src={
          imageurl
            ? `${import.meta.env.VITE_REST_URL}/images/${imageurl}`
            : Placeholder
        }
        width={200}
        height={175}
        alt="podcast-thumbnail"
      />

      <div className="pt-3 pb-5 px-1.5 w-full group-hover:text-NAVY-2 relative xl:pt-4 xl:pb-6 xl:px-2.5">
        <button
          onClick={handleAddToQueue}
          className="invisible group-hover:visible flex absolute right-2.5 top-0 -translate-y-[10px] group-hover:-translate-y-[32px] items-center justify-center rounded-full bg-BLACK py-4 pl-[18px] pr-3.5 transition-transform duration-500"
        >
          <img src={PlayIcon} width={16} height={16} alt="pause-episode" />
        </button>

        <h4 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-xs">
          {title}
        </h4>
        <p className="mt-2.5 text-[10px] w-full md:max-xl:text-[8px]">
          {description}
        </p>
      </div>
    </div>
  );
}
