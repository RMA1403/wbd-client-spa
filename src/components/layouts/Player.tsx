import { useEffect, useRef, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";

// Asset imports
import Placeholder from "../../assets/placeholder_image.jpg";

import PlayIcon from "../../assets/play-icon.svg";
import PauseIcon from "../../assets/pause-icon.svg";
import ForwardIcon from "../../assets/forward-icon.svg";
import QueueIcon from "../../assets/queue-icon.svg";
import axios from "axios";
import { Queue, useQueue, useQueueDispatch } from "../../contexts/QueueContext";

export type episode = {
  id_episode: number;
  title: string;
  description: string;
  url_thumbnail: string;
  url_audio: string;
  id_podcast: number;
  PremiumPodcast: {
    title: string;
  };
};

export default function Player() {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const revalidator = useRevalidator();

  const queue = useQueue();
  const dispatchQueue = useQueueDispatch();

  // Component states
  const [isPlaying, setPlaying] = useState(false);
  const [currProgress, setCurrProgress] = useState(0);

  useEffect(() => {
    (async function () {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    })();
  }, [dispatchQueue]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src = queue.current?.url_audio
        ? `${import.meta.env.VITE_REST_URL}/audio/${queue.current?.url_audio}`
        : "";
    }
  }, [queue]);

  const handlePlay = () => {
    setPlaying(true);

    if (playerRef.current) {
      console.log(playerRef.current.src);

      playerRef.current.play();
    }
  };

  const handlePause = () => {
    setPlaying(false);

    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleUpdateProgress = () => {
    if (playerRef.current?.currentTime && playerRef.current.duration) {
      const progress =
        (playerRef.current.currentTime / playerRef.current.duration) * 100;
      setCurrProgress(progress);
    }
  };

  const handleMoveForward = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REST_URL}/queue/forward`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.message === "success") {
      const next = await axios.get(
        `${import.meta.env.VITE_REST_URL}/queue/next`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const tempQueue: Queue = {
        prev: queue.current,
        current: queue.next,
        next: next.data.result,
      };

      dispatchQueue({ type: "SET_QUEUE", payload: tempQueue });
      revalidator.revalidate();
    }
  };

  const handleMoveBackward = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REST_URL}/queue/backward`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      const prev = await axios.get(
        `${import.meta.env.VITE_REST_URL}/queue/previous`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const tempQueue: Queue = {
        prev: prev.data.result,
        current: queue.prev,
        next: queue.current,
      };

      dispatchQueue({ type: "SET_QUEUE", payload: tempQueue });
      revalidator.revalidate();
    }
  };

  return (
    <div
      style={{
        transform: queue.current ? "translateY(0)" : "translateY(100%)",
      }}
      className="p-4 w-full bg-YELLOW-5 transition-transform duration-500 xl:p-[22px]"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-[75px] h-[75px] object-cover object-center rounded-xl xl:w-[100px] xl:h-[100px]"
          src={
            queue.current && queue.current.url_thumbnail
              ? `${import.meta.env.VITE_REST_URL}/images/${
                  queue.current.url_thumbnail
                }`
              : Placeholder
          }
          width={100}
          height={100}
          alt="episode-thumbnail"
        />

        <div className="flex flex-col gap-2 xl:gap-3">
          <h4 className="h4 md:max-xl:text-xs text-BLACK">
            {queue.current && queue.current.title}
          </h4>
          <p className="h6 text-NAVY-3 md:max-xl:text-[10px]">
            {queue.current && queue.current.PremiumPodcast.title}
          </p>
        </div>
      </div>

      <div className="w-full justify-center flex items-center gap-4 mt-4 xl:gap-6 xl:mt-6">
        <button onClick={handleMoveBackward}>
          <img
            className="-scale-x-100 w-5 h-4 xl:w-6 xl:h-5"
            src={ForwardIcon}
            width={24}
            height={20}
            alt="previous-queue"
          />
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="flex items-center justify-center rounded-full hover:bg-opacity-80 bg-BLACK p-4"
          >
            <img
              className="w-3 h-3 xl:w-4 xl:h-4"
              src={PauseIcon}
              width={16}
              height={16}
              alt="play-episode"
            />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="flex items-center justify-center rounded-full hover:bg-opacity-80 bg-BLACK py-3 pr-2.5 pl-3.5 xl:py-4 xl:pl-[18px] xl:pr-3.5"
          >
            <img
              className="w-3 h-3 xl:w-4 xl:h-4"
              src={PlayIcon}
              width={16}
              height={16}
              alt="pause-episode"
            />
          </button>
        )}
        <button onClick={handleMoveForward}>
          <img
            className="w-5 h-4 xl:w-6 xl:h-5"
            src={ForwardIcon}
            width={24}
            height={20}
            alt="next-queue"
          />
        </button>
      </div>

      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (playerRef.current) {
            const seconds =
              (+e.target.value / 100) * playerRef.current.duration;
            playerRef.current.currentTime = seconds;
          }
        }}
        type="range"
        name="progress-bar"
        className="progress-bar w-full h-[5px] rounded-xl"
        step="0.01"
        value={currProgress}
      />

      {/* Hidden Audio */}
      <audio
        ref={playerRef}
        controls
        onTimeUpdate={handleUpdateProgress}
        className="audio-player hidden"
      >
        <source src="" type="audio/mpeg" />
      </audio>

      <Link to="/queue">
        <div className="flex gap-1 items-center mt-3 xl:gap-2">
          <img
            className="w-3 h-3 xl:w-4 xl:h-4"
            src={QueueIcon}
            width={16}
            height={16}
            alt="queue"
          />

          <p className="text-NAVY-3 h6 md:max-xl:text-[10px]">Your Queue</p>
        </div>
      </Link>
    </div>
  );
}
