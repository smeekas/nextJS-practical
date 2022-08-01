import InputBox from "../components/InputBox/InputBox";
import styles from "../styles/Signup.module.css";
import AuthCard from "../components/AuthCard/Authcard";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import ErrorCard from "../components/ErrorCard/ErrorCard";
type stateprops = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
};
const iniialState: stateprops = {
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
};

export type ActionType = "email" | "userName" | "password" | "confirmPassword";
export type Action = {
  type: "email" | "userName" | "password" | "confirmPassword";
  value: string;
};
const reducer = (state = iniialState, action: Action) => {
  if (action.type === "email") {
    return { ...state, email: action.value };
  }
  if (action.type === "userName") {
    return { ...state, userName: action.value };
  }
  if (action.type === "password") {
    return { ...state, password: action.value };
  }
  if (action.type === "confirmPassword") {
    return { ...state, confirmPassword: action.value };
  }
  return state;
};
function getError(state: stateprops) {
  return (
    !state.email.trim().includes("@") ||
    state.password.trim().length < 6 ||
    state.password.trim() !== state.confirmPassword.trim()
  );
}
export default function Signup() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, iniialState);
  const [error, setError] = useState<string | null>(null);
  const hasError = getError(state);
  useEffect(() => {
    if (!hasError) {
      setError(null);
    }
  }, [hasError]);
  const submitHandler = async () => {
    if (!state.email.trim().includes("@")) {
      setError("Invalid Email");
      return;
    }
    if (state.password.trim().length < 7) {
      setError("Password length must be >=7 characters");
      return;
    }
    if (state.password.trim() !== state.confirmPassword.trim()) {
      setError("password & confirm password must match");
      return;
    }
    // console.log(state);
    //!validation
    //!custom hook for http?
    //!custom hook for input
    await fetch("/api/user/create/", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        userName: state.userName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.created) {
          router.replace("/Login");
        }else{
          setError(data.message)
        }
      });
  };
  return (
    <AuthCard>
      <ErrorCard error={error} />
      <InputBox
        actionType="email"
        labelName="Email"
        inputType="email"
        onChange={(val) => dispatch({ type: "email", value: val })}
      />
      <InputBox
        actionType="userName"
        labelName="User name"
        inputType="text"
        onChange={(val) => dispatch({ type: "userName", value: val })}
      />
      <InputBox
        actionType="password"
        labelName="Password"
        inputType="password"
        onChange={(val) => dispatch({ type: "password", value: val })}
      />
      <InputBox
        actionType="confirmPassword"
        labelName="Confirm Password"
        inputType="password"
        onChange={(val) => dispatch({ type: "confirmPassword", value: val })}
      />
      <button onClick={submitHandler} className={styles.button}>
        Signup
      </button>
      {/* <div className={styles.inputBox}>
        <label>Email</label>
        <input type="email" />
        </div>
        <div className={styles.inputBox}>
        <label>User name</label>
        <input type="text" />
        </div>
        <div className={styles.inputBox}>
        <label>Password</label>
        <input type="password" />
    </div> */}
    </AuthCard>
  );
}
