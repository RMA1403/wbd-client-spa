// Asset imports
// import axios from "axios";
import Placeholder from "../assets/placeholder_image.jpg";
import SampleImage1 from "../assets/escape.jpg";
import SampleImage2 from "../assets/hello.jpg";
import SampleImage3 from "../assets/play.jpg";

export type cardProps = {
  title: string;
};

export default function LibraryCard({
  title,
}: cardProps): JSX.Element {
  return (
    <div className="w-[160px] h-[210px] rounded-xl overflow-hidden border-NAVY-5 border-2 shadow-[-2px_2px_4px_0_#5C67DE,2px_-2px_4px_0_#5C67DE,-2px_-2px_4px_0_#5C67DE,2px_2px_4px_0_#5C67DE] hover:shadow-[-2px_2px_4px_0_#F5D049,2px_-2px_4px_0_#F5D049,-2px_-2px_4px_0_#F5D049,2px_2px_4px_0_#F5D049] hover:bg-YELLOW-5 hover:border-YELLOW-1 group shrink-0 xl:w-[200px] xl:h-[288px]">
                
        <div className="shrink-0 w-[160px] h-[160px] overflow-hidden grid grid-cols-2 grid-rows-2 xl:w-[200px] xl:h-[200px]">
        <img
            className="object-cover object-center xl:w-[100px] xl:h-[100px] lg:w-[80px] lg:h-[80px]"
            src={SampleImage1 || Placeholder}
            width={100}
            height={100}
            alt="image1"
        />
        <img
            className="object-cover object-center xl:w-[100px] xl:h-[100px] lg:w-[80px] lg:h-[80px]"
            src={SampleImage2 || Placeholder}
            width={100}
            height={100}
            alt="image2"
        />
        <img
            className="object-cover object-center xl:w-[100px] xl:h-[100px] lg:w-[80px] lg:h-[80px]"
            src={SampleImage3 || Placeholder}
            width={100}
            height={100}
            alt="image3"
        />
        <img
            className="object-cover object-center xl:w-[100px] xl:h-[100px] lg:w-[80px] lg:h-[80px]"
            src={SampleImage1 || Placeholder}
            width={100}
            height={100}
            alt="image4"
        />
        </div>
              
      <div className="pt-3 pb-5 px-1.5 w-full group-hover:text-NAVY-2 relative xl:pt-4 xl:pb-6 xl:px-2.5">
        <h4 className="h4 w-full text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-xs">
          {title}
        </h4>
      </div>
    </div>
  );
}