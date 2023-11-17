import {  } from "@chakra-ui/react";
import SearchIconBlack from "../../assets/search-icon-black.svg";
import PodcastCard, { cardProps } from "../../components/PodcastCard";
import EpisodeCard, { cardEpsProps } from "../../components/EpisodeCard";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Select, {ActionMeta} from 'react-select';

// const ChevronIcon = ({isDown} : {isDown : boolean}) => {
//   return (
//     isDown ? <img src={ChevronDownIcon} width={10} height={10} alt="" /> :
//     <img src={ChevronUpIcon} width={10} height={10} alt="" />
//   );
// };


const SearchPage = () => {
  const [podcasts, setPodcasts] = useState<cardProps[]>([]);
  const [episodes, setEpisodes] = useState<cardEpsProps[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");
  const [isShowPodcast, setIsShowPodcast] = useState<boolean>(true);
  const [isShowEps, setIsShowEps] = useState<boolean>(true);

  const genres: string[] = [
    'comedy',
    'technology',
    'horror',
  ];

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:3000/search/podcast?keyword=${keyword}&genre=${selectedGenre}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPodcasts([
        res.data.premiumPodcasts,
        res.data.regularPodcasts,
      ]);
    })()
  }, [keyword, selectedGenre])

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:3000/search/episode?keyword=${keyword}&genre=${selectedGenre}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEpisodes([
        res.data.premiumEpisodes,
        res.data.regularEpisodes,
      ]);
    })()
  }, [keyword, selectedGenre])

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const onHandleGenre = (option: string | null, actionMeta: ActionMeta<string>) => {
    setSelectedGenre(option);
    actionMeta.action === "clear" && setSelectedGenre(null);
  }
  
  

  return (
    <section className="flex flex-col">
      {/* search bar */}
      <div className="flex flex-col">
        <div className="flex flex-row px-8 gap-8">

          {/* search */}
          <div className="flex border border-black p-2 rounded-full gap-4 w-6/12">
            <img src={SearchIconBlack} width={20} height={20} alt="" />
            <input
              type="text"
              className="border-0"
              value={keyword}
              onChange={handleSearch}
            />
          </div>

          {/* filter */}
          <div className="flex">
            <Select 
              options={genres} 
              placeholder="Genre" 
              onChange={onHandleGenre} 
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 ml-8 mt-2">
          <button className="flex bg-YELLOW-5 text-black rounded-full px-4 py-2 hover:scale-110" onClick={() => {setIsShowEps(true); setIsShowPodcast(true)}}>all</button>
          <button className="flex bg-YELLOW-5 text-black rounded-full px-4 py-2 hover:scale-110" onClick={() => {setIsShowEps(false); setIsShowPodcast(true)}}>podcast</button>
           <button className="flex bg-YELLOW-5 text-black rounded-full px-4 py-2 hover:scale-110" onClick={() => {setIsShowPodcast(false); setIsShowEps(true)}}>eps</button>
        </div>
        
      </div>

      <main className="px-8">
        <div className="flex flex-col mt-2 -ml-1.5 px-1.5 py-2 gap-y-3 justify-between overflow-x-auto xl:mt-4">
          {
            isShowPodcast ? 
            <div>
              <p className="text-black text-3xl font-bold">PODCAST</p>
              <div className="grid grid-cols-5 content-start gap-4">
                {podcasts
                  .map((podcast: cardProps, idx: number) => (
                    <PodcastCard key={idx} {...podcast} />
                  ))}
              </div>

            </div>
            : <></>
          }
          {
            isShowEps ? 
            <div>
              <p className="text-black text-3xl font-bold">EPISODE</p>
              <div className="grid grid-cols-5 content-start gap-4">
                { episodes.map((eps: cardEpsProps, idx: number) => (
                  <EpisodeCard key={idx} {...eps} />
                ))}
              </div>
            </div>
            : <></>
          }
        </div>
      </main>
    </section>
  );
}

export default SearchPage;