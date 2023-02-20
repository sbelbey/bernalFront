import '../../styles/productDescription.css';
import TextButton from './buttons/textButton.js';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";



export default function ProductDescriptions({ product, addToCart }) {

  const disabled = product.stock === 0 ?? true;

  const addToCartEvent = function (event) {
    event.preventDefault();
    console.log(product)
    addToCart(product);
  }

  return (
    <article className="productSection">
      <h2 className="ProductName">{product.name}</h2>
      <Swiper
        modules={[Navigation, EffectFade]}
        speed={900}
        navigation
        loop
        slidesPerView={1}
        className="SwiperSlideProductImg"
      >
        {product && product.length > 0 ?
          product.images.map((img) => {
            return (
              <SwiperSlide
                key={img.id}
              >
                <img src={`${process.env.REACT_APP_IMAGES_SERVER_URL}/products/${img.url}`} className='productImg' alt={`Imagen de ${product.name}`} />
              </SwiperSlide>
            );
          })
          : null}
      </Swiper>
      <hr className="divider" />
      <section className="ProductDescriptionSection">
        <p className='productPrice'>$ {product.price}</p>
        {product.voltage && product.capacity ?
          (<>
            <p className='productFeatures'>Capacity: {product.capacity}</p>
            <p className='productFeatures'>Voltage: {product.voltage}</p>
          </>) : null}
        <p className="ProductDescription">{product.description}</p>
        <button disabled={disabled} href="/" onClick={addToCartEvent}
          className={disabled ? 'disabledButton textButton' : 'textButton'}>{disabled ? 'Sin Stock' : 'Comprar ahora'}</button>
      </section>
    </article>
  )
}