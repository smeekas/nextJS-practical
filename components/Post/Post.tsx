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
        <div className={styles.userdata}>
          <h5>{data.createdBy.userName}</h5>
          <p className={styles.date}>{getDate(data.createdAt)}</p>
        </div>
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
      </section>
      <section className={styles.content}>
        <section className={styles.textContent}>{data.text}</section>
      </section>
    </div>
  );
}
export default Post;

const getDate = (date: string) => {
  const dateObj = new Date(date);
  const yyyy = dateObj.getFullYear();
  let mm: number | string = dateObj.getMonth() + 1; // Months start at 0!
  let dd: number | string = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return formattedToday;
};
