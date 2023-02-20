import "../styles/Login.css";
import React, { useState } from "react";
import LogoHeader from "../components/collections/LogoHeader.js";
import Inputs from "../components/collections/Inputs.js";
import NewCountSection from "../components/collections/NewCountSection.js";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoBernal from "../svgs/LogoBernal.svg";

export default function Login(props) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                values
            );
            props.handleUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Escriba su Email",
            errorMessage: "Debe ingresar un email válido",
            label: "Email",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Escriba su constraseña",
            errorMessage:
                "La contraseña debe tener entre 8-20 caracterels e incluir 1 letra, 1 número y 1 caracter especial",
            label: "Contraseña",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-8}$`,
            required: true,
        },
    ];

    return (
        <section className="loginPage">
            <section className="loginSection">
                <img
                    src={LogoBernal}
                    alt="logo Bernal"
                    className="logoBig"
                ></img>
                <LogoHeader></LogoHeader>
                <article className="loginOptions">
                    <form className="formLogin" onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <Inputs
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            ></Inputs>
                        ))}
                        <article className="forgotPass">
                            <p>¿Olvidaste tu contraseña? </p>
                            <Link to="/recuperar-contraseña">
                                Hace click acá
                            </Link>
                        </article>
                        <button className="loginBtn">Ingresar</button>
                    </form>
                    <NewCountSection
                        toShowButton="Crea tu cuenta"
                        linkButton="/registro"
                    ></NewCountSection>
                </article>
            </section>
        </section>
    );
}
