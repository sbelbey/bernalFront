import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/vehicles`;

const getAllBrands = async () => {
    const { data } = await axios.get(`${baseUrl}/brands`);
    return data;
};

const getAllProductsByBrand = async (userToken, brand) => {
    const { data } = await axios.get(
        `${baseUrl}/productByBrand?brand=${brand}`,
        {
            headers: { Authorization: "Bearer " + userToken },
        }
    );
    return data.products;
};

export default { getAllBrands, getAllProductsByBrand };
