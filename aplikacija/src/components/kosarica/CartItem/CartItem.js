import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { addToCart, removeFromCart } from "../../../store/cartReducer";
import { dohvatiToken } from "../../autentifikacija/token";
import store from "../../../store/store";

const CartItem = ({ knjiga }) => {
  const { isbn, naslov, autor, opis, cijena, ukupnaCijena, kolicina } = knjiga;
  const ukupnaKolicina = useSelector((state) => state.cart.ukupnaKolicina);
  const dispatch = useDispatch();

  const dodavanjeKosarica = async () => {
    if(ukupnaKolicina >= 5) return alert("Maksimalno 5 knjiga u košarici");

    dispatch(addToCart({ isbn, autor, naslov, opis, cijena }));

    const trenutnaKosarica = store.getState().cart;

    await azurirajKosaricu(trenutnaKosarica);
  };

  const brisanjeKosarica = async () => {
    if(ukupnaKolicina <= 0) return alert("Ne može biti manje od 0 knjiga u košarici");

    dispatch(removeFromCart({ isbn }));

    const trenutnaKosarica = store.getState().cart;

    await azurirajKosaricu(trenutnaKosarica);
  };

  return (
    <li className={classes.knjiga}>
      <header>
        <h3>{naslov}</h3>
        <div className={classes.cijena}>
          ${ukupnaCijena}{" "}
          <span className={classes.cijenaKnjige}>(${cijena} / po knjizi)</span>
        </div>
      </header>
      <div className={classes.detalji}>
        <div className={classes.kolicina}>
          x <span>{kolicina}</span>
        </div>
        <div className={classes.gumbovi}>
          <button onClick={brisanjeKosarica}>-</button>
          <button onClick={dodavanjeKosarica}>+</button>
        </div>
      </div>
    </li>
  );
};

export const azurirajKosaricu = async (kosarica) => {
  const token = dohvatiToken();
  if (!token) {
    throw new Error("Morate biti prijavljeni kako bi pristupili resursu");
  }
  try {
    const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/kosarica`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(kosarica),
    });

    const podaci = await odgovor.json();

    if (!odgovor.ok) {
      throw new Error(podaci.error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default CartItem;
