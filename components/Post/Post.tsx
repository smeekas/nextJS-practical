import type { SinglePostType } from "../../pages";
import styles from "./Post.module.css";

import Like from "../Like/Like";
type PostType = {
  data: SinglePostType;
  liked: boolean;
  userId: string;
};
function Post({ data, liked, userId }: PostType) {
  return (
    <div className={styles.post}>
      <section className={styles.userName}>
        <div className={styles.userdata}>
          <h5>{data.createdBy.userName}</h5>
          <p className={styles.date}>{getDate(data.createdAt)}</p>
        </div>
        <Like
          mode={!liked}
          likes={data.likes}
          userId={userId}
          postId={data._id}
        />
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
