import axios from "axios";

const cartProductsAPI = axios.create({
    baseURL: "http://localhost:8000/carrinho",
});

async function getCartProducts() {
    const response = await cartProductsAPI.get("/");

    return response.data;
}

async function postCartProducts(productId) {
    await cartProductsAPI.post(`/${productId}`);
}

async function patchCartProducts(productId, body) {
    await cartProductsAPI.patch(`/${productId}`, body);
}

async function deleteCartProduct(productId) {
    await cartProductsAPI.delete(`/${productId}`);
}

export { getCartProducts, postCartProducts, patchCartProducts, deleteCartProduct };