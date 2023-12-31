import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";
import { Queue, useQueue, useQueueDispatch } from "../contexts/QueueContext";
import { useState, useEffect } from "react";
import { cardProps } from "./LibraryCard";
import { useNavigate } from "react-router-dom"

export type headerProps = {
  category: string;
  creator: string;
  title: string;
  description: string;
  url_thumbnail: string;
  id_podcast: number;
  premium: boolean;
};

export default function PodcastHeader({
  category,
  creator,
  title,
  description,
  url_thumbnail,
  id_podcast,
  premium,
}: headerProps): JSX.Element {
  const urlPrefix = premium
    ? "http://localhost:3000/images/"
    : "http://localhost:8080/app/storage";

  const queue = useQueue();
  const dispatchQueue = useQueueDispatch();
  const [libraryData, setLibraryData] = useState<cardProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      const resLibaryData = await axios.get(
        `${import.meta.env.VITE_REST_URL}/library`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLibraryData(resLibaryData.data.playlists);
    })();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  const handleNavigateLib = () => {
    navigate(`/library`);
  }

  const handleAddPodcastToLibrary = async (idPlaylist:number) => {
 
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/playlist/podcast/${id_podcast}`, {
      idPlaylist: idPlaylist,
      idPodcast: id_podcast,
    })

  }

  const handleAddToQueue = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axiosInstance.delete(`${import.meta.env.VITE_REST_URL}/queue`);

    await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/queue/podcast`, {
      idPodcast: id_podcast,
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
    <div className="block">
      <div className="w-full inline-flex mt-[20px]">
        <div className="">
          <div className="w-[225px] h-[225px]">
            <img
              className="rounded-[20px] object-cover object-center w-[225px] h-[225px]"
              width={225}
              height={225}
              src={urlPrefix + url_thumbnail || Placeholder}
              alt="podcast thumbnail"
            />
          </div>
        </div>

        <div className="ml-[30px]">
          <div className="block">
            <div className="inline-flex w-[100px] h-[32px] rounded-[32px] bg-NAVY-5 text-white align-middle items-center justify-center">
              <h3 className="h6 capitalize">{category.toLowerCase()}</h3>
            </div>

            <div className="inline-flex ml-[10px]">
              <h3 className="h6 text-NAVY-5">Created By {creator}</h3>
            </div>
          </div>

          <div className="block">
            <h1 className="h1 my-[10px] leading-tight">{title}</h1>
          </div>

          <div className="block">
            <p className="b3 text-gray-600 md:max-xl:text-[12px]">
              {description}
            </p>
          </div>
        </div>
      </div>

      {premium ? (
        <div className="block mt-[20px]">
          <button
            data-te-toggle="tooltip"
            title="add episode to library"
            className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4"
          >
            Add To Library
            <img
              onClick={toggleVisibility}
              className="inline ml-[45px]"
              width={16}
              height={16}
              src={PlusIcon}
              alt="plus icon"
            />
          </button>

          {isVisible? (
            <div className="w-[100px] h-[100px] overflow-y-scroll rounded-xl shadow-lg bg-WHITE text-black">
              {libraryData?.map((data:cardProps) => (
                <button onClick={()=>handleAddPodcastToLibrary(data.id_playlist)}>{data.title}</button>
              ))}
            </div>
          ) :
          <button
          data-te-toggle="tooltip"
          title="create new library"
          className=" w-[225px] h-[50px] text-NAVY-5 bg-white rounded-[16px] h4 leading-4 shadow-lg"
        >
          New Library
          <img
            onClick={handleNavigateLib}
            className="inline ml-[45px]"
            width={16}
            height={16}
            src={PlusIcon}
            alt="plus icon"
          />
        </button>}

          <button
            onClick={handleAddToQueue}
            data-te-toggle="tooltip"
            title="play episode"
            className=" w-[48px] h-[48px] bg-black text-white rounded-[32px] h4 leading-4 ml-[30px] hover:bg-gray-600"
          >
            <img
              className="inline ml-[5px]"
              width={18}
              height={18}
              src={PlayIcon}
              alt="play podcast"
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
