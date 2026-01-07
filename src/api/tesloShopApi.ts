import axios from "axios";

const tesloShopApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

tesloShopApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//TODO interceptores

export { tesloShopApi };
