import { Outlet } from "react-router-dom";
import Navigacija from "./Navigacija/Navigacija";
import { useSelector } from "react-redux";
import Modal from "../components/UI/Modal/Modal";


export default function MainLayout() {
  const showCart = useSelector((state) => state.UI.showCart);
  
  return (
    <>
      <Navigacija></Navigacija>
      {showCart && <Modal></Modal>}
      <Outlet></Outlet>
    </>
  );
}
