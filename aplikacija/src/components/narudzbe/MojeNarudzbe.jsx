import { useLoaderData } from "react-router-dom";
import { dohvatiToken } from "../autentifikacija/token";
import Narudzba from "./narudzba";
import styles from "./MojeNarudzbe.module.css";

const MojeNarudzbe = () => {
  const narudzbe = useLoaderData();

  return (
    <div>
      <h1 id={styles.narudzbaNaslov}>Moje narudzbe</h1>

      {narudzbe.map((narudzba) => (
        
        <Narudzba key={narudzba.datum.toString()} narudzba={narudzba} />
      ))}
    </div>
  );
};

export const loaderNarudzbe = async () => {
  const token = dohvatiToken();
  if (!token) {
    throw new Error("Morate biti prijavljeni kako bi pristupili resursu");
  }

  try {
    const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/narudzbe`, {
      headers: {
        Authorization: token,
      },
    });

    const podaci = await odgovor.json();
    console.log(podaci)
    if (!odgovor.ok) {
      throw new Error(podaci.error);
    }

    return podaci.narudzbe;
  } catch (error) {
    throw new Error(error);
  }
};

export default MojeNarudzbe;
