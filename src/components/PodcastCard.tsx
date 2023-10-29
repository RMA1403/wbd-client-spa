// Asset imports
import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";

export type cardProps = {
  title: string,
  description: string,
  imageurl: string
}

export default function PodcastCard({title, description, imageurl}: cardProps): JSX.Element {
  return (
    <div className="w-[160px] h-[230px] rounded-xl overflow-hidden border-NAVY-5 border-2 shadow-[-2px_2px_4px_0_#5C67DE,2px_-2px_4px_0_#5C67DE,-2px_-2px_4px_0_#5C67DE,2px_2px_4px_0_#5C67DE] hover:shadow-[-2px_2px_4px_0_#F5D049,2px_-2px_4px_0_#F5D049,-2px_-2px_4px_0_#F5D049,2px_2px_4px_0_#F5D049] hover:bg-YELLOW-5 hover:border-YELLOW-1 group shrink-0 xl:w-[200px] xl:h-[288px]">
      <img
        className="w-[160px] h-[140px] object-cover object-center xl:w-[200px] xl:h-[175px]"
        src={imageurl || Placeholder}
        width={200}
        height={175}
        alt="podcast-thumbnail"
      />

      <div className="pt-3 pb-5 px-1.5 w-full group-hover:text-NAVY-2 relative xl:pt-4 xl:pb-6 xl:px-2.5">
        <button className="invisible group-hover:visible flex absolute right-2.5 top-0 -translate-y-[10px] group-hover:-translate-y-[32px] items-center justify-center rounded-full bg-BLACK py-4 pl-[18px] pr-3.5 transition-transform duration-500">
          <img src={PlayIcon} width={16} height={16} alt="pause-episode" />
        </button>

        <h4 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden md:max-xl:text-xs">{title}</h4>
        <p className="mt-2.5 text-[10px] w-full md:max-xl:text-[8px]">
          {description}
        </p>
      </div>
    </div>
  );
}
