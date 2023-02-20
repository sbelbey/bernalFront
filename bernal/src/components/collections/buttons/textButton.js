import { Link } from "react-router-dom";
import "../../../styles/buttons/textButton.css";

export default function TextButton(props) {
    const { toShow, linked } = props;
    let styles;

    props.className
        ? (styles = `textButton ${props.className}`)
        : (styles = `textButton`);

    return (
        <Link className={styles} to={linked} >
            {toShow}
        </Link>
    );
}
