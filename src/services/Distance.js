import axios from "axios";

const distanceAPI = axios.create({
    baseURL: "https://7shop.api.ryandev.com.br/distance",
});

async function getDistance(body) {
    const response = await distanceAPI.get("/", body);

    return response.data;
}

export { getDistance };