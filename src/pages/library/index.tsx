import LibraryCard, { cardProps } from "../../components/LibraryCard";
import PlusIcon from "../../assets/plus-icon.svg";
// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast';

export default function LibraryPage() : JSX.Element{
  // const { userId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [libraryData, setLibraryData] = useState<cardProps[]>([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>("");


  const handleNewPlaylistSubmit = () => {
    toast.promise((
      (async () => {
        await axios.post(
          `${import.meta.env.VITE_REST_URL}/library`,
          {
            title: newPlaylistTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      })()
      ),{
        loading: 'loading...',
        success: "New Playlist Created!",
        error: "Fail To Create Playlist!",
      });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    (async () => {
      const resLibaryData = await axios.get(
        `${import.meta.env.VITE_REST_URL}/library`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLibraryData(resLibaryData.data.playlists);
    })();
  }, []);

    return(
    <section className="px-6 pb-10 xl:px-8 xl:pb-20 mt-8">
      <Toaster position="top-center"/>
        <div className="flex justify-between mr-12">
          <h2 className="h1 md:max-lg:text-xl lg:max-xl:text-2xl">Your Library</h2>
          <button 
                onClick={toggleVisibility}
                data-te-toggle="tooltip"
                title="add episode to library"
                className=" xl:w-[200px] h-[50px] bg-NAVY-5 text-white rounded-[32px] h4 leading-4">
                New Playlist
                <img 
                className="inline ml-[45px]"
                width={16}
                height={16}
                src={PlusIcon} 
                alt="plus icon" />
          </button>
        </div>

        { isVisible && 
        <div className="mt-5 w-[300px] h-[150px] bg-white shadow-lg rounded-md hover:shadow-xl px-2 border-NAVY-5 border-2 border-opacity-70 absolute right-10 z-10">
            <h2 className="h3 text-center mt-2">New Playlist</h2>
            <form className="flex flex-col mt-2 justify-center">
              <input className="rounded-xl placeholder:opacity-80" type="text" required placeholder="New Playlist Title" onChange={(e) => setNewPlaylistTitle(e.target.value)}/>
              <button onClick={handleNewPlaylistSubmit} className="bg-NAVY-5 rounded-lg w-[100px] h-[30px] text-white mt-5 self-center" type="submit" >Submit</button>
            </form>
        </div>
        }

        <div className= {`${
          isVisible ? 'blur-[3px]' : ''}
        mt-4 -ml-1.5 px-1.5 py-2 xl:mt-4 flex flex-wrap align-start gap-20`}
        onClick={isVisible? toggleVisibility: undefined}
        > 
          { libraryData?.map((data: cardProps, idx: number) => (
            < LibraryCard {...data} key={idx}/>
          )) }

        </div>

    </section>
    ); 
}