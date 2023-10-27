// Asset imports
import SampleImage1 from "../assets/escape.jpg";

import PlayIcon from "../assets/play-icon.svg";
import PauseIcon from "../assets/pause-icon.svg";
import ForwardIcon from "../assets/forward-icon.svg";
import QueueIcon from "../assets/queue-icon.svg";
import { useRef, useState } from "react";

export default function Player() {
  const playerRef = useRef<HTMLAudioElement | null>(null);

  // Component states
  const [isPlaying, setPlaying] = useState(false);
  const [currProgress, setCurrProgress] = useState(0);

  const handlePlay = () => {
    setPlaying(true);

    if (playerRef.current) {
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
    if (playerRef.current) {
      const progress =
        (playerRef.current.currentTime / playerRef.current.duration) * 100;
      setCurrProgress(progress);
    }
  };

  return (
    <div className="pt-[22px] px-[22px] pb-6 w-[25vw] bg-YELLOW-5 rounded-t-3xl border-2 border-BLACK border-b-0">
      <div className="flex items-center gap-4">
        <img
          className="w-[100px] h-[100px] object-cover object-center rounded-xl"
          src={SampleImage1}
          width={100}
          height={100}
          alt="episode-thumbnail"
        />

        <div className="flex flex-col gap-3">
          <h4 className="h4 text-BLACK">
            Ini Contoh Judul Episode Podcast Bisa Agak Panjang
          </h4>
          <p className="h6 text-NAVY-3">User 101</p>
        </div>
      </div>

      <div className="w-full justify-center flex items-center gap-6 mt-6">
        <button>
          <img
            className="-scale-x-100"
            src={ForwardIcon}
            width={24}
            height={20}
            alt="previous-episode"
          />
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="flex items-center justify-center rounded-full bg-BLACK p-4"
          >
            <img src={PauseIcon} width={16} height={16} alt="play-episode" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="flex items-center justify-center rounded-full bg-BLACK py-4 pl-[18px] pr-3.5"
          >
            <img src={PlayIcon} width={16} height={16} alt="pause-episode" />
          </button>
        )}
        <button>
          <img
            src={ForwardIcon}
            width={24}
            height={20}
            alt="previous-episode"
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
        <source src="http://localhost:3000/audio" type="audio/mpeg" />
      </audio>

      <div className="flex gap-2 items-center mt-3">
        <img src={QueueIcon} width={16} height={16} alt="queue" />
        <p className="text-NAVY-3 h6">Your Queue</p>
      </div>
    </div>
  );
}
