import { useSelector } from "react-redux";
import { dohvatiToken } from "../autentifikacija/token";
import styles from "../UI/Modal/Modal.module.css";
import { validacijaStavkiNarudzbe } from "../../validacija";

const PayButton = () => {
  const stavke = useSelector((state) => state.cart.stavke);


  const checkoutHandler = async () => {
    const token = dohvatiToken();
    if (!token) {
      throw new Error("Morate biti prijavljeni kako bi pristupili resursu");
    }
    if(validacijaStavkiNarudzbe(stavke) === false) {
      return;
    }

    const stavkeBezOpisa = stavke.map((stavka) => ({
      isbn: stavka.isbn,
      naslov: stavka.naslov,
      cijena: stavka.cijena,
      kolicina: stavka.kolicina,
    }));

    try {
      const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/narudzbe`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          narudzba: stavkeBezOpisa,
        }),
      });
      const podaci = await odgovor.json();
      
      window.location.href = podaci.url;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <button className={styles.navLink} onClick={() => checkoutHandler()}>
        Naruči knjige
      </button>
    </>
  );
};

export default PayButton;
