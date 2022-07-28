import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import useAuthStore from "../../store";
// import { AuthContext } from "../../context/context";
function Navbar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  return (
    <div className={styles.navbar}>
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        ZITTER
      </div>
      <div className={styles.auth}>
        {!isLoggedIn && (
          <div
            onClick={() => {
              router.push("/Signup");
            }}
          >
            signup
          </div>
        )}
        {!isLoggedIn && (
          <div
            onClick={() => {
              router.push("/Login");
            }}
          >
            login
          </div>
        )}
        {isLoggedIn && (
          <div
            onClick={() => {
              router.push("/Profile");
            }}
          >
            {userName}
          </div>
        )}

        {isLoggedIn && (
          <div
            onClick={() => {
              // authCtx.logout();
              router.replace("/Login");
              localStorage.clear();
              logout();
            }}
          >
            logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
