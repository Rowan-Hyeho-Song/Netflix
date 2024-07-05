import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3/",
    timeout: 10000,
    adapter: ["xhr", "http", "https"],
    params: {
        api_key: import.meta.env.VITE_API_KEY,
    },
});

export default instance;
