import axios from "axios";

const productsAPI = axios.create({
    baseURL: "https://api.ryandev.com.br/produtos",
});

async function getProducts() {
    const response = await productsAPI.get("/");

    return response.data;
}

async function postProduct(product) {
    const response = await productsAPI.post("/", product);

    return response.data;
}

export { getProducts, postProduct };