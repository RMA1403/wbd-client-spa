import Episode from "../../components/EpisodeList"
import PodcastHeader from "../../components/PodcastHeader";

export default function PodcastPage() : JSX.Element{
    return(
        <div className="ml-[40px]">
        
        <div>
        <PodcastHeader
        genre="Technology"
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe tiga baris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam massa, tristique sed dui a, finibus eleifend sapien. Mauris placerat metus id mauris fermentum condimentum."
        title="Contoh Judul Podcast Yang Bisa Sampe Dua Baris"
        creator="User 101"
        imageurl=""
        />
        <hr className="h-px mt-[30px] ml-[-40px] bg-black bg-opacity-40"/>
        </div>

        <section className="ml-[60px] mt-[20px] overflow-y-scroll h-[60vh] mb-[60px]">
        <Episode order={1} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={2} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={3} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={4} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={5} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={6} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={7} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>

        <Episode order={8} 
        title="Ini Contoh Judul Podcast Bisa Agak Panjang" 
        description="Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe kemana ya ini aisjdiasjdiasjd" 
        imageurl=""/>
        </section>
        </div>



    );
    
}