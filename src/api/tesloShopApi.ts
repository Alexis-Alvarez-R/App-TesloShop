import axios from "axios";

const tesloShopApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//TODO interceptores

export { tesloShopApi };
