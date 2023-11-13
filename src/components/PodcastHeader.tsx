import Placeholder from "../assets/placeholder_image.jpg";
import PlayIcon from "../assets/play-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";


export type headerProps = {
    category: string,
    creator: string,
    title: string,
    description: string,
    imageurl: string
  }

  export default function PodcastHeader({category, creator, title, description, imageurl}: headerProps): JSX.Element {
    return (
        <div className="block">
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
                    <div className="inline-flex w-[100px] h-[32px] rounded-[32px] bg-NAVY-5 text-white align-middle items-center justify-center">
                        <h3 className="h6 capitalize">{category.toLowerCase()}</h3>
                    </div>

                    <div className="inline-flex ml-[10px]">
                        <h3 className="h6 text-NAVY-5">Created By {creator}</h3>
                    </div>
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
            Add To Library
            <img 
            className="inline ml-[45px]"
            width={16}
            height={16}
            src={PlusIcon} 
            alt="" />
            </button>

            <button 
            data-te-toggle="tooltip"
            title="play episode"
            className=" w-[48px] h-[48px] bg-black text-white rounded-[32px] h4 leading-4 ml-[30px] hover:bg-gray-600">
            <img 
            className="inline ml-[5px]"
            width={18}
            height={18}
            src={PlayIcon} 
            alt="" />
            </button>

        </div>
        </div>
    );
  }