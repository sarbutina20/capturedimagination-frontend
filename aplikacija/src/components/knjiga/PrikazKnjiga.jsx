import { useLoaderData } from "react-router-dom";
import Knjiga from "./knjiga";
import styles from "../knjiga/knjiga.module.css";
import { dohvatiToken } from "../autentifikacija/token";
import { useState } from "react";

export const PrikazKnjiga = () => {
  const [dohvaceneKnjige, setDohvaceneKnjige] = useState(useLoaderData());
  const [odabranaLista, setOdabranaLista] = useState("Young Adult Hardcover");
  const [pretraga, setPretraga] = useState("");

  const vrsteListi = [
    "Za mlade",
    "Beletristika u tvrdom uvezu",
    "Dokumentarna literatura u tvrdom uvezu",
    "Grafičke knjige i manga",
    "Poslovna literatura",
    "Za Vas",
  ];

  const upravljanjeOdabranomListom = async (vrsta) => {
    if (vrsta === odabranaLista) return;
    setOdabranaLista(vrsta);

    if (vrsta !== "Za Vas") {
      const lokalnoSpremiste = JSON.parse(
        localStorage.getItem(JSON.stringify(vrsta))
      );
      if (lokalnoSpremiste) {
        setDohvaceneKnjige(lokalnoSpremiste);
        return; 
      }
    }

    const prvoDohvacanje = await loaderKnjige(vrsta);
    setDohvaceneKnjige(prvoDohvacanje);
  };

  const filtrirajKnjige = (knjige) => {
    if (pretraga === "") {
      return knjige;
    }

    return knjige.filter((knjiga) =>
      knjiga.naslov.toLowerCase().includes(pretraga.toLowerCase())
    );
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>Kategorije: </h1>
        {vrsteListi.map((vrsta) => (
          <button
            key={vrsta}
            className={styles.button}
            onClick={() => upravljanjeOdabranomListom(vrsta)}
          >
            {vrsta}
          </button>
        ))}
      </div>
      <div className={styles.searchContainer}>
        <label htmlFor="pretraga">Pretraži knjige po naslovu: </label>
        <input
          id="pretraga"
          type="text"
          placeholder="Pretraži knjige"
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
      </div>
      <div className={styles.knjigeContainer}>
        {filtrirajKnjige(dohvaceneKnjige).map((knjiga) => (
          <Knjiga key={knjiga.isbn} knjiga={knjiga}></Knjiga>
        ))}
      </div>
    </div>
  );
};

export async function loaderKnjige(vrsta) {
  const token = dohvatiToken();
  if (!token) {
    throw new Error("Morate biti prijavljeni kako bi pristupili resursu");
  }

  const kljuc = typeof vrsta === "string" ? vrsta : "Za mlade";

  if (kljuc !== "Za Vas") {
    const spremljeneKnjigeString = localStorage.getItem(JSON.stringify(kljuc));
    if (spremljeneKnjigeString) {
      const spremljeneKnjige = JSON.parse(spremljeneKnjigeString);
      return spremljeneKnjige;
    }
  }

  let url;
  if (kljuc === "Za Vas") {
    url = `${process.env.REACT_APP_BACKEND_API_URL}/preporuke`;
  } else {
    let lista = "young-adult-hardcover";
    switch (vrsta) {
      case "Za mlade":
        lista = "young-adult-hardcover";
        break;
      case "Beletristika u tvrdom uvezu":
        lista = "hardcover-fiction";
        break;
      case "Dokumentarna literatura u tvrdom uvezu":
        lista = "hardcover-nonfiction";
        break;
      case "Grafičke knjige i manga":
        lista = "graphic-books-and-manga";
        break;
      case "Poslovna literatura":
        lista = "business-books";
        break;
      default:
        lista = "young-adult-hardcover";
        break;
    }
    url = `${process.env.REACT_APP_BACKEND_API_URL}/knjige?lista=${lista}`;
  }

  try {
    const odgovor = await fetch(
      //`${process.env.REACT_APP_BACKEND_API_URL}/knjige?lista=${lista}`,
      url,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const podaci = await odgovor.json();

    if (!odgovor.ok) {
      throw new Error(podaci.error || "Greška pri dohvaćanju podataka");
    }

    const knjige = podaci.knjige;

    if (kljuc !== "Za Vas") {
      const spremljeniPodaci = JSON.stringify(knjige);
      console.log(
        `Spremanje ${kljuc} liste knjiga u lokalno spremište.`
      );
      localStorage.setItem(JSON.stringify(kljuc), spremljeniPodaci);
    }

    return knjige;
  } catch (error) {
    throw new Error(error.message);
  }
}
