import type { SinglePostType } from "../../pages";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./Post.module.css";
import { axiosInstance } from "../../helper/axios";
import { useState } from "react";
type PostType = {
  data: SinglePostType;
  liked: boolean;
  userId: string;
};
function Post({ data, liked, userId }: PostType) {
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
        <h5>{data.createdBy.userName}</h5>
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
export default Post;
