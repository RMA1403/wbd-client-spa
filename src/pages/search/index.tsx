import {  } from "@chakra-ui/react";
import SearchIconBlack from "../../assets/search-icon-black.svg";
// import ChevronDownIcon from "../../assets/chevron-down.svg";
// import ChevronUpIcon from "../../assets/chevron-up.svg";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import axios from "axios";

// const ChevronIcon = ({isDown} : {isDown : boolean}) => {
//   return (
//     isDown ? <img src={ChevronDownIcon} width={10} height={10} alt="" /> :
//     <img src={ChevronUpIcon} width={10} height={10} alt="" />
//   );
// };

const SearchPage = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:3000/podcast/random/technology"
      );
      setResult(res.data.podcasts);
    })
  }, [])



  return (
    <section className="flex flex-col">
      {/* search bar */}
      <div className="flex flex-col">
        <div className="flex flex-row px-8 gap-8">

          {/* search */}
          <div className="flex border border-black p-2 rounded-full gap-4 w-6/12">
            <img src={SearchIconBlack} width={20} height={20} alt="" />
            <Editable placeholder="What do you want to listen to?">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </div>

          {/* filter */}
          <div className="flex">
            <Select defaultValue="all" className="w-4/12">
              <option value='all'>All Genre</option>
              <option value='tech'>Technology</option>
              <option value='comedy'>Comedy</option>
              <option value='sports'>Sports</option>
            </Select>
            
            <Select defaultValue="all" className="w-4/12">
              <option value='all'>All Episode</option>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            
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