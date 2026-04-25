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
    font-family: 'Bebas Neue', sans-serif;
    color: white;
    letter-spacing: 2px;
    font-size: 1.2rem;
`

function Footer({display}){
    const year = new Date().getFullYear();

    return(
        <FooterContainer display={display}>
            <FooterText>© SevenShop {year}</FooterText>
        </FooterContainer>
    )
}

export default Footer;