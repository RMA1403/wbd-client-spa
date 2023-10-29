// Asset imports
import SampleImage1 from "../../assets/escape.jpg";

import PlayIcon from "../../assets/play-icon.svg";
import PauseIcon from "../../assets/pause-icon.svg";
import ForwardIcon from "../../assets/forward-icon.svg";
import QueueIcon from "../../assets/queue-icon.svg";
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
    <div className="p-4 w-full bg-YELLOW-5 xl:p-[22px]">
      <div className="flex items-center gap-4">
        <img
          className="w-[75px] h-[75px] object-cover object-center rounded-xl xl:w-[100px] xl:h-[100px]"
          src={SampleImage1}
          width={100}
          height={100}
          alt="episode-thumbnail"
        />

        <div className="flex flex-col gap-2 xl:gap-3">
          <h4 className="h4 md:max-xl:text-xs text-BLACK">
            Ini Contoh Judul Episode Podcast Bisa Agak Panjang
          </h4>
          <p className="h6 text-NAVY-3 md:max-xl:text-[10px]">User 101</p>
        </div>
      </div>

      <div className="w-full justify-center flex items-center gap-4 mt-4 xl:gap-6 xl:mt-6">
        <button>
          <img
            className="-scale-x-100 w-5 h-4 xl:w-6 xl:h-5"
            src={ForwardIcon}
            width={24}
            height={20}
            alt="previous-episode"
          />
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="flex items-center justify-center rounded-full hover:bg-opacity-80 bg-BLACK p-4"
          >
            <img className="w-3 h-3 xl:w-4 xl:h-4" src={PauseIcon} width={16} height={16} alt="play-episode" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="flex items-center justify-center rounded-full hover:bg-opacity-80 bg-BLACK py-3 pr-2.5 pl-3.5 xl:py-4 xl:pl-[18px] xl:pr-3.5"
          >
            <img className="w-3 h-3 xl:w-4 xl:h-4" src={PlayIcon} width={16} height={16} alt="pause-episode" />
          </button>
        )}
        <button>
          <img
            className="w-5 h-4 xl:w-6 xl:h-5"
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

      <div className="flex gap-1 items-center mt-3 xl:gap-2">
        <img className="w-3 h-3 xl:w-4 xl:h-4" src={QueueIcon} width={16} height={16} alt="queue" />
        <p className="text-NAVY-3 h6 md:max-xl:text-[10px]">Your Queue</p>
      </div>
    </div>
  );
}
