import "../styles/home.css";
import LogoHeader from "../components/collections/LogoHeader.js";
import CarouselSection from "../components/collections/CarouselSection.js";
import CategoriesSection from "../components/collections/CategoriesSection.js";
import ProductsSection from "../components/collections/ProductsSection.js";
import MapSection from "../components/collections/MapSection.js";

export default function Home({ userToken, setBag, addToCart, state }) {
    return (
        <>
            <LogoHeader></LogoHeader>
            <CarouselSection></CarouselSection>
            <MapSection></MapSection>
            <CategoriesSection></CategoriesSection>
            <ProductsSection
                userToken={userToken}
                setBag={setBag}
                addToCart={addToCart}
                state={state}
            ></ProductsSection>
        </>
    );
}
