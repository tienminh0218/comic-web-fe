import axios from "axios";

const { COMIC_API_URL } = process.env;

const axiosClient = axios.create({
    baseURL: COMIC_API_URL || "http://localhost:5000/api",
    timeout: 5000,
});

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
