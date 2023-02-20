import "../styles/Profile.css";
import Swal from "sweetalert2";
import LogoHeader from "../components/collections/LogoHeader.js";
import TextButton from "../components/collections/buttons/textButton";
import mailProcess from "../services/mailProcess.js";

export default function Profile({ user }) {
    const logout = () => {
        window.localStorage.removeItem("user");
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });


    const showAlert = () => {
        Swal.fire({
            text: "¿Quiere que un asesor mayorista se contacte con usted?",
            timer: "15000",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#f9d615",
            background: "#202020",
            color: "#fff",
            backdrop: `
                rgba(255,255,255,0.4)
                url("/src/svgs/LogoBernal.svg")
                top
                no-repeat
            `,
            customClass: {
                confirmButton: "confirm-button-class",
            },
        }).then((response) => {
            if (response.isConfirmed) {
                Toast.fire({
                    title: "Enviando Email",
                    icon: "info",
                });
                mailProcess
                    .sendEmail(user, "Solicitud Venta Mayorista")
                    .then((confirmMail) => {
                        if (confirmMail.message === "El mensaje fue enviado.") {
                            Swal.fire({
                                text: "Un asesor se contactará con usted.",
                                timer: "5000",
                                icon: "success",
                                background: "#202020",
                                color: "#fff",
                            });
                        } else {
                            Swal.fire({
                                title: "Algo salió mal",
                                text: "Intentelo de nuevo más tarde.",
                                timer: "10000",
                                icon: "error",
                                background: "#202020",
                                color: "#fff",
                            });
                        }
                    });
            }
        });
    };

    return (
        <section className="ProfilePage">
            <LogoHeader></LogoHeader>

            <h3 className="textProfile">
                Hola
                {user.data.name && user.data.lastName
                    ? ` ${user.data.name.toUpperCase()} ${user.data.lastName.toUpperCase()}`
                    : null}
                . Te damos las bienvenidas a Baterías Bernal, somos una empresa
                con mas de 50 años en el rubro por la calidad de nuestras
                baterías
            </h3>
            <article className="profileBtns">
                <TextButton toShow="Mis Datos" linked="/mis-datos"></TextButton>
                <button className="textButton" onClick={showAlert}>
                    Quiero revender
                </button>
                <a
                    rel="noreferrer"
                    className="textButton"
                    href="https://api.whatsapp.com/send?phone=5493624599978"
                    target="_blank"
                >
                    Contactar con un asesor
                </a>
                <a
                    className="textButton"
                    href={`${process.env.REACT_APP_SERVER_URL}/users/logout`}
                    onClick={logout}
                >
                    Cerrar Sesión
                </a>
            </article>
        </section>
    );
}
