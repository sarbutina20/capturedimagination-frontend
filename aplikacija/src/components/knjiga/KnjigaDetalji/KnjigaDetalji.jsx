import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartReducer";
import { azurirajKosaricu } from "../../kosarica/CartItem/CartItem";
import { useLocation } from "react-router-dom";
import store from "../../../store/store";
import styles from "./KnjigaDetalji.module.css"

const KnjigaDetalji = (props) => {

  const location = useLocation();
  const knjiga = location.state;

  const ukupnaKolicina = useSelector((state) => state.cart.ukupnaKolicina);
  const dispatch = useDispatch();

  const dodavanjeKosarica = () => {
    if (ukupnaKolicina >= 5) return alert("Maksimalno 5 knjiga u košarici");

    const { isbn, autor, naslov, opis, cijena } = knjiga;

    dispatch(addToCart({ isbn, autor, naslov, opis, cijena }));

    const trenutnaKosarica = store.getState().cart;

    azurirajKosaricu(trenutnaKosarica);
  };

  return (
    <>
      {knjiga && (
        <div className={styles.knjigaContainer}>
          <img src={knjiga.slika} alt={knjiga.naslov} />
          <h1>{knjiga.naslov}</h1>
          <h2>{knjiga.autor}</h2>
          <p>{knjiga.opis}</p>
          <h3>${knjiga.cijena}</h3>
          <button onClick={dodavanjeKosarica}>Dodaj u košaricu</button>
        </div>
      )}
      {!knjiga && <h1>Knjiga nije pronađena</h1>}
    </>
  );
};
export default KnjigaDetalji;
