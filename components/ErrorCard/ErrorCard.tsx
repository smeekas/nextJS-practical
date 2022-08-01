import React from "react";
type ErrorCardPropsType = {
  error: string | null;
};
import styles from "./ErrorCard.module.css";
function ErrorCard({ error }: ErrorCardPropsType) {
  return <>{error && <p className={styles.err}>{error}</p>}</>;
}

export default ErrorCard;
