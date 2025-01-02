import { useEffect, useState } from "react";
import { getProducts } from "../services/products.js";
import styled from "styled-components";
import banner from "../assets/images/Banner.png"
import ProductsStyled from "../assets/products/index.js";

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
`

const Banner = styled.img`
    width: 100%;
    height: 35rem;
`

const ProductsContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 2rem;
    overflow: hidden;
`

function Home() {
    const [ products, setProducts ] = useState([]);
    async function fetchProducts() {
        const productsAPI = await getProducts();
        setProducts(productsAPI);
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const images = require.context('../assets/products-images', false, /\.(png|jpe?g|gif)$/)

    return (

      <HomeContainer>
          <Banner src={banner}/>

        <ProductsContainer>
          {products.map(product => {
            const imagePath = `./${product.src}.png`;

            const image = images(imagePath);

              return (
                <ProductsStyled key={product.id} name={product.name} image={image} price={product.price} newprice={product.newprice} src={product.src} id={product.id}/>
              )
            })}
        </ProductsContainer>

      </HomeContainer>

    );  
}

export default Home;
