import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../helper/axios";
import withAuth from "../../HOC/withAuth";
import { SinglePostType } from "../../pages";
import MyPost from "../MyPost/MyPost";
type MyPostsProps = {
  userId: string;
};
function MyPosts(props: MyPostsProps) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SinglePostType[]>([]);

  useEffect(() => {
    console.log();
    axiosInstance
      .get("/post/myPost")
      .then((data) => {
        setPosts(data.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h2>Loading....</h2>;
  }
  return (
    <>
      {posts.map((item) => {
        return (
          <MyPost
            data={item}
            key={item._id}
            liked={item.likedBy.includes(props.userId)}
            userId={props.userId}
          />
        );
      })}
    </>
  );
}

export default MyPosts;
