import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import useAuthStore from "../../store";
// import { AuthContext } from "../../context/context";
function Navbar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const currentFocus = router.pathname;
  console.log(currentFocus);
  const userName = useAuthStore((state) => state.userName);
  const LOGOHandler = () => {
    router.push("/");
  };
  const SignupHandler = () => {
    router.push("/Signup");
  };
  const LoginHandler = () => {
    router.push("/Login");
  };
  const ProfileHandler = () => {
    router.push("/Profile");
  };
  const LogoutHandler = () => {
    router.replace("/Login");
    localStorage.clear();
    logout();
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo} onClick={LOGOHandler}>ZITTER</div>
      <div className={styles.auth}>
        {!isLoggedIn && (
          <div
            className={currentFocus === "/Signup" ? styles.current : ""}
            onClick={SignupHandler}
          >
            signup
          </div>
        )}
        {!isLoggedIn && (
          <div
            className={currentFocus === "/Login" ? styles.current : ""}
            onClick={LoginHandler}
          >
            login
          </div>
        )}
        {isLoggedIn && (
          <div
            className={currentFocus === "/Profile" ? styles.current : ""}
            onClick={ProfileHandler}
          >
            {userName}
          </div>
        )}

        {isLoggedIn && <div onClick={LogoutHandler}>logout</div>}
      </div>
    </div>
  );
}

export default Navbar;
