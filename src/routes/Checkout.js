
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Footer from "../assets/footer/index.js";
import Header from "../assets/header/index.js";

const CheckoutContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    color: white;
    min-height: 100vh;
    width: 100%;
`

const CheckoutContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 100%;

    & div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
`

function Checkout() {
  const location = useLocation();
  const { totalPrice, totalNewPrice, portageValue, street } = location.state || {};

  return (
      <CheckoutContainer>
        <CheckoutContent>
          <Header/>

          <h1>PAGINA EM DESENVOLVIMENTO</h1>
          <div>
            <h1>Resumo da Compra</h1>
            <p>Endereço: {street}</p>
            <p>Total dos produtos: R$ {totalPrice}</p>
            <p>Total à vista: R$ {totalNewPrice}</p>
            <p>Frete: R$ {portageValue}</p>
          </div>
        </CheckoutContent>

          <Footer />
      </CheckoutContainer>


  );
}

export default Checkout;
