import "../styles/Cart.css";

import CartItem from "../components/collections/CartItem"
import LogoHeader from "../components/collections/LogoHeader";
import BagButton from "../components/collections/buttons/bagButton";

import rayoVector from '../svgs/rayoVector.svg';


import { Link } from "react-router-dom";
export default function Carrito({ bag, setBag, delFromCart, clearCart, state, modifyProductQuantity }) {
  const toShow = bag?.length ?? '';

  return (
    <section className="allPage">

      <section className="CartPage">
        <LogoHeader></LogoHeader>

        <section className="cartProductSection">
          {bag?.length > 0
            ? <>
              <BagButton
                toShow={toShow}
                classes="iconInCart"
              ></BagButton>
              {bag.map((article, index) => {
                return (
                  <CartItem
                    key={index}
                    item={article}
                    delFromCart={delFromCart}
                    state={state}
                    setBag={setBag}
                    modifyProductQuantity={modifyProductQuantity}
                  ></CartItem>
                );
              })}
              < section className="btnSection">
                <button className="cleanCart" onClick={clearCart}>Vaciar Carrito</button>
                <Link to='/comprar' className="textButton checkOutbtn">Finalizar Compra</Link>
              </section>
            </>
            : <section className="noBag">
              <img src={rayoVector} alt="Rayo" className="noBagImg" />
              <p className="textNoBag">No hay nada cargado en tu carrito.</p>
              <Link to='/tienda' className="textButton">Ir a la Tienda</Link>
            </section>
          }
        </section>
      </section>
    </section>
  )
}