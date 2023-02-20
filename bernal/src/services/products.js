import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/products/`;

const getAll = async (page, userToken, category) => {
    const { data } = await axios.get(
        `${baseUrl}?page=${page}&category=${category}`,
        {
            headers: { authorization: "Bearer " + userToken },
        }
    );

    return data;
};

const getOne = async (pid, userToken) => {
    const { data } = await axios.get(`${baseUrl}/${pid}`, {
        headers: { authorization: "Bearer " + userToken },
    });
    return data;
};

export default { getAll, getOne };
