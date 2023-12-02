import styles from "./AuthCard.module.css";
type AuthCardType = {
  children: React.ReactNode;
};
function AuthCard(props: AuthCardType) {
  return <div className={styles.card}>{props.children}</div>;
}
export default AuthCard;
