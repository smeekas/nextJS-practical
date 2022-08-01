import React from "react";
import CreatePost from "../components/CreatePost/CreatePost";
import MyPosts from "../components/MyPosts/MyPosts";
import withAuth from "../HOC/withAuth";
import styles from "../styles/Profile.module.css";
type ProfileProps = {
  userId: string;
};
function Profile(props: ProfileProps) {
  return (
    <>
      <div className={styles.profile}>
        <CreatePost />
      </div>

      <div className={styles.MyPosts}>
        <h2 className={styles.myPost}>My Posts</h2>
        <MyPosts userId={props.userId} />
      </div>
    </>
  );
}

// export default Profile;
export default withAuth(Profile);
