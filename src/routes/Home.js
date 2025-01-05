import { useEffect, useState } from "react";
import { getProducts } from "../services/products.js";
import styled from "styled-components";
import banner from "../assets/images/Banner.png"
import ProductsStyled from "../assets/products/index.js";
import Footer from "../assets/footer/index.js";
import Header from "../assets/header/index.js";
import Loading from "../assets/loader/index.js";

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgb(46 0 78) 0%, rgb(84 0 133) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
`

const Banner = styled.img`
    width: 100%;
`

const ProductsContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    padding: 2rem;
    overflow: hidden;

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

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "SevenShop Store";
  }, []);

    const [ products, setProducts ] = useState([]);
    async function fetchProducts() {
        setLoading(true);
        const productsAPI = await getProducts();
        setProducts(productsAPI);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const images = require.context('../assets/products-images', false, /\.(png|jpe?g|gif)$/)

    return (
      <>
        {loading ? (
            <LoadingContainer>
                <Loading/>
            </LoadingContainer>
        ) : (
            <HomeContainer>

            <Header/>

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

            <Footer/>
          </HomeContainer>
        )}
      </>
    );
}


export default Home;
