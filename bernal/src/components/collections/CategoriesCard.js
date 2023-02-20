import "../../styles/CategoriesCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CategoriesCard({ category }) {
    const colors = ["#a41c1c", "#f9d615", "#000"];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const linkTo = `/tienda?categoria=${category}`;

    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
    return (
        <Link
            className="categoriesCard"
            to={linkTo}
            style={{ backgroundColor }}
        >
            <h3 className="titulo1">{category}</h3>
        </Link>
    );
}
