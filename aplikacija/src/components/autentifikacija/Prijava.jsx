import { useNavigate, Form, useActionData } from "react-router-dom";
import styles from "./autentifikacija.module.css";
import Button from "../UI/Button/Button";

export const Prijava = () => {
    const errorPoruke = useActionData();

  return (
    <>
      {errorPoruke && errorPoruke.length > 0 && (
        <div className={styles.errorPoruka}>
          <h3>Pogreška!</h3>
          {errorPoruke.map((errorPoruka, index) => (
            <p key={index}>{errorPoruka}</p>
          ))}
        </div>
      )}
      <Form method="post" action="/prijava" className={styles.loginForm}>
        <label htmlFor="username">Korisničko ime </label>
        <input
          name="username"
          id="username"
          autoComplete="off"
          required
        ></input>
        <br></br>
        <label htmlFor="password">Lozinka </label>
        <input
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          required
        ></input>
        <br></br>
        <Button>Prijava</Button>
      </Form>
    </>
  );
};
