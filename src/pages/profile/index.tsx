import axios from "axios";
import { useEffect, useState} from "react";
// import toast from 'react-hot-toast';


export default function ProfilePage(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    
    useEffect (() => {
      (async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_REST_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const res2 = res.data;

        setName(res2.name);
        setUsername(res2.username);
      })();
    }, []);

  const onHandleSubmit = () => {
    (async () => {
      console.log(`Bearer ${localStorage.getItem("token")}`);
      await axios.put(
        `${import.meta.env.VITE_REST_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {
            name: name,
            username: username,
          }
        }
        )
        console.log('gilsss');
    })()

    // toast.promise((

    // ),{
    //   loading: 'Saving...',
    //   success: <b>Profile updated successfully!</b>,
    //   error: <b>Could not save.</b>,
    // });
  }

    return (
      <section className="flex h-full w-screen bg-black bg-opacity-40 z-10 top-0 right-0 items-center justify-center fixed ">
        <div className="flex flex-col items-center w-fit h-fit px-7 py-8 border-2 shadow-xl bg-YELLOW-4 opacity-100 gap-5 rounded-xl border-white">
            <div className="flex flex-row p-12 items-center gap-14">
                <img 
                  className="w-[200px] h-[200px] object-cover object-center rounded-full"
                  src={import.meta.env.VITE_PHP_STORAGE_URL}
                  alt="image"
                />
                <ul className="flex flex-col text-black font-semibold gap-3">
                  <li className="">
                    <div className="">Nama</div>
                    <input className="border-0 rounded-lg font-thin" type="text" defaultValue={name}/>
                  </li>
                  <li>
                    <div className="sh5" >Username</div>
                    <input className="border-0 rounded-lg font-thin" type="text" defaultValue={username}/>
                  </li>
                </ul>
            </div>
            <button className="bg-white rounded-full px-8 py-4 font-semibold" onClick={onHandleSubmit} disabled={username ? false : ( username.length>50 ? true : false)}>Save</button>
        </div>
      </section>
    );
}