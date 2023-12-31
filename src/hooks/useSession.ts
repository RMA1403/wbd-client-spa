import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useSession() {
  const [isSessionValid, setSessionValid] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { search } = useLocation();
  const queryToken = new URLSearchParams(search).get("token");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token") || queryToken;

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.post(
          `${import.meta.env.VITE_REST_URL}/token/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          res.data.message !== "user not subscribed" &&
          res.data.message !== "invalid token" &&
          res.data.message !== "error"
        ) {
          setSessionValid(true);
        }

        setLoading(false);
      } catch (err) {
        setSessionValid(false);
        setLoading(false);
      }
    })();
  });

  return { isSessionValid, isLoading };
}
