import { NextPage } from "next";
import { useRouter } from "next/router";
import React, {
  Component,
  FunctionComponentFactory,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../helper/axios";
import { getToken } from "../helper/localStorage";
import useAuthStore from "../store";
export type SinglePostType = {
  _id: string;
  text: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  likes: number;
  likedBy: string[];
  __V: number;
};
type ResType = {
  status: boolean;
  userId: string;
  userName: string;
};
interface dummy {
  userId: string;
}
export default function withAuth<P extends {}>(
  Component: React.ComponentType<P>
) {
  const Compo = (props: P) => {
    ("");
    const [authenticated, setAuthenticated] = useState<string>("");
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    useEffect(() => {
      axiosInstance.defaults.headers.common["Authorization"] =
        "bearer " + getToken()!;
      axiosInstance
        .post<ResType>("/user/auth", null, {
          headers: {
            Authorization: "bearer " + getToken(),
          },
        })
        .then((data) => {
          setAuthenticated(data.data.userId);
        })
        .catch((err) => {
          if (!err.response.data.status) {
            logout();
            router.replace("/Login");
          }
        });
    }, [props, logout]);
    return authenticated.length === 0 ? (
      <p className="loading">Loading....</p>
    ) : (
      <Component {...props} userId={authenticated} />
    );
  };

  return Compo;
}