import { useRouteError } from "react-router-dom";
import Navigacija from "../Navigacija/Navigacija";
import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page" className={styles["error-page"]}>
      <Navigacija></Navigacija>
      <h1>Ispričavam se, ali stvorila se greška!</h1>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}