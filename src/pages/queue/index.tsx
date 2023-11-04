export default function QueuePage() {
  const dummyQueue = [
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Nama Podcast",
      imageurl: "/escape.jpg",
      position: 1,
    },
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Nama Podcast",
      imageurl: "/escape.jpg",
      position: 2,
    },
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Nama Podcast Kedua",
      imageurl: "/escape.jpg",
      position: 3,
    },
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Nama Podcast Panjang Banget",
      imageurl: "/escape.jpg",
      position: 4,
    },
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Podcast",
      imageurl: "/escape.jpg",
      position: 5,
    },
    {
      episodeTitle: "Ini Contoh Judul Episode Podcast Bisa Agak Panjang",
      description:
        "Contoh deskripsi podcast bisa panjang banget batesnya 150 karakter sampe panjang banget ya gitulah pokoknya",
      podcastName: "Nama Podcast Keenam",
      imageurl: "/escape.jpg",
      position: 6,
    },
  ];

  return (
    <section className="px-8 mb-8">
      <h1 className="h1">Your Queue</h1>

      <ul className="w-full mt-[22px]">
        {dummyQueue.map((item, idx) => (
          <li className="w-full flex items-center justify-between px-8 py-4 group first:bg-NAVY-5 rounded-xl" key={idx}>
            <div className="flex items-center">
              <p className="w-4 h3 group-first:text-WHITE">{idx === 0 ? "#" : idx}</p>
              <img className="object-cover object-center ml-4 rounded-lg w-[50px] h-[50px]" src={item.imageurl} width={50} height={50} alt="episode thumbnail" />

              <div className="ml-6 w-[39.4vw]">
                <h4 className="h4 group-first:text-WHITE">{item.episodeTitle}</h4>
                <p className="b5 mt-2 text-ellipsis whitespace-nowrap overflow-hidden group-first:text-GRAY-2">{item.description}</p>
              </div>
            </div>

            <p className="h4 text-NAVY-3 group-first:text-WHITE w-[14.68vw] text-ellipsis whitespace-nowrap overflow-hidden">{item.podcastName}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
