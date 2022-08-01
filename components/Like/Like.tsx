import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./Like.module.css";
import { axiosInstance } from "../../helper/axios";
import useAuthStore from "../../store";
import { useRouter } from "next/router";
type LikePropsType = {
  userId: string;
  postId: string;
  likes: number;
  mode: boolean;
};
function Like({ userId, postId, likes, mode }: LikePropsType) {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState({
    count: likes,
    mode: mode,
  });
  const likeHandler = async () => {
    axiosInstance
      .post("/post/like", {
        mode: isLiked.mode,
        likedById: userId,
        postId: postId,
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
        if (err.response.status === 401) {
          logout();
          router.push("/Login");
        }
        console.log(err);
      });
  };
  return (
    <div className={styles.likes}>
      {isLiked.mode ? (
        <AiOutlineHeart onClick={likeHandler} className={styles.icon} />
      ) : (
        <AiFillHeart onClick={likeHandler} className={styles.icon} />
      )}

      <section className={styles.likeCount}>
        {isLiked.count > 0 ? isLiked.count : " "}
      </section>
    </div>
  );
}

export default Like;
