import styles from "./CreatePost.module.css";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { axiosInstance } from "../../helper/axios";
import useMyPostStore from "../../store/myPostStore";
import ErrorCard from "../ErrorCard/ErrorCard";
import { useRouter } from "next/router";
import useAuthStore from "../../store";
function CreatePost() {
  const router=useRouter()
  // const postRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState("POST");
  const [text, setText] = useState("");
  const logout=useAuthStore(state=>state.logout);
  const addPost = useMyPostStore((state) => state.addPost);
  const [error, setError] = useState<string | null>(null);
  // const showErr = (msg: string, msgAfterTimeout: string | null) => {
  //   setError(msg);
  //   setTimeout(() => {
  //     setError(msgAfterTimeout);
  //   }, 1500);
  // };
  const hasError = text.trim().length === 0 || text.trim().length > 150;
  console.log(hasError);
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
        // postRef.current!.value = "";
        setText("");
        console.log(data);
        addPost(data.data.data);
        setIsLoading("POSTED!!!");
        setTimeout(() => {
          setIsLoading("POST");
        }, 2500);
        // showErr("POSTED!!", "POST");
      })
      .catch((err) => {
        console.log(err);
        
        setIsLoading("POST");
        if(err.response.status===401){
          logout();
          router.replace('/Login')
        }
        setError(err.response.data.message);
        // showErr(err.response.data.message, null);
        console.log(err);
      });
  };
  return (
    <div className={styles.createPost}>
      <ErrorCard error={error} />
      {/* {error && <p className={styles.err}>{error}</p>}  */}
      
      <label>Add a Post</label>
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        // ref={postRef}
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
