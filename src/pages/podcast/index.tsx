// import Episode from "../../components/EpisodeList"
import PodcastHeader from "../../components/PodcastHeader";

export default function PodcastPage() : JSX.Element{
    return(
        // <Episode order={1} 
        // title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        // description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        // imageurl=""/>

        <PodcastHeader 
        genre="Technology"
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam massa, tristique sed dui a, finibus eleifend sapien. Mauris placerat metus id mauris fermentum condimentum."
        title="Contoh Judul Podcast Yang Bisa Sampe Dua Baris"
        creator="User 101"
        imageurl=""
        />

    );
    
}