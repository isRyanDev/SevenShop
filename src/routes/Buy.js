
import styled from "styled-components";
import Footer from "../assets/footer/index.js";

const BuyContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
`

function Buy() {
    return (

      <BuyContainer>
        <Footer/>
      </BuyContainer>

    );  
}

export default Buy;
