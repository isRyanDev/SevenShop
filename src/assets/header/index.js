import Logo from "../logo/index.js"
import bagImg from "../images/shopping-bag.png"
import Search from "../search/index.js"
import styled from "styled-components"
import StyledLink from "../link/index.js"

const HeaderContainer = styled.header`
    display: flex;
    height: 8vh;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(88, 3, 150, 0.5);
`

const HeaderLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
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
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: 1.25rem;
    font-weight: bold;
    gap: 2rem;
    width: 20rem;
`

const HeaderMenuLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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