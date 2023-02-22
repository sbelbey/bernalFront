import "../styles/header.css";
import profileLogo from "../svgs/profileperfil.svg";
import lookUsLogo from "../svgs/Vectorubicacion.svg";
import profileShop from "../svgs/profileShop.svg";
import cartLogo from "../svgs/Vectorcarrito.svg";
import homeLogo from "../svgs/Vectorhome.svg";
import { Link } from "react-router-dom";

import LogoGrande from "../svgs/LogoBernalCompleto.svg";

export default function Header({ bag }) {
    let productsInBag;
    let toShow;
    if (bag?.length > 0) {
        productsInBag = "cartIcon carritoConProductos";
        toShow = bag?.length;
    } else {
        productsInBag = "cartIcon";
        toShow = false;
    }

    return (
        <header>
            <nav className="navBar">
                <Link to="/perfil" className="profileButton">
                    <img
                        className="profileIcon"
                        src={profileLogo}
                        alt="Profile Icon"
                    />
                </Link>
                <Link to="/encontranos" className="looktUsButton">
                    <img
                        className="lookUsIcon"
                        src={lookUsLogo}
                        alt="Map Icon"
                    />
                </Link>
                <Link to="/tienda" className="shopButton">
                    <img
                        className="shopIcon"
                        src={profileShop}
                        alt="Shop Icon"
                    />
                </Link>
                <Link to="/carrito" className="cartButton">
                    <img
                        className={productsInBag}
                        src={cartLogo}
                        alt="Cart Icon"
                    />
                    {toShow ? <span className="badge">{toShow}</span> : null}
                </Link>
                <Link to="/" className="homeButton">
                    <img className="homeIcon" src={homeLogo} alt="Home Icon" />
                </Link>
            </nav>
            <section className="navBarSection">
                <Link to="/">
                    <img
                        className="bigHomeIcon"
                        src={LogoGrande}
                        alt="Bernal Logo Grande"
                    ></img>
                </Link>
                <nav className="navBarBig">
                    <Link to="/" className="navBarLinks">
                        Inicio
                    </Link>
                    <Link to="/perfil" className="navBarLinks">
                        Mi Usuario
                    </Link>
                    <Link to="/encontranos" className="navBarLinks">
                        Donde Estámos
                    </Link>
                    <Link to="/tienda" className="navBarLinks">
                        Tienda
                    </Link>
                    <Link to="/carrito" className="navBarLinks">
                        Mi Carrito
                    </Link>
                </nav>
            </section>
        </header>
    );
}
