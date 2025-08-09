import { Form, redirect, useActionData } from "react-router-dom";
import styles from "./autentifikacija.module.css";
import { validacijaRegistracija } from "../../validacija";

const Registracija = () => {
  const errorPoruke = useActionData();

  return (
    <>
      {errorPoruke && (
        <div className={styles.errorPoruka}>
          <h3>Pogreška!</h3>
          {errorPoruke.map((errorPoruka, index) => (
            <p key={index}>{errorPoruka}</p>
          ))}
        </div>
      )}
      <Form method="post" action="/registracija" className={styles.loginForm}>
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
        <label htmlFor="email">Email </label>
        <input name="email" id="email" autoComplete="off" required></input>
        <br></br>
        <button type="submit">Registracija</button>
      </Form>
    </>
  );
};

export async function actionRegistracija({ request }) {
  try {
    const podaci = await request.formData();
    const KorisnickoIme = podaci.get("username");
    const Lozinka = podaci.get("password");
    const Email = podaci.get("email");

    const validacijaPodataka = validacijaRegistracija({
      KorisnickoIme,
      Lozinka,
      Email,
    });

    if (validacijaPodataka) return validacijaPodataka;

    const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/registracija`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        KorisnickoIme: podaci.get("username"),
        Lozinka: podaci.get("password"),
        Email: podaci.get("email"),
      }),
    });

    if (!odgovor.ok) {
      const errorPoruka = await odgovor.json();
      const polje = [errorPoruka.error];
      return polje;
    }

    return redirect("/prijava");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default Registracija;
