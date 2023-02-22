import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/sendEmail/sns`;

const sendEmail = async (userData, subject) => {
    try {
        userData.subject = subject;
        const { data } = await axios.post(baseUrl, userData);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default { sendEmail };
