import React from "react";
import type { SinglePostType } from "../../pages";
import Delete from "../Delete/Delete";
type MyPostType = {
  data: SinglePostType;
  liked: boolean;
  userId: string;
};
import Like from "../Like/Like";
import styles from "./MyPost.module.css";
function MyPost({ data, liked, userId }: MyPostType) {
  return (
    <div className={styles.post}>
      <section className={styles.userName}>
        <p className={styles.date}>{getDate(data.createdAt)}</p>
        <div className={styles.icons}>
          <Delete postId={data._id} />
          <Like
            mode={!liked}
            likes={data.likes}
            userId={userId}
            postId={data._id}
          />
        </div>
      </section>
      <section className={styles.content}>
        <section className={styles.textContent}>{data.text}</section>
      </section>
    </div>
  );
}

export default MyPost;
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
