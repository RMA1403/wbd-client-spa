import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";


export type headerProps = {
    title: string,
    description: string,
    imageurl: string
  }

  export default function EpisodeHeader({title, description, imageurl}: headerProps): JSX.Element {
    return (
        <div className="block ml-[60px]">
        <div className="w-[950px] inline-flex mt-[20px]">

            <div className="">
                <div className="w-[225px] h-[225px]"> 
                <img className="rounded-[20px]"
                width={225}
                height={225}
                src={imageurl || Placeholder} 
                alt="podcast thumbnail" />
                </div>

            </div>

            <div className="ml-[30px]">
                <div className="block">

                </div>
                <div className="block">
                    <h1 className="h1 my-[10px] leading-tight">{title}</h1>
                </div>

                <div className="block">
                    <p className="b3 text-gray-600 ">{description}</p>
                </div>
            </div>

        </div>
        
        <div className="block mt-[20px]">
            <button 
            data-te-toggle="tooltip"
            title="add episode to library"
            className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4">
            Play Episode
            <img 
            className="inline ml-[45px]"
            width={16}
            height={16}
            src={PlayIcon} 
            alt="" />
            </button>

            <button 
            data-te-toggle="tooltip"
            title="add episode to queue"
            className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4 ml-[30px]">
            Add To Queue
            <img 
            className="inline ml-[45px]"
            width={16}
            height={16}
            src={PlusIcon} 
            alt="" />
            </button>

        </div>
        </div>
    );
  }