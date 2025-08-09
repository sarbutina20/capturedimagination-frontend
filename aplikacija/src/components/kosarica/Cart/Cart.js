import { useSelector } from 'react-redux';
import Card from '../../UI/Card/Card';
import classes from './Cart.module.css';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
  
  const stavke = useSelector(state => state.cart.stavke)

  const ukupnaCijenaStavki = useSelector(state => state.cart.ukupnaCijenaStavki)
  const ukupnaKolicina = useSelector(state => state.cart.ukupnaKolicina)
  
  return (
    <Card className={classes.cart}>
      <h2>Vaša košarica</h2>
      {stavke.length > 0 && <ul>
        {stavke.map((knjiga) => (
          <CartItem key={knjiga.isbn} knjiga={knjiga}></CartItem>
        ))}
        <li>Ukupna cijena svih stavki: ${ukupnaCijenaStavki}</li>
        <li>Ukupna količina stavki: {ukupnaKolicina}</li>
      </ul>}
      {stavke.length === 0 && <h3>Nema knjiga u košarici!</h3>}
      
    </Card>
  );
};

export default Cart;
