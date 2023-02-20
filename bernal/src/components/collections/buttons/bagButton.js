import cartLogo from "../../../svgs/Vectorcarrito.svg";
import "../../../styles/buttons/bagButton.css";

export default function BagButton(props) {
    const { toShow, article } = props;
    const classes = props.classes
        ? `cartButton ${props.classes}`
        : "cartButton";

    const addToCartEvent = (event) => {
        event.preventDefault();
        props.addToCart(article);
    };

    return (
        <a className={classes} onClick={addToCartEvent} href="/carrito">
            <img className="cartImg" src={cartLogo} alt="Logo de la bolsa" />
            {toShow ? <span className="badge">{toShow}</span> : null}
        </a>
    );
}
