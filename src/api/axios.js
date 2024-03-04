import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3/",
    params: {
        api_key: "47692baa39c263037a837c857b7c990d",
        language: "ko-KR",
    },
});

export default instance;
