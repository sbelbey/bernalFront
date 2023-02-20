import TextButton from "./buttons/textButton.js";
import GoogleLogo from "../../svgs/googleLogo.svg";

export default function NewCountSection({ toShowButton, linkButton }) {
    const google = () => {};

    return (
        <section className="newCountSection">
            <hr />
            <article className="registerNewCount">
                <section className="createNewCount">
                    <p>Ingresá usa tu cuenta de </p>
                    <a
                        href={`${process.env.REACT_APP_SERVER_URL}/users/google`}
                        onClick={google}
                    >
                        <img src={GoogleLogo} alt="Google Logo" />
                    </a>
                </section>
                <TextButton
                    className="registerBtn"
                    toShow={toShowButton}
                    linked={linkButton}
                ></TextButton>
            </article>
        </section>
    );
}
