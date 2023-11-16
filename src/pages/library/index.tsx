import LibraryCard, { cardProps } from "../../components/LibraryCard";
import PlusIcon from "../../assets/plus-icon.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

export default function LibraryPage() : JSX.Element{
  const { userId } = useParams();

  const [libraryData, setLibraryData] = useState<cardProps[]>([]);

  useEffect(() => {
    (async () => {
      const resLibaryData = await axios.get(
        `${import.meta.env.VITE_REST_URL}/library/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLibraryData(resLibaryData.data.playlists);
    })();
  }, [userId]);

    return(
    <section className="px-6 pb-10 xl:px-8 xl:pb-20 mt-8">
        <div className="flex justify-between">
          <h2 className="h1 md:max-lg:text-xl lg:max-xl:text-2xl">Your Library</h2>
          <button 
                data-te-toggle="tooltip"
                title="add episode to library"
                className=" w-[225px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4">
                New Library
                <img 
                className="inline ml-[45px]"
                width={16}
                height={16}
                src={PlusIcon} 
                alt="plus icon" />
          </button>
        </div>
      
        <div className="mt-4 -ml-1.5 px-1.5 py-2 overflow-x-auto xl:mt-4 grid xl:grid-cols-5 lg:grid-cols-4 gap-12">
          { libraryData?.map((data: cardProps) => (
            < LibraryCard {...data}/>
          )) }
        </div>

    </section>
    ); 
}