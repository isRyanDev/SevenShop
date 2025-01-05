import { Link } from "react-router-dom"
import Logo from "../logo/index.js"
import cartImg from "../images/cart-icon.png"
import Search from "../search/index.js"
import styled from "styled-components"

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 5rem;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    background-color: rgba(88, 3, 150, 0.5);

    @media screen and (min-width: 450px){
        justify-content: space-around;
        gap: 0;
        padding: 0;
    }

    @media screen and (min-height: 950px){
        height: 8vh;
    }
`

const HeaderLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

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
    height: 40%;

    @media screen and (min-width: 450px){
        width: 50%;
        font-size: 1.2rem;
    }

    @media screen and (min-width: 1000px){
        width: 20%;
    }
`

const HeaderMenu = styled.ol`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    list-style: none;
    gap: 2rem;
    font-weight: bold;
    transition: all .5s ease-in-out;

    @media screen and (min-width: 450px){
        font-size: 1.2rem;
    }
`

const HeaderMenuLi = styled.li`
    display: none;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;

    @media screen and (min-width: 450px){
        display: flex;
    }
`

const LinkStyled = styled(Link)`
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;  
    color: white;
    justify-content: center;
`

const ShoppingBagContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const ShoppingBag = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
`

function Header({displaySearch}){
    return(
        <HeaderContainer>
            <HeaderLogoContainer>
                <Logo/>
            </HeaderLogoContainer>
                    
            <HeaderSearchContainer>
                <Search display={displaySearch}/>
            </HeaderSearchContainer>
        
            <HeaderMenuContainer>
                <HeaderMenu>
                    <HeaderMenuLi>
                        <LinkStyled to="mailto:suporte@sevenshop.com.br">
                            SUPORTE
                        </LinkStyled>
                    </HeaderMenuLi>

                    <ShoppingBagContainer>
                        <LinkStyled to="/carrinho">
                            <ShoppingBag src={cartImg} alt="bag" />
                        </LinkStyled>
                    </ShoppingBagContainer>

                </HeaderMenu>

            </HeaderMenuContainer>

        </HeaderContainer>
    )
}

export default Header