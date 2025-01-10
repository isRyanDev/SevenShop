import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Header from "../assets/header";

const PurchaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

function Purchase(){
    const location = useLocation();
    const { totalValue } = location.state || {};

    return(
        <PurchaseContainer>
            <Header displaySearch="none" displayButton="none"/>
            <h1>Parabéns!</h1>
            <p>Você acaba de finalizar sua compra no valor: R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </PurchaseContainer>
    )
}

export default Purchase