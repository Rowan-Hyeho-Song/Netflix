import axios from "axios";

console.log("API KEY CHECK >>> ", import.meta.env.VITE_API_KEY);
const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3/",
    params: {
        api_key: import.meta.env.VITE_API_KEY,
    },
});

export default instance;
