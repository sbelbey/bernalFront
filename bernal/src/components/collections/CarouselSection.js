import "../../styles/CarouselSection.css";
import homeImage from "../../images/img_portada.png";
import TextButton from "./buttons/textButton.js";
import rayoVector from "../../svgs/rayoVector.svg";

export default function CarouselSection() {
    return (
        <>
            <section className="CarouselSection">
                <p className="sliderTextBig">
                    Baterías Bernal, una empresa con mas de 50 años en el rubro
                    por la calidad de las baterías
                </p>
                <img
                    className="imgPortada"
                    src={homeImage}
                    alt="Imágen de Portada"
                />
                <img
                    className="rayoVectorBig"
                    src={rayoVector}
                    alt="Rayo Vector"
                />

                <TextButton toShow="Comprá ahora" linked="/tienda"></TextButton>
            </section>
            <section className="CarouselSectionBig">
                <article className="text-btn">
                    <p className="sliderTextBig">
                        Baterías Bernal, una empresa con mas de 50 años en el
                        rubro por la calidad de las baterías
                    </p>
                    <TextButton
                        toShow="Comprá tu batería"
                        linked="/tienda"
                    ></TextButton>
                </article>
                <article className="img-vector">
                    <img
                        className="imgPortada"
                        src={homeImage}
                        alt="Imágen de Portada"
                    />
                    <img
                        className="rayoVectorBig"
                        src={rayoVector}
                        alt="Rayo Vector"
                    />
                </article>
            </section>
        </>
    );
}
