import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";


export type episodeProps = {
    order: number,
    title: string,
    description: string,
    url_thumbnail: string
  }

  export default function EpisodeList({order, title, description, url_thumbnail}: episodeProps): JSX.Element {
    const urlPrefix = "http://localhost:3000/images/"
    return (
        <div className="group/item flex items-center w-[1100px] h-[110px] rounded-xl bg-white hover:bg-NAVY-5 text-black hover:text-white">

            <h1 className="h2 ml-[30px] mr-[20px]">{order}</h1>

            <img 
            className="rounded-lg w-[75px] h-[75px] object-cover object-center"
            width={75}
            height={75}
            src={ urlPrefix + url_thumbnail || Placeholder}
            alt="episode thumbnail" />

            <div className="w-[650px] h-[59px] ml-5">
                <h2 className="h3 text-ellipsis whitespace-nowrap overflow-hidden">{title}</h2>
                <p className="b4 text-ellipsis whitespace-nowrap overflow-hidden">{description}</p>
            </div>

            <button 
            data-te-toggle="tooltip"
            title="play episode" 
            className="invisible group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[48px] h-[48px] ml-[70px] hover:bg-gray-600">
                <img 
                className="ml-[5px]"
                width={18}
                height={18}
                src={PlayIcon} 
                alt="play episode"/>
            </button>

            <button
            data-te-toggle="tooltip"
            title="add to queue"
            className="invisible group-hover/item:visible flex items-center justify-center rounded-full bg-black w-[48px] h-[48px] ml-[30px] hover:bg-gray-600">
                <img 
                className=""
                width={18}
                height={18}
                src={PlusIcon} 
                alt="play episode"/>
            </button>

        </div>
    );
  }