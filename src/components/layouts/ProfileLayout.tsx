import { Outlet } from "react-router-dom";

// Asset imports
import SampleImage1 from "../../assets/escape.jpg";

export default function ProfileLayout(): JSX.Element {
  return (
    <>
      <aside className="w-full mt-4 px-6 flex flex-row-reverse items-center gap-8 xl:gap-12 xl:mt-6 xl:px-8">
        <div className="rounded-full border-BLACK border">
          <img
            className="rounded-full w-[50px] h-[50px] object-cover object-center xl:w-[75px] xl:h-[75px]"
            src={SampleImage1}
            width={75}
            height={75}
            alt=""
          />
        </div>
        <div className="bg-YELLOW-5 py-1 px-4 rounded-3xl xl:py-2 xl:px-6 xl:rounded-[32px]">
          <p className="h5 md:max-xl:text-[10px]">Premium User</p>
        </div>
      </aside>

      <Outlet />
    </>
  );
}
