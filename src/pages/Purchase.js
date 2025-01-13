import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { convertNumber } from "../utils/ConvertNumber.js";
import { getProducts, postProduct } from "../services/ProductsAPI.js";
import styled from "styled-components";
import Header from "../components/Header/header.js";
import Loading from "../components/Loading/index.js";

const PurchaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif; 
    gap: 1rem;
    color: white;
`;

const PurshaceInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(46,0,78);
    max-width: 40%;
    text-align: center;
    padding: 1rem;
    border-radius: .5rem;
`;

const InfoTitle = styled.h1`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    color: rgb(0, 183, 255);
`;

const Infos = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: .5rem;
    border-bottom: 1px solid white;
`;

const InfoRef = styled.h3`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    font-size: 1.375rem;
    letter-spacing: 1px;
`;

const InfoValue = styled.p`
    text-align: right;
    max-width: 50%;
`;

function Purchase() {
    const location = useLocation();
    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImgName, setProductImgName] = useState("");  // Nome da imagem abreviado
    const { totalValue, street, selectedMethod } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        setLoading(true);
        const productsAPI = await getProducts();
        setProducts(productsAPI);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function handleAddProduct(event) {
        event.preventDefault();

        const product = {
            name: productName,
            price: productPrice,
            newprice: productPrice - productPrice * 0.2,
            src: productImgName,
            author: userName,
            id: products.length + 1
        };

        postProduct(product);
    }

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <Loading />
                </LoadingContainer>
            ) : (
                <PurchaseContainer>
                    <Header displaySearch="none" displayButton="none" />

                    <PurshaceInfo>
                        <InfoTitle>Informações do pedido</InfoTitle>

                        <Infos>
                            <InfoRef>Total pago:</InfoRef>
                            <InfoValue>R$ {convertNumber(totalValue)}</InfoValue>
                        </Infos>

                        <Infos>
                            <InfoRef>Endereço de entrega:</InfoRef>
                            <InfoValue>{street}</InfoValue>
                        </Infos>

                        <Infos>
                            <InfoRef>Método de pagamento:</InfoRef>
                            <InfoValue>{selectedMethod}</InfoValue>
                        </Infos>
                    </PurshaceInfo>

                    {/* Formulário unificado */}
                    <form onSubmit={handleAddProduct} encType="multipart/form-data">
                        <input
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Digite seu nome"
                            required
                        />
                        <input
                            type="text"
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Digite o nome do produto"
                            required
                        />
                        <input
                            type="text"
                            onChange={(e) => setProductImgName(e.target.value)}
                            placeholder="Digite o nome abreviado"
                            required
                        />
                        <input
                            type="number"
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="Digite o valor do produto"
                            required
                        />
                        <input
                            type="file"
                            name="imagem"
                            required
                        />
                        <input
                            type="hidden"
                            name="name"
                            value={productImgName}  // Passando o nome abreviado para o upload
                        />
                        <button type="submit">Adicionar Produto</button>
                    </form>
                </PurchaseContainer>
            )}
        </>
    );
}

export default Purchase;
