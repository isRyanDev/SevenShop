import { Link } from "react-router-dom"
import Logo from "../logo/index.js"
import bagImg from "../images/shopping-bag.png"
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
    gap: 1rem;
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

const ShoppingBag = styled.img`
    height: 100%;
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
                        <LinkStyled to="mailto:suporte@sevenshop.com.br">
                            SUPORTE
                        </LinkStyled>
                    </HeaderMenuLi>
                    <HeaderMenuLi>
                        <LinkStyled to="#contacts">
                            CONTATO
                        </LinkStyled>
                    </HeaderMenuLi>

                    <LinkStyled to="/carrinho">
                        <ShoppingBag src={bagImg} alt="bag" />
                    </LinkStyled>

                </HeaderMenu>

            </HeaderMenuContainer>

        </HeaderContainer>
    )
}

export default Header