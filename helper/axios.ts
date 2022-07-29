import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://timely-donut.netlify.app/api/",
});