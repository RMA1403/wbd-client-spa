import EpisodeHeader, { headerProps } from "../../components/EpisodeHeader";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function PodcastPage() : JSX.Element{
    const { episodeId } = useParams();

    const [episodeHeader, setEpisodeHeader] = useState<headerProps>();

    useEffect(() => {
        (async () => {
            const resEpisodeHeader = await axios.get(
                `http://localhost:3000/episode/${episodeId}`
            );
            setEpisodeHeader(resEpisodeHeader.data.episode[0]);
        })(); 
    }, [episodeId])

    return(
        <div className="ml-[100px]">
            {episodeHeader? (<EpisodeHeader {...episodeHeader}/>) : <h1 className="h1">Episode Tidak Ditemukan</h1>}
        </div>

    );
    
}