import '../../styles/CartItem.css';
import { useEffect } from 'react';
import DeleteButton from '../../svgs/DeleteButton.svg'

export default function CartItem({ item, delFromCart, state, setBag, modifyProductQuantity }) {
  let srcImage;
  item.images.length > 0
    ? (srcImage = item.images[0].url)
    : (srcImage = "images-1673278864473-.svg");
  const srcProduct = `${process.env.REACT_APP_IMAGES_SERVER_URL}/products/${srcImage}`;



  useEffect(() => {
    if (state.carts.length > 0) {
      setBag(state.carts);
    }
  }, [state]);

  return (
    <article className="CartItem">
      <img src={srcProduct} alt={item.name} className="itemImg" />
      <section className="productDescriptionCart">
        <article className="productDataCart">
          <p className="productNameCart">{item.name}</p>
          <input type="number" onChange={(event) => { modifyProductQuantity(item.id, event.target.value) }} defaultValue={item.quantity} pattern="\d*" className='quantityInput' />
          <button className="btnProductCart" onClick={() => delFromCart(item.id)}><img src={DeleteButton} alt="Delete Button" srcset="" /></button>
        </article>
        <article className="productPriceSection">
          <p className="productPriceCart">$ {item.price * item.quantity}</p>
        </article>
      </section>
    </article>)
}