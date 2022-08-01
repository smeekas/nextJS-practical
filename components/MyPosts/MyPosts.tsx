import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../helper/axios";
import withAuth from "../../HOC/withAuth";
import { SinglePostType } from "../../pages";
import useMyPostStore from "../../store/myPostStore";
import MyPost from "../MyPost/MyPost";
import styles from "./MyPosts.module.css";
type MyPostsProps = {
  userId: string;
};
function MyPosts(props: MyPostsProps) {
  const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState<SinglePostType[]>([]);

  const posts = useMyPostStore((state) => state.posts);
  const setPosts = useMyPostStore((state) => state.setPosts);
  console.log(posts);
  //TODO use thunk like in zuestand for data fetching
  useEffect(() => {
    console.log();
    axiosInstance
      .get("/post/myPost")
      .then((data) => {
        console.log(data.data.posts);
        setPosts(data.data.posts);
        // setTimeout(() => {
        // }, 10);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [setPosts]);
  if (loading) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className={styles.AllPosts}>
      {posts.length !== 0 ? (
        posts.map((item) => {
          console.log(item);
          return (
            <MyPost
              data={item}
              key={item._id}
              liked={item.likedBy.includes(props.userId)}
              userId={props.userId}
            />
          );
        })
      ) : (
        <h2 className={styles.noPost}>No Posts Found.</h2>
      )}
    </div>
  );
}

export default MyPosts;
