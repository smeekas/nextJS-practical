import styles from "./CreatePost.module.css";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../helper/axios";
import useMyPostStore from "../../store/myPostStore";
import ErrorCard from "../ErrorCard/ErrorCard";
import { useRouter } from "next/router";
import useAuthStore from "../../store";
function CreatePost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("POST");
  const [text, setText] = useState("");
  const logout = useAuthStore((state) => state.logout);
  const addPost = useMyPostStore((state) => state.addPost);
  const [error, setError] = useState<string | null>(null);
  const hasError = text.trim().length === 0 || text.trim().length > 150;
  useEffect(() => {
    if (!hasError) {
      setError(null);
    }
  }, [hasError]);
  const submitHandler = () => {
    setIsLoading("POSTING...");
    axiosInstance
      .post("/post/create", {
        text: text,
      })
      .then((data) => {
        setText("");
        setIsLoading("POSTED!!!");
        setTimeout(() => {
          setIsLoading("POST");
        }, 2500);
      })
      .catch((err) => {
        setIsLoading("POST");
        if (err.response.status === 401) {
          logout();
          router.replace("/Login");
        }
        setError(err.response.data.message);
      });
  };
  return (
    <div className={styles.createPost}>
      <ErrorCard error={error} />
      <label>Add a Post</label>
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        cols={20}
        rows={4}
      ></textarea>
      <button disabled={isLoading === "POSTING..."} onClick={submitHandler}>
        {isLoading}
      </button>
    </div>
  );
}

export default CreatePost;
