import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../../store/UI";
import Cart from "../../kosarica/Cart/Cart";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import PayButton from "../../checkout/PayButton";

const Modal = () => {
  const showCart = useSelector((state) => state.UI.showCart);
  const stavke = useSelector(state => state.cart.stavke)
  const dispatch = useDispatch();
  

  const zatvoriModal = () => {
    dispatch(toggleCart());
  };

  return (
    <div className={`${styles.modal} ${showCart ? styles.visible : ""}`}>
      
      <div className={styles.content}>
        <Cart className={styles.cartContent}/>
        <Button onClick={zatvoriModal}>
          Zatvori
        </Button>
        
        {stavke.length > 0 && <PayButton></PayButton>}
        <div className={styles.overlay} onClick={zatvoriModal}></div>
      </div>
    </div>
  );
};

export default Modal;
