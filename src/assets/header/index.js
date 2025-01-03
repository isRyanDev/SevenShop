import Logo from "../logo/index.js"
import bagImg from "../images/shopping-bag.png"
import Search from "../search/index.js"
import styled from "styled-components"
import StyledLink from "../link/index.js"

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 4rem;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(88, 3, 150, 0.5);
`

const HeaderLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;

    @media screen and (min-width: 450px){
        width: 50%;
    }

    @media screen and (min-width: 1000px){
        width: 20%;
    )
`

const HeaderSearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const HeaderMenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const HeaderMenu = styled.ol`
    display: flex;
    flex-direction: row;
    width: 20%;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    list-style: none;
    gap: 1rem;
    font-weight: bold;
    transition: all .5s ease-in-out;

    @media screen and (min-width: 450px){
        width: 50%;
        font-size: 1.2rem;
    )

    @media screen and (min-width: 1000px){
        width: 20%;
    )
`

const HeaderMenuLi = styled.li`
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: 450px){
        display: flex;
    }
`

const ShoppingBag = styled.img`
    width: 2rem;
`

function Header(){
    return(
        <HeaderContainer>
            <HeaderLogoContainer>
                <Logo/>
            </HeaderLogoContainer>
                    
            <HeaderSearchContainer>
                <Search/>
            </HeaderSearchContainer>
        
            <HeaderMenuContainer>
                <HeaderMenu>
                    <HeaderMenuLi>
                        <StyledLink to="mailto:suporte@sevenshop.com.br">
                            SUPORTE
                        </StyledLink>
                    </HeaderMenuLi>
                    <HeaderMenuLi>
                        <StyledLink to="#contacts">
                            CONTATO
                        </StyledLink>
                    </HeaderMenuLi>

                    <StyledLink to="/carrinho">
                        <ShoppingBag src={bagImg} alt="bag" />
                    </StyledLink>

                </HeaderMenu>

            </HeaderMenuContainer>

        </HeaderContainer>
    )
}

export default Header