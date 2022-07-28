import styles from "./CreatePost.module.css";
import React, { useState } from "react";
import { useRef } from "react";
import { axiosInstance } from "../../helper/axios";
import useMyPostStore from "../../store/myPostStore";
function CreatePost() {
  const postRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState("POST");
  const addPost = useMyPostStore((state) => state.addPost);
  const submitHandler = () => {
    setIsLoading("POSTING...");
    axiosInstance
      .post("/post/create", {
        text: postRef.current!.value,
      })
      .then((data) => {
        postRef.current!.value = "";
        console.log(data);
        addPost(data.data.data);
        setIsLoading("POSTED!!!");
        setTimeout(() => {
          setIsLoading("POST");
        }, 1500);
      });
  };
  return (
    <div className={styles.createPost}>
      <label>Add a Post</label>
      <textarea ref={postRef} cols={20} rows={4}></textarea>
      <button disabled={isLoading === "POSTING..."} onClick={submitHandler}>
        {isLoading}
      </button>
    </div>
  );
}

export default CreatePost;
