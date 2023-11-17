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
        `http://localhost:3000/search/podcast?keyword=${keyword}&genre=${selectedGenre}`
      );
      setPodcasts([
        res.data.premiumPodcasts,
        res.data.regularPodcasts,
      ]);
    })
  }, [keyword, selectedGenre])

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:3000/search/episode?keyword=${keyword}&genre=${selectedGenre}`
      );
      setEpisodes([
        res.data.premiumEpisodes,
        res.data.regularEpisodes,
      ]);
    })
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
        <div>
          <button onClick={() => {setIsShowEps(true); setIsShowPodcast(true)}}>all</button>
          <button onClick={() => {setIsShowEps(false); setIsShowPodcast(true)}}>podcast</button>
           <button onClick={() => {setIsShowPodcast(false); setIsShowEps(true)}}>eps</button>
        </div>
        
      </div>

      <main>
        <div className="mt-2 -ml-1.5 px-1.5 py-2 flex justify-between overflow-x-auto xl:mt-4">
          {
            isShowPodcast ? 
            <div>
              <p>PODCAST</p>
            {podcasts
              .map((podcast: cardProps, idx: number) => (
                <PodcastCard key={idx} {...podcast} />
              ))}
            </div>
            : <></>
          }
          {
            isShowEps ? 
            <div>
              <p>EPISODE</p>
            {
              episodes.map((eps: cardEpsProps, idx: number) => (
                <EpisodeCard key={idx} {...eps} />
              ))}

            </div>
            : <></>
          }
        </div>
      </main>
    </section>
  );
}

export default SearchPage;