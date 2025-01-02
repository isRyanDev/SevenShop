import styled from "styled-components"
import StyledLink from "../link/index.js"

const HeaderTitle = styled.h1`
    display: flex;
    justify-content: center;
    text-align: center;
    font-family: 'Dancing Script', Arial, Helvetica, sans-serif;
    font-size: 2.8rem;
    font-weight: bold;
`

function Logo(){
    return(
        <HeaderTitle>
            <StyledLink to={"/"}>
                Sevenshop
            </StyledLink>
        </HeaderTitle>
    )
}

export default Logo