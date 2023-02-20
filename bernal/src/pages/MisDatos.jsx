import '../styles/MisDatosPage.css';

import { useState } from "react";
import UsersServices from "../services/users";

import Inputs from "../components/collections/Inputs.js";
import LogoBernal from '../svgs/LogoBernal.svg'

export default function MisDatos(props) {
    const user = props.user.data;
    const userToken = props.userToken;
    const [values, setValues] = useState({
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        lastName: user.lastName ?? undefined,
        adress: user.adress ?? undefined,
        phone: user.phone ?? undefined,
        cellphone: user.cellphone ?? undefined,
        city: user.city ?? undefined,
        province: user.province ?? undefined,

    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            defaultValue: user.email ?? '',
            placeholder: "Escriba su Email",
            errorMessage: "Debe ingresar un email válido",
            label: "Email",
            required: true,
        },
        {
            id: 2,
            name: "name",
            type: "text",
            placeholder: "Escriba su nobre",
            defaultValue: user.name ?? '',
            errorMessage:
                "Este puede contener hasta 40 caracteres",
            label: "Nombre",
            // pattern: `^(?!-)[a-zA-Z-]*[a-zA-Z]$a{1,40}`,
            required: false,
        },
        {
            id: 3,
            name: "lastName",
            type: "text",
            placeholder: "Escriba su apellido",
            defaultValue: user.lastName ?? '',
            errorMessage:
                "Este puede contener hasta 80 caracteres",
            label: "Apellido",
            // pattern: `^(?!-)[a-zA-Z-]*[a-zA-Z]$a{1,80}`,
            required: false,
        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Escriba su dirección",
            defaultValue: user.address ?? '',
            label: "Dirección",
            // pattern: `^(?!-)[a-zA-Z-]*[a-zA-Z]\d$a{1,255}`,
            required: false,
        },
        {
            id: 5,
            name: "phone",
            type: "tel",
            placeholder: "Escriba su número de teléfono",
            defaultValue: user.phone ?? '',
            label: "Teléfono",
            required: false,
        },
        {
            id: 6,
            name: "cellphone",
            type: "tel",
            placeholder: "Escriba su número de celular",
            defaultValue: user.cellphone ?? '',
            label: "Celular",
            required: false,
        },
        {
            id: 8,
            name: "city",
            type: "text",
            placeholder: "Escriba la ciudad",
            defaultValue: user.city ?? '',
            errorMessage:
                "El nombre de la ciudad no puede superar los 20 caracteres.",
            label: "Nombre",
            // pattern: `^(?!-)[a-zA-Z-]*[a-zA-Z]\d$a{1,20}`,
            required: false,
        },
    ];



    const provinces = [
        "Buenos Aires",
        "Ciudad Autónoma de Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
        "Tucumán"
    ]

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await UsersServices.modifyUser(values, userToken);
            props.handleUserData(res.userModified);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    
    return (
        <section className="allMisDatosPage">
            {/* <section className="halfBiger">
                <img src="" alt="" />
            </section> */}
            <section className="myDataPage">
                <img src={LogoBernal} alt="Logo Bernal" className="logoTrans" />
                <form
                    className="formMisDatos"
                    onSubmit={handleSubmit}
                >
                    {user.avatar ?
                        (<img src={`${props.env.REACT_APP_IMAGES_SERVER_URL}/usersAvatars/${user.avatar[0].url}`} alt={`${user.name} avatar`} className="avatarImg" />)
                        : <img src={window.location.origin + '/svgs/defaultAvatar.svg'} alt={`${user.name} avatar`} className="avatarImg" />}

                    {inputs.map((input) => (
                        <Inputs
                            key={input.id}
                            {...input}
                            // value={values[input.name]}
                            onChange={onChange}
                        ></Inputs>
                    ))}

                    <label for="province" className="formLabel">Provincia</label>
                    <select name="province" id="province" className="provinceSelect" onChange={onChange}>
                        {provinces.map((province) => (
                            <option key={province} value={province} defaultValue={user.province}>{province}</option>
                        ))}
                    </select>
                    <button className="textButton">Guardar Cambios</button>
                </form>

            </section>
        </section>
    )
}