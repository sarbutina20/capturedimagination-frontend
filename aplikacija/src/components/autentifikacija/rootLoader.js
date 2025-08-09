import Cookies from "js-cookie";
import { dohvatiToken } from "./token";
import store from "../../store/store";
import { toggleAuth } from "../../store/UI";
import { postavljanjeStanja } from "../../store/cartReducer";
import { postavljanjeFavorita } from "../../store/favoritesReducer";

export async function rootLoader() {
  const token = dohvatiToken();

  if (!token) {
    store.dispatch(toggleAuth(false));
    store.dispatch(
      postavljanjeStanja({ stavke: [], ukupnaKolicina: 0, ukupniIznos: 0 })
    );
    store.dispatch(postavljanjeFavorita([]));
    return null;
  }

  try {
    const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/profil`, {
      headers: {
        Authorization: token
      },
    });

    if (odgovor.ok) {
      const podaci = await odgovor.json();
      store.dispatch(toggleAuth(true));
      if (podaci.kosarica) store.dispatch(postavljanjeStanja(podaci.kosarica));
      if (podaci.favoriti)
        store.dispatch(postavljanjeFavorita(podaci.favoriti));
    } else {
      Cookies.remove("token");
      store.dispatch(toggleAuth(false));
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    Cookies.remove("token");
    store.dispatch(toggleAuth(false));
    return null;
  }

  return token;
}