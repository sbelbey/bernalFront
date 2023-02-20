import '../styles/BuyPage.css';
import { useState } from "react";
import Inputs from "../components/collections/Inputs.js";
import CheckoutProcess from "../services/checkOutProcess.js"
import LogoHeader from "../components/collections/LogoHeader.js";
import Swal from 'sweetalert2';
import mailProcess from "../services/mailProcess.js";
import { Navigate } from 'react-router-dom';

export default function Buy({ bag, user, clearCart }) {

  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    cellphone: "",
    Productos: bag,
    Usuario: user?.data || "Usuario no registrado",
  });
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [buyFinished, setBuyFinished] = useState(null);

  const [error, setError] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Ingrese su nombre",
      label: "Nombre",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Ingrese su apellido",
      label: "Apellido",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Ingrese su email",
      errorMessage:
        "Debe ingresar un email válido",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "cellphone",
      type: "tel",
      placeholder: "Ingrese su número de celular",
      label: "Celular",
      required: true,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedRadio) {
      setError(null);
      if (selectedRadio === "mercadoPago") {
        let result = await CheckoutProcess.checkoutCart(bag);
        window.location.href = result.link;
      } else {
        Swal.fire({
          title: "¿Desea finalizar la compra?",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          confirmButtonColor: "#f9d615",
          confirmButtonTextColor: "Black",
        }).then((response) => {
          if (response.isConfirmed) {
            mailProcess.sendEmail(values, "Solicitud Venta Minorista").then((confirmMail) => {
              if (confirmMail.message === "El mensaje fue enviado.") {
                Swal.fire({
                  title: "Un asesor se contactará con usted.",
                  timer: "10000",
                  icon: "success",
                });
                setBuyFinished(true);
                clearCart();
              } else {
                Swal.fire({
                  title: "Algo salió mal",
                  text: "Intentelo de nuevo más tarde.",
                  timer: "5000",
                  icon: "error",
                });
                setBuyFinished(false);
              }
            });
          }
        });
      }
    } else {
      setError('Por favor selecciona una opción de pago');
    }
  };

  return (
    <section className="buyPage">
      <LogoHeader></LogoHeader>
      <form className="registerForm" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <Inputs
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          ></Inputs>
        ))}
        <p className="paymentMethod">Medio de Pago</p>
        <article className="radioArticle">
          <section className='paymentSection'>
            <label for="efectivo" className="content-input">Efectivo
              <input name="payment" id="efectivo" type="radio" value="efectivo" onChange={handleRadioChange} selected />
              <i></i>
            </label>
          </section>
          <section className='paymentSection'>
            <label for="mercadoPago" className="content-input">Mecado Pago
              <input name="payment" id="mercadoPago" type="radio" value="mercadoPago" onChange={handleRadioChange} />
              <i></i>
            </label>
          </section>
        </article>
        {error && <p className="error">{error}</p>}
        <button className="textButton checkOutbtn">Comprar</button>
      </form>
      <p className="explainText">Una vez confirmada la compra, un asesor se pondrá en contacto con usted para coordinar la entrega.</p>
      {buyFinished ? <Navigate to='/'></Navigate> : null}
    </section>
  )
}