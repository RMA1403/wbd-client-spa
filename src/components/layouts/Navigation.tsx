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
      <ul className="mt-8 px-4 mb-4 flex flex-col gap-4">
        <li>
          <NavLink to={"/"}>
            {({ isActive }: { isActive: boolean }) => (
              <button
                className={clsx(
                  "flex gap-6 w-full rounded-xl py-3.5 px-4 transition-colors duration-150",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                {isActive ? (
                  <img src={HomeIconWhite} width={24} height={21} alt="home" />
                ) : (
                  <img src={HomeIconBlack} width={24} height={21} alt="home" />
                )}
                <p
                  className={clsx("h4", isActive ? "text-WHITE" : "text-BLACK")}
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
                  "flex gap-6 w-full rounded-xl py-3.5 px-4 transition-colors duration-150",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                {isActive ? (
                  <img
                    src={SearchIconWhite}
                    width={24}
                    height={24}
                    alt="search"
                  />
                ) : (
                  <img
                    src={SearchIconBlack}
                    width={24}
                    height={24}
                    alt="search"
                  />
                )}
                <p
                  className={clsx("h4", isActive ? "text-WHITE" : "text-BLACK")}
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
                  "flex w-full items-center rounded-xl py-2.5 px-4 justify-between 4 transition-colors duration-150",
                  isActive ? "bg-NAVY-5" : "hover:bg-NAVY-5/25"
                )}
              >
                <div className="flex gap-6">
                  {isActive ? (
                    <img
                      src={LibraryIconWhite}
                      width={24}
                      height={21}
                      alt="library"
                    />
                  ) : (
                    <img
                      src={LibraryIconBlack}
                      width={24}
                      height={21}
                      alt="library"
                    />
                  )}
                  <p
                    className={clsx(
                      "h4",
                      isActive ? "text-WHITE" : "text-BLACK"
                    )}
                  >
                    Your Library
                  </p>
                </div>
                
                <div className={clsx("w-8 h-8 bg-NAVY-5 rounded-md items-center justify-center", isActive ? "invisible" : "flex")}>
                  <img
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
