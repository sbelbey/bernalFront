import '../styles/Shop.css';

import { useLocation } from "react-router-dom";
import LogoHeader from "../components/collections/LogoHeader";
import ProductsSection from "../components/collections/ProductsSection";
import BagButton from "../components/collections/buttons/bagButton";

export default function Shop({ userToken, setBag, addToCart, state, bag }) {
  let toShow = bag?.length ?? '';
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('categoria');

  return (
    <section className="ShopPage">
      <LogoHeader></LogoHeader>


      <BagButton
        toShow={toShow}
        classes="iconInCart iconReorder"
      ></BagButton>
      <ProductsSection userToken={userToken} setBag={setBag} addToCart={addToCart} state={state} searcher={true} category={category}></ProductsSection>

    </section>
  )
}