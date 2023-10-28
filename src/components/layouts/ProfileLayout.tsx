import { Outlet } from "react-router-dom";

// Asset imports
import SampleImage1 from "../../assets/escape.jpg";

export default function ProfileLayout(): JSX.Element {
  return (
    <>
      <aside className="w-full mt-6 px-8 flex flex-row-reverse items-center gap-12">
        <div className="rounded-full border-BLACK border">
          <img
            className="rounded-full w-[75px] h-[75px] object-cover object-center"
            src={SampleImage1}
            width={75}
            height={75}
            alt=""
          />
        </div>
        <div className="bg-YELLOW-5 py-2 px-6 rounded-[32px]">
          <p className="h5">Premium User</p>
        </div>
      </aside>

      <Outlet />
    </>
  );
}
