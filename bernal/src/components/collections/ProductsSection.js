import "../../styles/ProductSection.css";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import ProductServices from "../../services/products.js";
import vehiclesServices from "../../services/vehicles.js";

export default function ProductsSection({
    userToken,
    setBag,
    addToCart,
    state,
}) {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [errorMessages, setErrorMessages] = useState(null);
    const [finished, setFinished] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brandSelected, setBrandSelected] = useState("Marca");
    const [models, setModels] = useState([]);
    const [modelSelected, setModelSelected] = useState("Modelo");
    const [years, setYears] = useState([]);
    const [yearSelected, setYearSelected] = useState("Año");
    const [shouldExecuteEffect, setShouldExecuteEffect] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("categoria");

    const handleBrandSelect = (event) => {
        setBrandSelected(event.target.value);
    };

    const handleModelSelect = (event) => {
        setModelSelected(event.target.value);
    };

    const handleYearSelect = (event) => {
        setYearSelected(event.target.value);
    };
    const handleLoadMore = (event) => {
        event.preventDefault();
        page < totalPages ? setPage(Number(page + 1)) : setFinished(true);
    };

    const getBrands = async () => {
        let data = await vehiclesServices.getAllBrands();
        data = data.vehiclesBrands;
        let allBrands = [];
        data.forEach((brand) => {
            allBrands.push(brand.brand);
        });

        allBrands = allBrands.filter((brand, index) => {
            return allBrands.indexOf(brand) === index;
        });
        return allBrands;
    };

    const getModelsOfBrand = () => {
        let allVehicles = [];
        brandSelected !== "Marca"
            ? productsFiltered.forEach((product) => {
                  allVehicles = [...allVehicles, ...product.vehicles];
              })
            : products.forEach((product) => {
                  allVehicles = [...allVehicles, ...product.vehicles];
              });

        let allModels = allVehicles.map((vehicle) => vehicle.model);
        allModels = allModels.filter((model, index) => {
            return allModels.indexOf(model) === index;
        });
        return allModels;
    };

    const getYearsOfModel = () => {
        let allVehicles = [];
        productsFiltered.forEach((product) => {
            allVehicles = [...allVehicles, ...product.vehicles];
        });
        let allYears = allVehicles.map((vehicle) => vehicle.year.substr(0, 4));
        allYears = allYears.filter((model, index) => {
            return allYears.indexOf(model) === index;
        });

        return allYears;
    };

    useEffect(() => {
        if (state.carts.length > 0) {
            setBag(state.carts);
        }
    }, [state.carts]);

    useEffect(() => {
        try {
            if (brandSelected === "Marca") {
                setProductsFiltered([]);
                setModels([]);
                setYears([]);
                setModelSelected("Modelo");
                setYearSelected("Año");
                setFinished(false);
            } else {
                vehiclesServices
                    .getAllProductsByBrand(userToken, brandSelected)
                    .then((productsByBrand) => {
                        setProductsFiltered([...productsByBrand]);
                        return productsFiltered;
                    });
                setFinished(true);
            }
        } catch (error) {
            setErrorMessages("There is no products.");
        }
    }, [brandSelected]);

    useEffect(() => {
        setModels(getModelsOfBrand());
    }, [brandSelected, productsFiltered]);

    useEffect(() => {
        try {
            ProductServices.getAll(page, userToken, category).then((data) => {
                setProducts([...products, ...data.data]);
                setTotalPages(data.info.pages);
            });
            getBrands().then((brands) => setBrands(brands));
        } catch (error) {
            setErrorMessages("There is no products.");
        }
    }, [page, category === []]);

    useEffect(() => {
        let productsFilter = productsFiltered.map((product) => {
            let modelMatch = product.vehicles.find((vehicle) => {
                return vehicle.model === modelSelected;
            });

            return modelMatch ? product : null;
        });

        productsFilter = productsFilter.filter((product) => {
            return product !== null;
        });
        setProductsFiltered(productsFilter);
        setYears(getYearsOfModel());
        setShouldExecuteEffect(true);
    }, [modelSelected]);

    useEffect(() => {
        if (shouldExecuteEffect) {
            setYears(getYearsOfModel());
            setShouldExecuteEffect(false);
        }
    }, [shouldExecuteEffect, productsFiltered]);

    return (
        <section className="productsSection">
            <h2 className="productsTitle">Encontrá tu batería</h2>
            {brands ? (
                <section className="finderSection">
                    <select
                        onChange={handleBrandSelect}
                        name="brandSearcher"
                        className="brandSelecter"
                        defaultValue={brandSelected}
                    >
                        <option value="Marca">Marca</option>
                        {brands.map((brand) => {
                            return (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={handleModelSelect}
                        name="ModelSearcher"
                        className="modelSelecter"
                        defaultValue={modelSelected}
                    >
                        <option value="Model">Modelo</option>
                        {models.map((model) => {
                            return (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={handleYearSelect}
                        name="YearSearcher"
                        className="yearSelecter"
                        defaultValue={yearSelected}
                    >
                        <option value="Year">Año</option>
                        {years.map((year) => {
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </section>
            ) : null}
            <section className="ProductsShower">
                {productsFiltered?.length > 0
                    ? productsFiltered.map((article) => {
                          return (
                              <ProductCard
                                  key={article.id}
                                  article={article}
                                  addToCart={addToCart}
                              ></ProductCard>
                          );
                      })
                    : products?.length > 0
                    ? products.map((article) => {
                          return (
                              <ProductCard
                                  key={article.id}
                                  article={article}
                                  addToCart={addToCart}
                              ></ProductCard>
                          );
                      })
                    : null}
                {!finished ? (
                    <article className="btnArticle">
                        <button onClick={handleLoadMore} className="textButton">
                            Cargar Más
                        </button>
                    </article>
                ) : null}
            </section>
        </section>
    );
}
