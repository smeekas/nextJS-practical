import InputBox from "../components/InputBox/InputBox";
import styles from "../styles/Signup.module.css";
import AuthCard from "../components/AuthCard/Authcard";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../store";
import { axiosInstance } from "../helper/axios";
import { setToken } from "../helper/localStorage";
import ErrorCard from "../components/ErrorCard/ErrorCard";
const iniialState = {
  email: "",
  password: "",
};

export type ActionType = "email" | "password";
export type Action = {
  type: "email" | "password";
  value: string;
};
const reducer = (state = iniialState, action: Action) => {
  if (action.type === "email") {
    return { ...state, email: action.value };
  }

  if (action.type === "password") {
    return { ...state, password: action.value };
  }

  return state;
};
export default function LogIn() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [state, dispatch] = useReducer(reducer, iniialState);
  const [error, setError] = useState<string | null>(null);
  const hasError =
    !state.email.trim().includes("@") || state.password.trim().length < 6;
  useEffect(() => {
    if (!hasError) {
      setError(null);
    }
  }, [hasError]);
  const submitHandler = async () => {
    if (!state.email.trim().includes("@") || state.password.trim().length < 6) {
      setError("Invalid email or password");
      return;
    }
    await fetch("/api/user/login/", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          axiosInstance.defaults.headers.common["Authorization"] =
            "bearer " + data.token;
          setToken(data.token);
          login(data.token, data.userName, data.userId);
          router.replace("/");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
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
        actionType="password"
        labelName="Password"
        inputType="password"
        onChange={(val) => dispatch({ type: "password", value: val })}
      />
      <button onClick={submitHandler} className={styles.button}>
        Login
      </button>
    </AuthCard>
  );
}
