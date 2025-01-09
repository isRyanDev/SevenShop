import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Logo from "../logo/index.js"
import cartImg from "../images/cart-icon.png"
import Search from "../search/index.js"
import styled from "styled-components"
import searchImg from "../images/search-lupe.png"

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
    display: none;
    justify-content: center;
    align-items: center;
    height: 90%;

    @media screen and (min-width: 315px){
        display: flex;
    }
`

const SearchContent = styled.div`
    display: flex;
    position: absolute;
    top: 2rem; /* Ajuste conforme necessário */
    z-index: 20; /* Coloque acima do overlay */
    opacity: 0;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 2.8rem;
    border-radius: 1.5rem;
    width: 80%;
    transition: all 0.5s ease-in-out;

    @media screen and (min-width: 1000px){
        display: none;
    }
`;

const BlurOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    transition: all 0.5s ease-in-out;
`;

const SearchForm = styled.form` 
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const SearchInput = styled.input`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    box-sizing: border-box;
    height: 100%;
    margin: 0rem 1rem;

    &:focus-visible {
        outline: none;
    }
`

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;

    @media screen and (min-width: 1000px){
        display: none;
    }
`

const SearchImg = styled.img`
    width: 2rem;
    cursor: pointer;
`

function Header({displaySearch}){
    const [searchInput, setSearchInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchInput === "") {
            return;
        }else{
            navigate(`/produtos?search=${searchInput}`);
        }
      
    };

    function toggleSearch() {
        setIsOpen(!isOpen);
    }

    return (
        <HeaderContainer>
            <HeaderLogoContainer>
                <Logo />
            </HeaderLogoContainer>
    
            <HeaderSearchContainer>
                <Search display={displaySearch} />
            </HeaderSearchContainer>
    
            <HeaderMenuContainer>
                <HeaderMenu>
                    <HeaderMenuLi>
                        <LinkStyled to="mailto:suporte@sevenshop.com.br">
                            SUPORTE
                        </LinkStyled>
                    </HeaderMenuLi>
    
                    <SearchButton type="button" onClick={toggleSearch}>
                        <SearchImg src={searchImg} alt="search" />
                    </SearchButton>
    
                    <ShoppingBagContainer>
                        <LinkStyled to="/carrinho">
                            <ShoppingBag src={cartImg} alt="bag" />
                        </LinkStyled>
                    </ShoppingBagContainer>
                </HeaderMenu>
            </HeaderMenuContainer>
    
            <BlurOverlay isOpen={isOpen} onClick={toggleSearch} />
    
            <SearchContent
                style={{
                    opacity: isOpen ? "1" : "0",
                    transform: isOpen ? "translateY(+5rem)" : "translateY(-5rem)",
                }}
            >
                <SearchForm method="get" onSubmit={handleSubmit}>
                    <SearchInput
                        type="text"
                        placeholder="Busque aqui..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </SearchForm>
            </SearchContent>
        </HeaderContainer>
    );
}

export default Header