import { NavLink, useRouteLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import styles from "./Navigacija.module.css";
import CartButton from "../../components/kosarica/CartButton/CartButton";
import Button from "../../components/UI/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { dohvatiToken } from "../../components/autentifikacija/token";

const Navigacija = () => {
  const [token, setToken] = useState(useRouteLoaderData("root"));

  const provjeriToken = useCallback(async () => {
    if (token === null || token === undefined) {
      const noviToken = await dohvatiToken();
      if (noviToken) {
        setToken(noviToken);
      }
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(provjeriToken, 100);
  
    return () => {
      clearInterval(interval);
    };
  }, [provjeriToken]);

  return (
    <ul className={styles.navTraka}>
      <li className={styles.navElement}>
        <NavLink to="/" className={styles.navLink}>
          Naslovna
        </NavLink>
      </li>
      {token && (
        <li className={styles.navElement}>
          <NavLink to="/knjige" className={styles.navLink}>
            Knjige
          </NavLink>
        </li>
      )}
      {token && (
        <li className={styles.navElement}>
          <NavLink to="/mojeNarudzbe" className={styles.navLink}>
            Narudžbe
          </NavLink>
        </li>
      )}
      {!token && (
        <li className={styles.navElement}>
          <NavLink to="/prijava" className={styles.navLink}>
            Prijava
          </NavLink>
        </li>
      )}
      {!token && (
        <li className={styles.navElement}>
          <NavLink to="/registracija" className={styles.navLink}>
            Registracija
          </NavLink>
        </li>
      )}
      {token && (
        <li>
          <Form method="post" action="/odjava">
            <Button>Odjava</Button>
          </Form>
        </li>
      )}
      {token && (
        <li className={styles.cartButton}>
          <CartButton></CartButton>
        </li>
      )}
    </ul>
  );
};

export default Navigacija;
