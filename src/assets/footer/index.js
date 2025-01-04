import styled from "styled-components";

const FooterContainer = styled.footer`
    display: ${(props) => props.display || "flex"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(46,0,78,0.5);
    height: 5vh;
    width: 100%;

    @media screen and (min-width: 1720px){
        display: flex;
    }
`

const FooterText = styled.h1`
    font-family: 'Dancing Script', sans-serif;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
`

function Footer({display}){
    return(
        <FooterContainer display={display}>
            <FooterText>Copyright © 2024 SevenShop</FooterText>
        </FooterContainer>
    )
}

export default Footer;