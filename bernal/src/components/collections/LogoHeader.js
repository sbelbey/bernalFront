import "../../styles/logoHeader.css";
import LogoBernal from "../../svgs/LogoBernal.svg";
import { Link } from "react-router-dom";

export default function LogoHeader() {
    return (
        <Link className="logoHeaderContainer" to="/">
            <img className="LogoHeader" src={LogoBernal} alt="Logo Bernal" />
        </Link>
    );
}
