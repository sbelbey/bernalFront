import "../../styles/mapSection.css";
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function MapSection() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBGMvY_eVzicDN6QNhCrjr15xOJBHEBt_A",
    });

    const position = {
        lat: -27.477549263163294,
        lng: -58.8228966384487,
    };

    const [origin, setOrigin] = useState("");


    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setOrigin(
                    `${position.coords.latitude},${position.coords.longitude}`
                );
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    const handleClick = () => {
        if (!origin) {
            getCurrentLocation();
        }
    };
    return (
        <section className="MapSection">
            <h2 className="MapTitle">DÓNDE ESTAMOS</h2>
            <article className="MapContainer">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={position}
                        zoom={16}
                    >
                        <Marker
                            position={position}
                            options={{
                                label: {
                                    text: "Baterias Bernal ⚡️",
                                    className: "MarkerBernal",
                                },
                            }}
                        />
                    </GoogleMap>
                ) : (
                    <></>
                )}
            </article>
            <a
                className="textButton"
                onClick={handleClick}
                href={`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${position.lat},${position.lng}`}
                target="_blank"
                rel="noreferrer"
            >
                Cómo llegar
            </a>
        </section>
    );
}
