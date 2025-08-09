import { useNavigate } from "react-router-dom";
import styles from "./autentifikacija.module.css";
import Button from "../UI/Button/Button";
import { validacijaPrijava } from "../../validacija";
import { postavljanjeStanja } from "../../store/cartReducer";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toggleAuth } from "../../store/UI";
import { useState } from "react";
import { postavljanjeFavorita } from "../../store/favoritesReducer";

export const Prijava = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorPoruke, setErrorPoruke] = useState([])

  const upravljanjePrijavom = async (event) => {
    event.preventDefault();
    const podaci = new FormData(event.target);

    try {
      const KorisnickoIme = podaci.get("username");
      const Lozinka = podaci.get("password");

      const validacijaPodataka = validacijaPrijava({
        KorisnickoIme,
        Lozinka,
      });

      if (validacijaPodataka) {
        setErrorPoruke(validacijaPodataka);
        return;
      }

      const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/prijava`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          KorisnickoIme,
          Lozinka,
        }),
      });


      const vraceniOdgovor = await odgovor.json();

      if (!odgovor.ok) {
        const polje = [vraceniOdgovor.error];
        setErrorPoruke(polje);
        return;
      }

      setErrorPoruke([]);
      dispatch(toggleAuth());


      const token = vraceniOdgovor.token;
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      Cookies.set("token", token, { expires: expirationDate, path: "/" });

      const kosarica = vraceniOdgovor.kosarica;
      if(kosarica) dispatch(postavljanjeStanja(kosarica));


      const favoriti = vraceniOdgovor.favoriti;
      if (favoriti) {
        dispatch(postavljanjeFavorita(favoriti));
      }

      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      {errorPoruke.length > 0 && (
        <div className={styles.errorPoruka}>
          <h3>Pogreška!</h3>
          {errorPoruke.map((errorPoruka, index) => (
            <p key={index}>{errorPoruka}</p>
          ))}
        </div>
      )}
      <form
        method="post"
        onSubmit={upravljanjePrijavom}
        className={styles.loginForm}
      >
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
      </form>
    </>
  );
};
