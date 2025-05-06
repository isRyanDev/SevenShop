import axios from "axios";

const productsAPI = axios.create({
    baseURL: "https://api.ryandev.com.br/produtos",
});

async function getProducts() {
    const response = await productsAPI.get("/");

    return response.data;
}

async function postProduct(product) {
    await productsAPI.post("/", product);
}

export { getProducts, postProduct };