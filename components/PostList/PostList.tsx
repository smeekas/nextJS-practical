import type { SinglePostType } from "../../HOC/withAuth";
import Post from "../Post/Post";
import WithAuth from "../../HOC/withAuth";
export interface PostListType {
  list: SinglePostType[];
  userId?: string;
}
import { axiosInstance } from "../../helper/axios";
import styles from "./PostList.module.css";
import { useEffect } from "react";

const PostList = (props: PostListType) => {
  return (
    <div className={styles.AllPosts}>
      {props.list.map((item) => {
        return (
          <Post
            liked={item.likedBy.includes(props.userId || "")}
            userId={props.userId!}
            key={item._id}
            data={item}
          />
        );
      })}
    </div>
  );
};
export default WithAuth(PostList);
//do something so that we get ehich post user has liked
