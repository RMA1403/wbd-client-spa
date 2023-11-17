import axios from "axios";
import { useEffect, useState} from "react";
import toast, {Toaster} from 'react-hot-toast';
import { IoClose } from "react-icons/io5";


const SubscriptionPage = ({setIsSubsOpen}:{setIsSubsOpen: (bool: boolean)=>void}) => {
    const [expiredDate, setExpiredDate] = useState<string>("");

    useEffect (() => {
        (async () => {
            const res = await axios.get(
            `${import.meta.env.VITE_REST_URL}/subs/expired`,
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );
    
            setExpiredDate(res.data.result);
        })();
    }, [expiredDate]);

    const onHandleExtend = () => {
        toast.promise((
        (async () => {
          await axios.post(
            `${import.meta.env.VITE_REST_URL}/subs/extend`, {},{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
          )
        })()
        ),{
          loading: 'Loading...',
          success: <b>Your Subscription has extended!</b>,
          error: <b>Failed to extend</b>,
        });
      }


  return (
    <section className="flex h-full w-screen bg-black bg-opacity-40 z-10 top-0 right-0 items-center justify-center fixed" >
      <Toaster />
      <div className="flex flex-col items-center w-fit h-fit px-7 py-8 border-2 shadow-xl bg-YELLOW-4 opacity-100 gap-1 rounded-xl border-blue z-20" >
          <button className="flex self-end" onClick={() => setIsSubsOpen(false)}>
            <IoClose size="30px"/>
          </button>
          <p className="flex self-center font-bold text-3xl">SUBSCRIPTION</p>
          <div className="flex flex-row p-12 items-center gap-14">
              <ul className="flex flex-col text-black font-semibold gap-5">
                <li className="">
                  <div className="self-center">Expired date</div>
                  <input className="border-0 rounded-lg font-thin text-black" value={expiredDate} type="text" disabled/>
                </li>
              </ul>
          </div>
          <button className="bg-white rounded-full px-8 py-4 font-semibold hover:scale-110" onClick={onHandleExtend} >Extend</button>
      </div>
    </section>
  );
}

export default SubscriptionPage;