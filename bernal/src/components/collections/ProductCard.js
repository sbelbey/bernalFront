import "../../styles/productCard.css";
import BagButton from "./buttons/bagButton.js";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const { article } = props;
    const toShow = "+";
    let srcImage;
    article.images?.length > 0
        ? (srcImage = article.images[0].url)
        : (srcImage = "images-1673278864473-.svg");
    const srcProduct = `${process.env.REACT_APP_IMAGES_SERVER_URL}/products/${srcImage}`;

    return (
        <>
            <Link className="product" to={`/tienda/producto/${article.id}`}>
                <img
                    className="productImg"
                    src={srcProduct}
                    alt={article.name}
                />
                <footer className="productFooter">
                    <p className="productName">{article.name}</p>
                    <p className="productPrice">${article.price}</p>
                    <BagButton
                        toShow={toShow}
                        classes="cartButtonProduct"
                        article={article}
                        addToCart={props.addToCart}
                    ></BagButton>
                </footer>
            </Link>
        </>
    );
}
