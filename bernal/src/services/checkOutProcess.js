import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/checkout/process`;

const checkoutCart = async (cart) => {
    const { data } = await axios.post(baseUrl, cart);
    return data;
};

export default { checkoutCart };
