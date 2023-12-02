import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? "https://timely-donut.netlify.app/api/"
      : "http://localhost:3000/api/",
});
