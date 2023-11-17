import axios from "axios";
import { useLoaderData, useRevalidator } from "react-router-dom";

export type queueItem = {
  Episode: {
    title: string;
    description: string;
    url_thumbnail: string;
    PremiumPodcast: {
      title: string;
    };
  };
};

export default function QueuePage() {
  const queue = useLoaderData() as queueItem[];

  const revalidator = useRevalidator();

  const handleClearQueue = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_REST_URL}/queue`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      revalidator.revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="px-8 mb-8">
      <div className="w-full flex items-end justify-between">
        <h1 className="h1">Your Queue</h1>
        <h4
          onClick={handleClearQueue}
          className="h4 text-[#ed5c5c] hover:text-[#ed5c5c]/80 cursor-pointer"
        >
          Clear Queue
        </h4>
      </div>

      <ul className="w-full mt-[22px]">
        {queue.map((item, idx) => (
          <li
            className="w-full flex items-center justify-between px-8 py-4 group first:bg-NAVY-5 rounded-xl"
            key={idx}
          >
            <div className="flex items-center">
              <p className="w-7 h3 group-first:text-WHITE">
                {idx === 0 ? "#" : idx}
              </p>
              <img
                className="object-cover object-center ml-4 rounded-lg w-[50px] h-[50px]"
                src={`${import.meta.env.VITE_REST_URL}/images/${
                  item.Episode.url_thumbnail
                }`}
                width={50}
                height={50}
                alt="episode thumbnail"
              />

              <div className="ml-6 w-[39.4vw]">
                <h4 className="h4 group-first:text-WHITE">
                  {item.Episode.title}
                </h4>
                <p className="b5 mt-2 text-ellipsis whitespace-nowrap overflow-hidden group-first:text-GRAY-2">
                  {item.Episode.description}
                </p>
              </div>
            </div>

            <p className="h4 text-NAVY-3 group-first:text-WHITE w-[14.68vw] text-ellipsis whitespace-nowrap overflow-hidden">
              {item.Episode.PremiumPodcast.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
