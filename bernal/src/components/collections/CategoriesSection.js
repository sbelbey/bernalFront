import "../../styles/categoriesSection.css";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import axios from "axios";
import CategoriesCard from "./CategoriesCard.js";

export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        try {
            axios
                .get(`http://localhost:8080/api/v1/categories/`)
                .then((result) => {
                    setCategories(result.data.categories);
                });
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="categoriesSection">
            <h2 className="categoryTitle">Categorías</h2>
            <Swiper
                modules={[Navigation, EffectFade]}
                navigation
                speed={900}
                slidesPerView={screenWidth >= 992 ? 4 : 2}
                loop
                className="SwiperCategories"
            >
                {categories.map((element) => {
                    return (
                        <SwiperSlide
                            key={element.name}
                            className="SwiperSlideCategories"
                        >
                            <CategoriesCard
                                key={element.id}
                                category={element.name}
                            ></CategoriesCard>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
