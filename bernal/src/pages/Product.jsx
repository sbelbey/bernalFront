import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import productService from '../services/products.js';
import LogoHeader from "../components/collections/LogoHeader.js";
import ProductDescriptions from '../components/collections/ProductDescriptions.jsx';
import '../styles/productDescriptionPage.css';

export default function Product({ userToken, addToCart, state, setBag }) {
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const [product, setProduct] = useState({});

  useEffect(() => {
    try {
      productService.getOne(pid, userToken)
        .then((result) => setProduct(result.product));
    } catch {
      console.log("Something went wrong!")
    }
  }, [pid])

  useEffect(() => {
    if (state.carts.length > 0) {
      setBag(state.carts);
    }
  }, [state.carts]);


  return (
    <section className='ProductPage'>
      <LogoHeader></LogoHeader>
      <ProductDescriptions
        product={product}
        addToCart={addToCart}
        setBag={setBag}
        state={state}
      ></ProductDescriptions>
    </section>
  )
}