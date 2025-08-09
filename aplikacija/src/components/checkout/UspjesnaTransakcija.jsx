import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { brisanjeStanja } from "../../store/cartReducer";
import { azurirajKosaricu } from "../kosarica/CartItem/CartItem";
import "../../App.css";

const UspjesnaTransakcija = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(brisanjeStanja());
    const praznaKosarica = {
      stavke: [],
      ukupnaCijenaStavki: 0,
      ukupnaKolicina: 0
    }
    azurirajKosaricu(praznaKosarica);
  }, [dispatch]);

  return (
    <div className="headerTextContainer">
      <h1>Uspješna transakcija</h1>
    </div>
  );
};

export default UspjesnaTransakcija;
