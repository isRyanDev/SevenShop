import styled from "styled-components"
import searchImg from "../images/search-lupe.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SearchContent = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    height: 2.8rem;
    border-radius: 1.5rem;
`

const SearchForm = styled.form` 
    display: flex;
    
`

const SearchInput = styled.input`
    width: 25rem;
    background: transparent;
    border: none;
    box-sizing: border-box;
    margin: 1rem;

    &:focus-visible {
        outline: none;
    }
`

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 1.5rem;
    padding: .5rem; 
    margin: .2rem;
    background-color: rgb(89, 3, 150);
    cursor: pointer;
`

const SearchImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`

function Search(){
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchInput === "") {
            return;
        }else{
            navigate(`/produtos?search=${searchInput}`);
        }
      
    };

    return(
        <SearchContent>
            <SearchForm method="get" onSubmit={handleSubmit}>
                <SearchInput type="text" placeholder="Busque aqui..." value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/>
                <SearchButton type="submit">
                    <SearchImg src={searchImg} alt="search"/>
                </SearchButton>
            </SearchForm>
        </SearchContent>
    )
}

export default Search