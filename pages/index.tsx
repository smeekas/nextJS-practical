import type { NextPage } from "next";

import { GetServerSidePropsContext } from "next";

import { AxiosResponse } from "axios";
import { axiosInstance } from "../helper/axios";

import PostList from "../components/PostList/PostList";
export type SinglePostType = {
  _id: string;
  text: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[];
  __V: number;
};
type HomePropsType = {
  data: SinglePostType[];
};
const Home: NextPage<HomePropsType> = ({ data }: HomePropsType) => {
  return <PostList list={data} />;
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const posts: AxiosResponse = await axiosInstance.get<SinglePostType[]>(
      "post/getAll"
    );
    const data: SinglePostType[] = posts.data;
    return {
      props: data,
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
}
