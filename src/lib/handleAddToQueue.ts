import axios from "axios";

export const handleAddToQueue = async (idpodcast: number) => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  await axiosInstance.delete(`${import.meta.env.VITE_REST_URL}/queue`);

  await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/queue/podcast`, {
    idPodcast: idpodcast,
  });

  if (queue.current) {
    await axiosInstance.post(`${import.meta.env.VITE_REST_URL}/queue/forward`);
  }

  const [current, next, prev] = await Promise.all([
    axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/current`),
    axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/next`),
    axiosInstance.get(`${import.meta.env.VITE_REST_URL}/queue/previous`),
  ]);

  const tempQueue: Queue = {
    prev: prev.data.result,
    current: current.data.result,
    next: next.data.result,
  };

  dispatchQueue({ type: "SET_QUEUE", payload: tempQueue });
};
