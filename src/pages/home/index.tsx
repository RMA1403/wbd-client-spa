// Component imports
import { useEffect, useState } from "react";
import PodcastCard, { cardProps } from "../../components/PodcastCard";
import axios from "axios";

export default function HomePage(): JSX.Element {
  // Component states
  const [cardCount, setCardCount] = useState(4);
  const [techPodcasts, setTechPodcasts] = useState<cardProps[]>([]);
  const [comedyPodcasts, setComedyPodcasts] = useState<cardProps[]>([]);
  const [horrorPodcasts, setHorrorPodcasts] = useState<cardProps[]>([]);

  useEffect(() => {
    if (window) {
      if (window.innerWidth >= 1500) {
        setCardCount(5);
      } else if (window.innerWidth >= 1024) {
        setCardCount(4);
      } else {
        setCardCount(3);
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 1500) {
          setCardCount(5);
        } else if (window.innerWidth >= 1024) {
          setCardCount(4);
        } else {
          setCardCount(3);
        }
      });
    }

    (async () => {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const [resTech, resComedy, resHorror] = await Promise.all([
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/podcast/random/technology`
        ),
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/podcast/random/comedy`
        ),
        axiosInstance.get(
          `${import.meta.env.VITE_REST_URL}/podcast/random/horror`
        ),
      ]);

      setTechPodcasts(resTech.data.podcasts);
      setComedyPodcasts(resComedy.data.podcasts);
      setHorrorPodcasts(resHorror.data.podcasts);
    })();
  }, []);

  return (
    <section className="px-6 pb-10 xl:px-8 xl:pb-20">
      <h2 className="h1 md:max-lg:text-xl lg:max-xl:text-2xl">Technology</h2>

      <div className="mt-2 -ml-1.5 px-1.5 py-2 flex justify-between overflow-x-auto xl:mt-4">
        {techPodcasts
          ?.slice(0, cardCount)
          .map((podcast: cardProps, idx: number) => (
            <PodcastCard key={idx} {...podcast} />
          ))}
      </div>

      <h2 className="h1 mt-4 md:max-lg:text-xl lg:max-xl:text-2xl xl:mt-6">
        Comedy
      </h2>

      <div className="mt-2 -ml-1.5 px-1.5 py-2 flex justify-between overflow-x-auto xl:mt-4">
        {comedyPodcasts
          ?.slice(0, cardCount)
          .map((podcast: cardProps, idx: number) => (
            <PodcastCard key={idx} {...podcast} />
          ))}
      </div>

      <h2 className="h1 mt-4 md:max-lg:text-xl lg:max-xl:text-2xl xl:mt-6">
        Horror
      </h2>

      <div className="mt-2 -ml-1.5 px-1.5 py-2 flex justify-between overflow-x-auto xl:mt-4">
        {horrorPodcasts
          ?.slice(0, cardCount)
          .map((podcast: cardProps, idx: number) => (
            <PodcastCard key={idx} {...podcast} />
          ))}
      </div>
    </section>
  );
}
