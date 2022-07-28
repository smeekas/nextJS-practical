import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import useAuthStore from "../store";
import { getToken } from "../helper/localStorage";
import { axiosInstance } from "../helper/axios";

import { useRouter } from "next/router";
type ResType = {
  status: boolean;
  userName: string;
  userId: string;
};
function MyApp({ Component, pageProps }: AppProps) {
  // return <h1>asasas</h1>

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const token = getToken();
      console.log("HERE TOKEN effect only ONCE");

      axiosInstance
        .post<ResType>("/user/auth", null, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((data) => {
          // console.log(data);
          axiosInstance.defaults.headers.common["Authorization"] =
            "bearer " + token;
          login(token, data.data.userName, data.data.userId);
        })
        .catch((err) => {
          if (!err.response.data.status) {
            console.log(err.response.data.status);
            router.replace("/Login");
            localStorage.clear();
            logout();
            return;
          }
        });
    }, 150);
  }, [login, logout]);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
