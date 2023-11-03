import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";


export type episodeProps = {
    order: number,
    title: string,
    description: string,
    imageurl: string
  }

  export default function EpisodeList({order, title, description, imageurl}: episodeProps): JSX.Element {
    return (
        <div className="group/item ml-20 flex justify-center items-center w-[900px] h-[110px] rounded-xl bg-white hover:bg-NAVY-5 text-black hover:text-white">

            <h1 className="h2 mr-[20px]">{order}</h1>

            <img 
            className="rounded-lg w-[75px] h-[75px]"
            width={75}
            height={75}
            src={imageurl || Placeholder}
            alt="episode thumbnail" />

            <div className="w-[550px] h-[59px] ml-5">
                <h2 className="h3 text-ellipsis whitespace-nowrap overflow-hidden">{title}</h2>
                <p className="b4 text-ellipsis whitespace-nowrap overflow-hidden">{description}</p>
            </div>

            <button 
            data-te-toggle="tooltip"
            title="play episode" 
            className="invisible group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[40px] h-[40px] ml-[20px]">
                <img 
                className="ml-[2px]"
                width={16}
                height={16}
                src={PlayIcon} 
                alt="play episode"/>
            </button>

            <button
            data-te-toggle="tooltip"
            title="add to queue"
            className="invisible group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[40px] h-[40px] ml-[20px]">
                <img 
                className=""
                width={16}
                height={16}
                src={PlusIcon} 
                alt="play episode"/>
            </button>

        </div>
    );
  }