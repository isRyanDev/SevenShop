import axios from "axios";

const distanceAPI = axios.create({
    baseURL: "https://7shop.api.ryandev.com.br/distance",
    // baseURL: "http://localhost:3000/distance",
});

async function getDistance(body) {
    const response = await distanceAPI.post("/", body);

    return response.data;
}

export { getDistance };