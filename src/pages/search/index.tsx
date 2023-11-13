import {  } from "@chakra-ui/react";
import SearchIconBlack from "../../assets/search-icon-black.svg";
// import ChevronDownIcon from "../../assets/chevron-down.svg";
// import ChevronUpIcon from "../../assets/chevron-up.svg";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Select, {SingleValue, ActionMeta} from 'react-select';

// const ChevronIcon = ({isDown} : {isDown : boolean}) => {
//   return (
//     isDown ? <img src={ChevronDownIcon} width={10} height={10} alt="" /> :
//     <img src={ChevronUpIcon} width={10} height={10} alt="" />
//   );
// };


const SearchPage = () => {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedEpLength, setSelectedEpLength] = useState<number>(0);

  const genres: {value:string, label:string}[] = [
    { value: 'COMEDY', label: 'Comedy' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'HORROR', label: 'Horror' },
  ];

  const epsLengths: {value:number, label:string}[] = [
    { value: 50, label: 'Less than 50' },
    { value: 100, label: '50 until 100' },
    { value: 999, label: 'More than 100' },
  ];

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:3000/search/${keyword}/${selectedGenre}/${selectedEpLength}`
      );
      setResult(res.data.podcasts);
    })
  }, )

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const onHandleGenre = (newValue: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>) => {
    if (newValue) setSelectedGenre(newValue.value);
    actionMeta
  };
  
  const onHandleEps = (newValue: SingleValue<{ value: number; label: string; }>, actionMeta: ActionMeta<{ value: number; label: string; }>) => {
    if (newValue) setSelectedEpLength(newValue.value);
    actionMeta
  };
  

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
            <Select
              options={epsLengths} 
              placeholder="Episode Length" 
              onChange={onHandleEps}
            />
          </div>
        </div>
        <div>
          podcast eps
        </div>
        
      </div>

      <main>
        <div className="mt-2 -ml-1.5 px-1.5 py-2 flex justify-between overflow-x-auto xl:mt-4">
          {result}
        </div>
      </main>
    </section>
  );
}

export default SearchPage;