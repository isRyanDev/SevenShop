import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { convertNumber } from "../utils/ConvertNumber.js";
import Header from "../components/Header/header.js";

const PurchaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif; 
    gap: 1rem;
    color: white;
`

const PurshaceInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(46,0,78);
    max-width: 40%;
    text-align: center;
    padding: 1rem;
    border-radius: .5rem;
`

const InfoTitle = styled.h1`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    color: rgb(0, 183, 255);
`

const Infos = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: .5rem;
    border-bottom: 1px solid white;
`

const InfoRef = styled.h3`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    font-size: 1.375rem;
    letter-spacing: 1px;
`

const InfoValue = styled.p`
    text-align: right;
    max-width: 50%;
`

function Purchase(){
    const location = useLocation();
    const { totalValue, street, selectedMethod } = location.state || {};

    return(
        <PurchaseContainer>
            <Header displaySearch="none" displayButton="none"/>

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

            <form action="https://api.ryandev.com.br/uploads" method="post" enctype="multipart/form-data">
                <input type="file" name="imagem" />
                <button type="submit">Enviar Imagem</button>
            </form>
        </PurchaseContainer>
    )
}

export default Purchase