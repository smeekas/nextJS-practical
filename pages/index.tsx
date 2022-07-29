import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GetServerSidePropsContext } from "next";
import Post from "../components/Post/Post";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../helper/axios";
import withAuth from "../HOC/withAuth";
import PostList from "../components/PostList/PostList";
export type SinglePostType = {
  _id: string;
  text: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt:string
  updatedAt:string
  likes: number;
  likedBy: string[];
  __V: number;
};
type HomePropsType = {
  data: SinglePostType[];
};
const Home: NextPage<HomePropsType> = ({ data }: HomePropsType) => {
  return (
    <PostList list={data} />
    // <div className={styles.AllPosts}>
    //   {data.map((item) => {
    //     return <Post key={item._id} data={item} />;
    //   })}
    // </div>
  );
};

// export default withAuth(Home);
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
    // console.log(err);
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
  // const data = { data: [] };
}
