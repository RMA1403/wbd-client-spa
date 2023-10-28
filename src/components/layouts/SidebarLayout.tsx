import { Outlet } from "react-router-dom";

// Asset imports
import SampleImage1 from "../../assets/escape.jpg";
import SampleImage2 from "../../assets/hello.jpg";
import SampleImage3 from "../../assets/play.jpg";
import SearchIconBlack from "../../assets/search-icon-black.svg";

// Component imports
import Navigation from "./Navigation";
import Player from "./Player";

export default function SidebarLayout(): JSX.Element {
  const libraries = [
    "Contoh Judul Library",
    "Contoh Judul Library Kepanjangan Banget",
    "Library Ketiga",
  ];

  return (
    <div className="w-full h-screen flex">
      <aside className="w-[25vw] h-screen bg-WHITE flex flex-col justify-between items-center shadow-[2px_0_20px_0_rgba(0,0,0,0.25)]">
        <div className="w-full">
          <Navigation />

          <section className="py-3 px-4 border-t border-t-GRAY-3">
            <div className="w-full py-2 px-4 rounded-lg bg-NAVY-5/50 flex gap-2 items-center">
              <label htmlFor="library-search">
                <img src={SearchIconBlack} width={10} height={10} alt="" />
              </label>
              <input id="library-search" className="text-[10px] outline-none p-0 bg-transparent flex-auto border-0 leading-[10px] focus:ring-0" type="text" />
            </div>

            <ul className="mt-4 px-2.5 w-full flex flex-col gap-4 h-[112px] overflow-y-scroll">
              {libraries.map((library, idx) => (
                <li key={idx} className="rounded-md flex gap-4 items-center hover:bg-NAVY-5/25">
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
          </section>
        </div>

        <Player />
      </aside>
      <main className="w-[75vw] h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
