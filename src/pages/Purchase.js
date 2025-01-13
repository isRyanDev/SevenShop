import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { convertNumber } from "../utils/ConvertNumber.js";
import styled from "styled-components";
import Header from "../components/Header/header.js";

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
    const { totalValue, street, selectedMethod } = location.state || {};

    // Função para enviar um novo produto
    async function postNewProduct(newProductData) {
        try {
            const response = await fetch('https://api.ryandev.com.br/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductData),
            });
    
            const text = await response.text();  // Pega a resposta como texto
            console.log('Resposta da API:', text);
    
            // Verifica se a resposta tem conteúdo antes de tentar fazer o parse para JSON
            if (response.ok && text) {
                const data = JSON.parse(text);  // Faz o parse manual do JSON
                console.log('Produto adicionado com sucesso:', data);
            } else {
                console.error('Erro ao enviar produto:', text);
            }
        } catch (error) {
            console.error('Erro ao enviar produto:', error);
        }
    }

    // Função chamada ao submeter o formulário
    function handleAddProduct(event) {
        event.preventDefault();

        const newProductData = {
                name: productName,
                price: productPrice,
                newprice: productPrice - (productPrice * 0.2),
                quantity: 1,
                src: productName,
                author: userName,
                id: 20
        };

        postNewProduct(newProductData).then((response) => {
            if (response) {
                // Limpar os campos do formulário
                setUserName("");
                setProductName("");
                setProductPrice("");
            }
        });
    }

    return (
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

            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Digite seu nome"
                    value={userName}
                />
                <input
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Digite o nome do produto"
                    value={productName}
                />
                <input
                    type="number"
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Digite o valor do produto"
                    value={productPrice}
                />
                <button type="submit">Adicionar Produto</button>
            </form>

            <form action="https://api.ryandev.com.br/uploads" method="post" enctype="multipart/form-data">
                <input type="file" name="imagem" />
                <button type="submit">Enviar Imagem</button>
            </form>
        </PurchaseContainer>
    );
}

export default Purchase;