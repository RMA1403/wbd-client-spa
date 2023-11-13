import { Outlet, useLocation } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";

// Asset imports
import SampleImage1 from "../../assets/escape.jpg";
import SampleImage2 from "../../assets/hello.jpg";
import SampleImage3 from "../../assets/play.jpg";
import SearchIconBlack from "../../assets/search-icon-black.svg";

// Component imports
import Navigation from "./Navigation";
import Player from "./Player";
import { useEffect } from "react";

export default function SidebarLayout(): JSX.Element {
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryToken = new URLSearchParams(search).get("token");

  // Component states
  const { isSessionValid, isLoading } = useSession();

  const libraries = [
    "Contoh Judul Library",
    "Contoh Judul Library Kepanjangan Banget",
    "Library Ketiga",
  ];

  useEffect(() => {
    if (queryToken) {
      localStorage.setItem("token", queryToken);
      navigate("/");
    }
  }, [queryToken, navigate]);

  if (!isLoading && !isSessionValid) {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:8080/public/login");
  }

  if (isLoading || !isSessionValid) {
    return <main></main>;
  }

  return (
    <div className="w-full h-screen hidden md:flex">
      <aside className="w-[30vw] h-screen bg-WHITE flex flex-col justify-between items-center shadow-[2px_0_20px_0_rgba(0,0,0,0.25)] lg:w-[25vw]">
        <div className="w-full">
          <Navigation />

          <section className="py-3 px-3 border-t border-t-GRAY-3 xl:px-4">
            <div className="w-full py-2 px-4 rounded-lg bg-NAVY-5/50 flex gap-2 items-center">
              <label htmlFor="library-search">
                <img src={SearchIconBlack} width={10} height={10} alt="" />
              </label>
              <input
                id="library-search"
                className="text-[8px] outline-none p-0 bg-transparent flex-auto border-0 leading-[8px] focus:ring-0 xl:leading-[10px] xl:text-[10px]"
                type="text"
              />
            </div>

            <ul className="mt-3 px-2.5 w-full flex flex-col gap-3 h-[76px] overflow-y-scroll xl:h-[112px] xl:gap-4 xl:mt-4">
              {libraries.map((library, idx) => (
                <li
                  key={idx}
                  className="rounded-md flex gap-2 items-center hover:bg-NAVY-5/25 xl:gap-4"
                >
                  <div className="shrink-0 w-8 h-8 overflow-hidden rounded-md grid grid-cols-2 grid-rows-2 xl:w-12 xl:h-12">
                    <img
                      className="object-cover object-center w-5 h-4 xl:w-6 xl:h-6"
                      src={SampleImage1}
                      width={24}
                      height={24}
                      alt=""
                    />
                    <img
                      className="object-cover object-center w-5 h-4 xl:w-6 xl:h-6"
                      src={SampleImage2}
                      width={24}
                      height={24}
                      alt=""
                    />
                    <img
                      className="object-cover object-center w-5 h-4 xl:w-6 xl:h-6"
                      src={SampleImage3}
                      width={24}
                      height={24}
                      alt=""
                    />
                    <img
                      className="object-cover object-center w-5 h-4 xl:w-6 xl:h-6"
                      src={SampleImage1}
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <p className="h5 text-BLACK text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-[10px]">
                    {library}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Player />
      </aside>

      <main className="w-[70vw] h-screen overflow-y-scroll lg:w-[75vw]">
        <Outlet />
      </main>
    </div>
  );
}
