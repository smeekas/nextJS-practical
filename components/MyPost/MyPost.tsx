import React from "react";
import type { SinglePostType } from "../../pages";
type MyPostType = {
  data: SinglePostType;
  liked: boolean;
  userId: string;
};
import styles from "./MyPost.module.css";
import { axiosInstance } from "../../helper/axios";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
function MyPost({ data, liked, userId }: MyPostType) {
  const [isLiked, setIsLiked] = useState({
    count: data.likes,
    mode: !liked,
  });
  const likeHandler = async () => {
    axiosInstance
      .post("/post/like", {
        mode: isLiked.mode,
        likedById: userId,
        postId: data._id,
      })
      .then((data) => {
        console.log(data);
        // if (isLiked.mode) {
        setIsLiked((prev) => {
          return {
            mode: !prev.mode,
            count: data.data.data.likes,
          };
        });
        // }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.post}>
      <section className={styles.userName}>
        <div className={styles.likes}>
          {isLiked.mode ? (
            <AiOutlineHeart onClick={likeHandler} className={styles.icon} />
          ) : (
            <AiFillHeart onClick={likeHandler} className={styles.icon} />
          )}

          <p className={styles.likeCount}>
            {isLiked.count > 0 ? isLiked.count : " "}
          </p>
        </div>
      </section>
      <section className={styles.content}>
        <section className={styles.textContent}>{data.text}</section>
      </section>
    </div>
  );
}

export default MyPost;
