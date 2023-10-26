import { Outlet } from "react-router-dom";

// Asset imports
import SampleImage1 from "../assets/escape.jpg";
import SampleImage2 from "../assets/hello.jpg";
import SampleImage3 from "../assets/play.jpg";

import PlayIcon from "../assets/play-icon.svg";
// import ResumeIcon from "../assets/pause-icon.svg"
import ForwardIcon from "../assets/forward-icon.svg";
import QueueIcon from "../assets/queue-icon.svg";

import Audio from "../assets/audiotester.mp3"

// Component imports
import Navigation from "./Navigation";

export default function SidebarLayout() {
  const libraries = [
    "Contoh Judul Library",
    "Contoh Judul Library Kepanjangan Banget",
    // "Library Ketiga",
  ];

  

  return (
    <div className="w-full h-screen flex">
      <aside className="w-[30vw] h-screen bg-NAVY-5 flex flex-col justify-between items-center">
        <div className="w-full">
          <Navigation />

          <ul className="py-4 px-8 flex flex-col gap-4 bg-YELLOW-5 border-t-2 border-b-2 border-t-BLACK border-b-BLACK">
            {libraries.map((library, idx) => (
              <li key={idx} className="flex gap-4 items-center">
                <div className="shrink-0 w-12 h-12 overflow-hidden rounded-md grid grid-cols-2 grid-rows-2">
                  <img
                    className="object-cover object-center w-6 h-6"
                    src={SampleImage1}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <img
                    className="object-cover object-center w-6 h-6"
                    src={SampleImage2}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <img
                    className="object-cover object-center w-6 h-6"
                    src={SampleImage3}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <img
                    className="object-cover object-center w-6 h-6"
                    src={SampleImage1}
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
                <p className="h5 text-BLACK text-ellipsis whitespace-nowrap overflow-hidden">
                  {library}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Player */}
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
            <button className="flex items-center justify-center rounded-full bg-BLACK py-4 pl-[18px] pr-3.5">
              <img src={PlayIcon} width={16} height={16} alt="play-episode" />
            </button>
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
            type="range"
            name="progress-bar"
            className="progress-bar w-full h-[5px] rounded-xl"
            step="0.01"
            value="0"
          />

          {/* Hidden Audio */}
          <audio controls className="audio-player">
            <source src={Audio} type="audio/mpeg" />
          </audio>

          <div className="flex gap-2 items-center mt-3">
            <img src={QueueIcon} width={16} height={16} alt="queue" />
            <p className="text-NAVY-3 h6">Your Queue</p>
          </div>
        </div>
      </aside>
      <main className="w-[70vw] h-screen overflow-y-scroll bg-green-200">
        <Outlet />
      </main>
    </div>
  );
}
