import axios from "axios";

const productsAPI = axios.create({
    baseURL: "http://3.139.70.254:8000/produtos",
});

async function getProducts() {
    const response = await productsAPI.get("/");

    return response.data;
}

export { getProducts };