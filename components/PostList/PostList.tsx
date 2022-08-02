import type { SinglePostType } from "../../pages/index";
import Post from "../Post/Post";
import WithAuth from "../../HOC/withAuth";
export interface PostListType {
  list: SinglePostType[];
  userId?: string;
}
import styles from "./PostList.module.css";

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
