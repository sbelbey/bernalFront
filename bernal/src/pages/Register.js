import "../styles/Register.css";

import React, { useState } from "react";
import usersService from "../services/users.js";
import LogoHeader from "../components/collections/LogoHeader.js";
import Inputs from "../components/collections/Inputs.js";
import NewCountSection from "../components/collections/NewCountSection.js";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import LogoBernal from "../svgs/LogoBernal.svg";

export default function Register() {
    const [values, setValues] = useState({
        email: "",
        emailConfirm: "",
        password: "",
        passwordConfirm: "",
    });
    const [userCreated, setUserCreated] = useState(false);

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
            name: "emailConfirm",
            type: "email",
            placeholder: "Vuelva a escribir su Email",
            errorMessage: "Los email ingresados debe coincidir",
            label: "Repita su Email",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Escriba su constraseña",
            errorMessage:
                "La contraseña debe tener entre 8-20 caracterels e incluir 1 letra, 1 número y 1 caracter especial",
            label: "Contraseña",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-20}$`,
            required: true,
        },
        {
            id: 4,
            name: "passwordConfirm",
            type: "password",
            placeholder: "Vuelva a escribir su contraseña",
            errorMessage: "Las contraseñas ingresadas no coinciden",
            label: "Repita su contraseña",
            pattern: values.password,
            required: true,
        },
    ];

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        background: "#202020",
        color: "#fff",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await usersService.registerUser(values);

        if (response.errors) {
            Swal.fire({
                text: "Usuario registrado previamente",
                timer: 3000,
                confirmButtonColor: "#f9d615",
                background: "#202020",
                color: "#fff",
                icon: "info",
            });
            return;
        }

        setUserCreated(true);
        Toast.fire({
            icon: "success",
            title: "Usuario creado.",
        });
    };

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <section className="loginPage">
            <section className="registerSection">
                <img
                    src={LogoBernal}
                    alt="logo Bernal"
                    className="logoBig"
                ></img>
                <LogoHeader></LogoHeader>
                <article className="loginOptions">
                    <h1 className="registerTittle">REGISTRO</h1>
                    <form className="registerForm" onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <Inputs
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            ></Inputs>
                        ))}

                        <button className="registerBtn">Registrarme</button>
                    </form>
                    <NewCountSection
                        toShowButton="Ya tengo una cuenta"
                        linkButton="/login"
                    ></NewCountSection>
                    {userCreated ? <Navigate to="/login"></Navigate> : null}
                </article>
            </section>
        </section>
    );
}
