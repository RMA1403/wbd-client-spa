import axios from "axios";

export default function ProfilePage(): JSX.Element {

    const getProfileData = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_REST_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        console.log(res.data.result);
        return (res.data);
      };
    return (
        <section>
            <button onClick={getProfileData}>Get profile data</button>
        </section>
    );
}