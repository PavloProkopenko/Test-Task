import axios from "axios";

const axios_api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 1000,
    responseType: 'json',
    headers: {
        "Content-Type": 'application/json'
    },
});

export default axios_api;
