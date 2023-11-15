import axios from "axios";
import { useEffect, useState, useRef} from "react";
import toast, {Toaster} from 'react-hot-toast';
import { IoClose } from "react-icons/io5";


const ProfilePage = ({setIsOpen}:{setIsOpen: (bool: boolean)=>void}) => {
// const ProfilePage = () => {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    //useref
    const profileBox = useRef<HTMLDivElement>(null); 
    const background = useRef<HTMLDivElement>(null);
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
    toast.promise((
    (async () => {
      const res = await axios.put(
        `${import.meta.env.VITE_REST_URL}/profile`, {
          name: name,
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
      console.log(res.status);
      setMessage(res.data.message);
    })()
    ),{
      loading: 'Saving...',
      success: <b>{message}</b>,
      error: <b>{message}</b>,
    });
    if (message == "Profile updated successfully!") {
      setIsOpen(false);
    }
  }

  return (
    <section ref={background} className="flex h-full w-screen bg-black bg-opacity-40 z-10 top-0 right-0 items-center justify-center fixed" >
      <Toaster />
      <div ref={profileBox} className="flex flex-col items-center w-fit h-fit px-7 py-8 border-2 shadow-xl bg-YELLOW-4 opacity-100 gap-1 rounded-xl border-white z-20" >
          <button className="flex self-end" onClick={() => setIsOpen(false)}>
            <IoClose size="30px"/>
          </button>
          <div className="flex flex-row p-12 items-center gap-14">
              <img 
                className="w-[200px] h-[200px] object-cover object-center rounded-full outline outline-white"
                src={import.meta.env.VITE_PHP_STORAGE_URL}
                alt="image"
              />
              <ul className="flex flex-col text-black font-semibold gap-5">
                <li className="">
                  <div className="">Nama</div>
                  <input className="border-0 rounded-lg font-thin" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                </li>
                <li>
                  <div className="sh5" >Username</div>
                  <input className="border-0 rounded-lg font-thin" type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)}/>
                </li>
              </ul>
          </div>
          <button className="bg-white rounded-full px-8 py-4 font-semibold" onClick={onHandleSubmit} disabled={username ? false : (username.length>50 ? true : false)}>Save</button>
      </div>
    </section>
  );
}

export default ProfilePage;