import styles from "./knjiga.module.css";
import ispunjenoSrce from "./ispunjenoSrce.png";
import neispunjenoSrce from "./neispunjenoSrce.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartReducer";
import { azurirajKosaricu } from "../kosarica/CartItem/CartItem";
import store from "../../store/store";
import { useNavigate } from "react-router-dom";
import { postavljanjeFavorita } from "../../store/favoritesReducer";
import Cookies from "js-cookie";

const Knjiga = ({ knjiga }) => {
  const ukupnaKolicina = useSelector((state) => state.cart.ukupnaKolicina);
  const favorites = useSelector((state) => state.favorites.favorites || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = favorites.includes(knjiga.isbn);

  const toggleFavorite = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/prijava");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/favoriti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ isbn: knjiga.isbn }),
      });

      if (!response.ok) {
        throw new Error("Greška pri ažuriranju favorita");
      }

      const data = await response.json();
      dispatch(postavljanjeFavorita(data.favoriti));
    } catch (error) {
      console.error(error);
    }
  };

  const dodavanjeKosarica = () => {
    if (ukupnaKolicina >= 5) return alert("Maksimalno 5 knjiga u košarici");

    const { isbn, autor, naslov, opis, cijena } = knjiga;

    dispatch(addToCart({ isbn, autor, naslov, opis, cijena }));

    const trenutnaKosarica = store.getState().cart;

    azurirajKosaricu(trenutnaKosarica);
  };

  const detaljiHandler = () => {
    navigate(`/knjige/detalji`, { state: knjiga });
  };

  return (
    <div className={styles.knjiga} >
      <div onClick={detaljiHandler}>
        <h3>{knjiga.naslov}</h3>
        <h5>{knjiga.autor}</h5>
        <img src={knjiga.slika} alt={knjiga.naslov} className={styles.slikaKnjige}></img>
        <br></br>
        <h3>${knjiga.cijena}</h3>
      </div>
      <img className={styles.srceIkona} src={isFavorite ? ispunjenoSrce : neispunjenoSrce} alt={knjiga.slika} onClick={toggleFavorite}></img>
      <button onClick={dodavanjeKosarica}>Dodaj u košaricu</button>
    </div>
  );
};

export default Knjiga;
