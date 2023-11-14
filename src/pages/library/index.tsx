import LibraryCard from "../../components/LibraryCard";
import PlusIcon from "../../assets/plus-icon.svg";
export default function LibraryPage() : JSX.Element{
    
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
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
        <LibraryCard title="Test Library" imageurl="boong"/>
      </div>

    </section>
    ); 
}