import React, { useState } from "react";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "../../helper/axios";
import useAuthStore from "../../store";
import useMyPostStore from "../../store/myPostStore";
import styles from "./Delete.module.css";
type DeletePropsType = {
  postId: string;
};
function Delete({ postId }: DeletePropsType) {
  const deletePost = useMyPostStore((state) => state.deletePost);
  const [asked, setAsked] = useState(false);
  const deleteHandler = () => {
    // "11e8b15c1cb426abeb782584"
    axiosInstance
      .post("post/delete", { postId: postId })
      .then((data) => {
        console.log(data);
        if (data.data.data.deletedCount === 1) {
          deletePost(postId);
        }
      })
      .catch((err) => {});
  };
  const askedHandler = () => {
    setAsked(true);
  };
  const cancelDeleteHandler=()=>{
    setAsked(false);
  }
  return (
    <>
      {!asked ? (
        <AiFillDelete onClick={askedHandler} className={styles.icon} />
      ) : (
        <div className={styles.permission}>
          <AiOutlineCheck onClick={deleteHandler} className={`${styles.check} ${styles.subIcon}`} />
          <AiOutlineClose onClick={cancelDeleteHandler} className={`${styles.close} ${styles.subIcon}`} />
        </div>
      )}{" "}
    </>
  );
}

export default Delete;
