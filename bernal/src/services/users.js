import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/users`;

const login = async (credentials) => {
    const { data } = await axios.post(`${baseUrl}/login`, credentials);
    return data;
};

const successLogin = async () => {
    const data = await axios.get(`${baseUrl}/loginSuccess`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
    });
    return data;
};

const modifyUser = async (newData, userToken) => {
    const { data } = await axios.put(baseUrl, newData, {
        headers: { authorization: "Bearer " + userToken },
    });
    return data;
};

const registerUser = async (userData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/register`, userData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export default { login, successLogin, modifyUser, registerUser };
