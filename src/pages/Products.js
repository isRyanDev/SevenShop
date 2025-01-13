import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products.js";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/header.js";
import Footer from "../components/Footer/index.js";
import Loading from "../components/Loading/index.js";
import ProductsStyled from "../components/HomeProducts/index.js";

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, rgb(46 0 78) 0%, rgb(84 0 133) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

const NoResultsContainer = styled.div`
    text-align: center;
    color: #999;
    margin: 20px 0;
    font-size: 18px;
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    gap: 1rem;
    overflow: hidden;
`

const ResultContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;
`

const ResultText = styled.p`
    font-size: 1.5rem;
    color: white;
    text-align: center;
`

const ProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
`

const SearchProducts = styled.div`
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "SevenShop Store";
    }, []);

    const [products, setProducts] = useState([]);
    const [productsFiltered, setproductsFiltered] = useState([]);
    const location = useLocation();

    const getQueryParams = () => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get('search');
    };

    const searchQuery = getQueryParams();

    async function fetchProducts() {
        setLoading(true);
        const productsAPI = await getProducts();
        setProducts(productsAPI);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const productsFill = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setproductsFiltered(productsFill);
    }, [searchQuery, products]);

    const images = require.context('../assets/ProductImages/', false, /\.(png|jpe?g|gif)$/);

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <Loading />
                </LoadingContainer>
            ) : (
                <ResultContainer>
                    <ResultContent>
                        <Header />
                        {productsFiltered.length > 0 ? (
                            <ProductsContainer>
                                <ResultText>Mostrando resultados para: {searchQuery}</ResultText>

                                <SearchProducts>
                                    {productsFiltered.map(product => {
                                        const imagePath = `./${product.src}.png`;
                                        const image = images(imagePath);

                                        return (
                                            <ProductsStyled
                                                key={product.id}
                                                name={product.name}
                                                image={image}
                                                price={product.price}
                                                newprice={product.newprice}
                                                src={product.src}
                                                id={product.id}
                                                author={product.author}
                                            />
                                        );
                                    })}
                                </SearchProducts>
                            </ProductsContainer>
                        ) : (
                            <NoResultsContainer>
                                Nenhum produto foi encontrado para a busca: <strong>{searchQuery}</strong>
                            </NoResultsContainer>
                        )}
                    </ResultContent>
                    <Footer />
                </ResultContainer>
            )}
        </>
    );
}

export default Products;