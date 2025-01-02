import { getCartProducts, patchCartProducts } from "../services/cart";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CartProductsStyled from "../assets/cart-products/index.js";
import StyledLink from "../assets/link/index.js";

const CartContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    margin: 2rem;
    min-height: 92vh;
    overflow: hidden;
`

const CartEmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
    gap: 1.5rem;
    min-height: 90vh;
    overflow: hidden;

    & button{
        color: white;
        background-color: rgba(109, 0, 156, 0.5);
        border: none;
        font-weight: bold;
        border-radius: .5rem;
        padding: 1.5rem;
        transition: all .7s;

        &:hover {
            background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
            cursor: pointer;
        }
    }
`

const CartEmptyText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
        color: white;
    }

    & p {
        font-size: .8rem;
        color: white;
    }
`

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: white;
    width: 65%;
    text-align: center;
`

const Checkout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const CheckoutTitle = styled.h1`
    text-align: center;
    color: white;
`

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(46,0,78,0.5);
    padding: 2rem;
    width: 25rem;
    border-radius: .5rem;
    gap: .5rem;
    gap: 4rem;

    &:hover {
        box-shadow: 1px 0px 5px 5px rgba(89, 0, 161, 0.2);
    }
`

const ProductsTotal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;

    & div {
        display: flex;
        flex-direction: row;
        padding: .5rem;
        justify-content: space-between;
        border-bottom: 1px solid white;
        color: white;
    }
`

const TotalPrices = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .5rem;
    text-align: right;
    color: white;
`

const SubtitleText = styled.p`
    color: white;
`

const Value = styled.p`
    color: rgb(0, 183, 255);
`

const TotalInTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(109, 0, 156, 0.5);
    padding: .5rem;
    border-radius: .5rem;
    gap: .5rem;
`

const ValueInTime = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
`

const Terms = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: .5rem;
    font-size: .8rem;
`

const Total1x = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(109, 0, 156, 0.5);
    padding: .5rem;
    border-radius: .5rem;
    gap: .5rem;
`

const Value1x = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Discont = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: .5rem;
    font-size: .8rem;
`

function CartProducts() {
    const [cartProducts, setCartProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    async function fetchCartProducts() {
        const cartProductsAPI = await getCartProducts();
        setCartProducts(cartProductsAPI);

        const initialQuantities = {};
        cartProductsAPI.forEach((product) => {
            initialQuantities[product.id] = product.quantity;
        });
        setQuantities(initialQuantities);
    }

    useEffect(() => {
        fetchCartProducts();
    }, []);

    function handleDeleteProduct(productId) {
        setCartProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[productId];
            return updatedQuantities;
        });
    }

    function handleQuantityChange(productId, newQuantity) {
        setQuantities((prevQuantities) => ({
            ...prevQuantities, [productId]: newQuantity,
        }));

        patchCartProducts(productId, { quantity: newQuantity })
    }

    const totalPrice = cartProducts.reduce((total, product) => {
        const quantity = quantities[product.id] || 1;
        return total + parseFloat(product.price) * quantity;
    }, 0);

    const totalNewPrice = cartProducts.reduce((total, product) => {
        const quantity = quantities[product.id] || 1;
        return total + parseFloat(product.newprice) * quantity;
    }, 0);

    const totalDiscont = totalPrice - totalNewPrice;
    const frete = 32.9;

    const images = require.context('../assets/products-images', false, /\.(png|jpe?g|gif)$/);

    if (cartProducts.length < 1) {
        return (
            <CartEmptyContainer>
                <CartEmptyText>
                    <h1>Seu carrinho está vazio.</h1>
                    <p>Adicione algum produto para finalizar a compra</p>
                </CartEmptyText>
                <StyledLink to={"/"}>
                    <button>VOLTE A COMPRAR</button>
                </StyledLink>
            </CartEmptyContainer>
        );
    } else {
        return (
            <CartContainer>
                
                <ProductCard>
                    <h1>PRODUTOS</h1>
                    {cartProducts.map((product) => {
                        const imagePath = `./${product.src}.png`;
                        const image = images(imagePath);

                        return (
                            <CartProductsStyled
                                key={product.id}
                                name={product.name}
                                image={image}
                                price={product.price}
                                newprice={product.newprice}
                                id={product.id}
                                src={product.src}
                                quantity={quantities[product.id] || 1}
                                onQuantityChange={handleQuantityChange}
                                onDelete={handleDeleteProduct}
                            />
                        );
                    })}
                </ProductCard>

                <Checkout>
                    <CheckoutTitle>RESUMO</CheckoutTitle>
                    <SummaryContainer>
                        <ProductsTotal>
                            <div>
                                <SubtitleText>Total do produtos:</SubtitleText>
                                <Value>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                            </div>
                            <div>
                                <SubtitleText>Frete:</SubtitleText>
                                <Value>R$ {frete.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                            </div>
                        </ProductsTotal>
                        <TotalPrices>
                            <TotalInTime>
                                <ValueInTime>
                                    <SubtitleText>Total à prazo:</SubtitleText>
                                    <Value>R$ {(totalPrice + frete).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                                </ValueInTime>
                                <Terms>
                                    <p>(Até 10x sem juros)</p>
                                </Terms>
                            </TotalInTime>
                            <Total1x>
                                <Value1x>
                                    <SubtitleText>Total à vista:</SubtitleText>
                                    <Value>R$ {(totalNewPrice + frete).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                                </Value1x>
                                <Discont>
                                    <SubtitleText>(Desconto: </SubtitleText>
                                    <p>R$ {totalDiscont.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</p>
                                </Discont>
                            </Total1x>
                        </TotalPrices>
                    </SummaryContainer>
                </Checkout>
            </CartContainer>
        );
    }
}

export default CartProducts;

