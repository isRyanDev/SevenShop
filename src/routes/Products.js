import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products.js";
import { useLocation } from "react-router-dom";
import ProductsStyled from "../assets/products/index.js";

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
    min-height: 90vh;
    gap: 1rem;
    overflow: hidden;
`

const ResultText = styled.p`
    font-size: 1.5rem;
    color: white;
`

const ProductsContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
        
    @media (min-width: 1320px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1750px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

function Products() {
    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setproductsFiltered ] = useState([]);
    const location = useLocation();

    const getQueryParams = () => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get('search');
    };
  
    const searchQuery = getQueryParams();

    async function fetchProducts() {
        const productsAPI = await getProducts();
        setProducts(productsAPI);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const productsFill = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setproductsFiltered(productsFill);
    }, [searchQuery, products]);

    const images = require.context('../assets/products-images', false, /\.(png|jpe?g|gif)$/)
    
    return (

        <ResultContainer>
            <ResultText>Mostrando resultados para: {searchQuery}</ResultText>

            <ProductsContainer>
                {productsFiltered.map(product => {
                    const imagePath = `./${product.src}.png`;
            
                    const image = images(imagePath);

                    return (
                        <ProductsStyled name={product.name} image={image} price={product.price} newprice={product.newprice} src={product.src} id={product.id}/>
                    )
                })}
            </ProductsContainer>
        </ResultContainer>

    );  
}

export default Products;
