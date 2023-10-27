// Component imports
import { useEffect, useState } from "react";
import PodcastCard, { cardProps } from "./components/PodcastCard";
import axios from "axios";

export default function HomePage(): JSX.Element {
  const [techPodcasts, setTechPodcasts] = useState<cardProps[]>([]);
  const [comedyPodcasts, setComedyPodcasts] = useState<cardProps[]>([]);
  const [horrorPodcasts, setHorrorPodcasts] = useState<cardProps[]>([]);

  useEffect(() => {
    (async () => {
      const resTech = await axios.get(
        "http://127.0.0.1:3000/podcast/random/technology"
      );
      setTechPodcasts(resTech.data.podcasts);

      const resComedy = await axios.get(
        "http://127.0.0.1:3000/podcast/random/comedy"
      );
      setComedyPodcasts(resComedy.data.podcasts);

      const resHorror = await axios.get(
        "http://127.0.0.1:3000/podcast/random/horror"
      );
      setHorrorPodcasts(resHorror.data.podcasts);
    })();
  }, []);

  return (
    <section className="px-8">
      <h2 className="h1">Technology</h2>

      <div className="mt-4 -ml-1.5 px-1.5 py-2 flex gap-8 overflow-x-auto">
        {techPodcasts?.map((podcast: cardProps, idx: number) => (
          <PodcastCard key={idx} {...podcast} />
        ))}
      </div>

      <h2 className="h1 mt-6">Comedy</h2>

      <div className="mt-4 -ml-1.5 px-1.5 py-2 flex gap-8 overflow-x-auto">
        {comedyPodcasts?.map((podcast: cardProps, idx: number) => (
          <PodcastCard key={idx} {...podcast} />
        ))}
      </div>

      <h2 className="h1 mt-6">Horror</h2>

      <div className="mt-4 -ml-1.5 px-1.5 py-2 flex gap-8 overflow-x-auto">
        {horrorPodcasts?.map((podcast: cardProps, idx: number) => (
          <PodcastCard key={idx} {...podcast} />
        ))}
      </div>
    </section>
  );
}
