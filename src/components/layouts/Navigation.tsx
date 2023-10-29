import { NavLink } from "react-router-dom";
import clsx from "clsx";

// Asset imports
import HomeIconBlack from "../../assets/home-icon-black.svg";
import HomeIconWhite from "../../assets/home-icon-white.svg";
import SearchIconBlack from "../../assets/search-icon-black.svg";
import SearchIconWhite from "../../assets/search-icon-white.svg";
import LibraryIconBlack from "../../assets/library-icon-black.svg";
import LibraryIconWhite from "../../assets/library-icon-white.svg";
import PlusIcon from "../../assets/plus-icon.svg";

export default function Navigation() {
  return (
    <nav>
      <ul className="mt-6 px-3 mb-3 flex flex-col gap-3 xl:mb-4 xl:gap-4 xl:px-4 xl:mt-8">
        <li>
          <NavLink to={"/"}>
            {({ isActive }: { isActive: boolean }) => (
              <button
                className={clsx(
                  "flex gap-4 w-full rounded-xl py-2.5 px-4 transition-colors duration-150 xl:py-3.5 xl:gap-6",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                {isActive ? (
                  <img
                    className="w-4 h-[13px] xl:w-6 xl:h-[21px]"
                    src={HomeIconWhite}
                    width={24}
                    height={21}
                    alt="home"
                  />
                ) : (
                  <img
                    className="w-4 h-[13px] xl:w-6 xl:h-[21px]"
                    src={HomeIconBlack}
                    width={24}
                    height={21}
                    alt="home"
                  />
                )}
                <p
                  className={clsx(
                    "h4 md:max-xl:text-xs",
                    isActive ? "text-WHITE" : "text-BLACK"
                  )}
                >
                  Home
                </p>
              </button>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/search"}>
            {({ isActive }: { isActive: boolean }) => (
              <button
                className={clsx(
                  "flex gap-4 w-full rounded-xl py-2.5 px-4 transition-colors duration-150 xl:py-3.5 xl:gap-6",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                {isActive ? (
                  <img
                    className="w-4 h-4 xl:w-6 xl:h-6"
                    src={SearchIconWhite}
                    width={24}
                    height={24}
                    alt="search"
                  />
                ) : (
                  <img
                    className="w-4 h-4 xl:w-6 xl:h-6"
                    src={SearchIconBlack}
                    width={24}
                    height={24}
                    alt="search"
                  />
                )}
                <p
                  className={clsx(
                    "h4 md:max-xl:text-xs",
                    isActive ? "text-WHITE" : "text-BLACK"
                  )}
                >
                  Search
                </p>
              </button>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/library"}>
            {({ isActive }: { isActive: boolean }) => (
              <button
                className={clsx(
                  "flex w-full items-center rounded-xl py-1.5 px-4 justify-between 4 transition-colors duration-150 xl:py-2.5",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                <div className="flex gap-4 xl:gap-6">
                  {isActive ? (
                    <img
                    className="w-4 h-[13px] xl:w-6 xl:h-[21px]"
                      src={LibraryIconWhite}
                      width={24}
                      height={21}
                      alt="library"
                    />
                  ) : (
                    <img
                    className="w-4 h-[13px] xl:w-6 xl:h-[21px]"
                      src={LibraryIconBlack}
                      width={24}
                      height={21}
                      alt="library"
                    />
                  )}
                  <p
                    className={clsx(
                      "h4 md:max-xl:text-xs",
                      isActive ? "text-WHITE" : "text-BLACK"
                    )}
                  >
                    Your Library
                  </p>
                </div>

                <div
                  className={clsx(
                    "w-6 h-6 bg-NAVY-5 rounded-md items-center justify-center xl:w-8 xl:h-8",
                    isActive ? "invisible" : "flex"
                  )}
                >
                  <img
                    className="w-3 h-3 xl:w-4 xl:h-4"
                    src={PlusIcon}
                    width={16}
                    height={16}
                    alt="add-library"
                  />
                </div>
              </button>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
