import { Outlet } from "react-router-dom";

// Asset imports
import SampleImage1 from "../assets/escape.jpg";
import SampleImage2 from "../assets/hello.jpg";
import SampleImage3 from "../assets/play.jpg";

// Component imports
import Navigation from "./Navigation";
import Player from "./Player";

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

        <Player />
      </aside>
      <main className="w-[70vw] h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
