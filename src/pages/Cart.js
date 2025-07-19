import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { convertNumber } from "../utils/ConvertNumber.js";
import styled from "styled-components";
import arrowUp from "../assets/IconImages/arrow-up.png";
import CartProductsStyled from "../components/CartProducts/index.js";
import Footer from "../components/Footer/index.js";
import Header from "../components/Header/header.js";
import Loading from "../components/Loading/index.js";
import StyledLink from "../components/Link/index.js";
import Notify from "../components/Notify/index.js";
import { getDistance } from "../services/Distance.js";

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

const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`

const CartContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const CartContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2vh;
    gap: 2rem;  
    overflow: hidden;

    @media screen and (min-width: 1080px){
        margin: 4vh;
    }
`

const CartEmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
`

const CartEmptyButton = styled.button`
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
`

const CardEmptyContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
`

const CartEmptyText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
        color: white;
        text-align: center;
    }

    & p {
        font-size: .8rem;
        text-align: center;
        color: white;
    }
`

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: white;
    text-align: center;
`

const Checkout = styled.div`
    display: none;
    flex-direction: column;
    width: 20%;
    gap: 2rem;

    @media screen and (min-width: 1720px){
        display: flex;
    }
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
    border-radius: .5rem;
    gap: 2rem;

    &:hover {
        box-shadow: 1px 0px 5px 5px rgba(89, 0, 161, 0.2);
    }
`

const ProductsTotal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TotalValue = styled.div`
    display: flex;
    flex-direction: row;
    padding: .5rem;
    justify-content: space-between;
    border-bottom: 1px solid white;
    color: white;
`

const Portage = styled.div`
    display: none;
    flex-direction: row;
    padding: .5rem;
    justify-content: space-between;
    border-bottom: 1px solid white;
    color: white;
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
    display: flex;
    justify-content: center;
    color: white;
`

const Value = styled.p`
    color: rgb(0, 183, 255);
`

const PortageContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .5rem;
`

const PortageCepContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: .5rem; 
    width: 100%;
`

const PortageCep = styled.input`
    display: flex;
    justify-content: space-between;
    border: none;
    width: 70%;
    padding: 1rem .5rem;
    border-radius: .5rem;
    color: rgb(46,0,78);
    transition: all .5s ease-in-out;

    &::placeholder {
        color: rgb(46,0,78);
    }

    &:focus-visible {
        outline: none;
    }
`

const GenerateCepButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background-color: rgb(46,0,78);
    padding: .5rem;
    border-radius: .5rem;
    color: white;
    font-weight: bold;
    width: 30%;
    cursor: pointer;
    transition: all .5s ease-in-out;
    user-select: none;


    &:hover {
        background-color: rgba(46, 0, 78, 0.5);
    }

    @media screen and (min-width: 1720px){
        background-color: rgba(109, 0, 156, 0.5);

        &:hover {
            background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
        }
    }
`

const PortageSubmit = styled.input`
    font-family: 'Poppins', sans-serif;
    background-color: rgb(46,0,78);
    padding: .5rem;
    border: none;
    border-radius: .5rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all .5s ease-in-out;

    &:hover {
        background-color: rgba(46, 0, 78, 0.5);
    }

    @media screen and (min-width: 1720px){
        background-color: rgba(109, 0, 156, 0.5);

        &:hover {
            background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
        }
    }
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

const CheckoutButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(46,0,78,0.5);
    padding: 2rem;
    border-radius: .5rem;
    justify-content: center;
    gap: 1rem;
`

const CheckoutButton = styled.button`
    font-family: 'Poppins', sans-serif;
    color: white;
    background-color: rgba(109, 0, 156, 0.5);
    border: none;
    font-weight: bold;
    width: 100%;
    border-radius: .5rem;
    padding: 1.5rem;
    transition: all .7s;
    cursor: pointer;

    &:hover {
        background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
    }
`

const ReturnButton = styled.button`
    font-family: 'Poppins', sans-serif;
    background-color: transparent;
    color: white;
    border: 1px solid rgba(109, 0, 156, 0.5);
    font-weight: bold;
    width: 100%;
    border-radius: .5rem;
    padding: 1.5rem;
    transition: all .7s;
    cursor: pointer;

    &:hover {
        background-color: rgba(109, 0, 156, 0.5);
    }
`

const ButtonLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const BuyResumeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(109, 0, 156);
    padding: 1.5rem;
    gap: 1rem;
    position: sticky;
    bottom: 0;

    & .buy-button-link{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    @media screen and (min-width: 1720px){
        display: none;
    }

    @media screen and (min-width: 600px){
        & .buy-button-link{
            width: 90%;
        }
    }
`

const BuyResumeButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: rgb(109, 0, 156);
    border-radius: 100%;
    padding: .5rem;
    align-items: center;
    position: absolute;
    top: -15px;
    border: none;
    cursor: pointer;
    transition: all .5s ease-in-out;

    .arrow-img-down{
        transform: rotate(180deg);
    }
`

const ResumeButtonImg = styled.img`
    width: 1rem;
    transition: all .5s ease-in-out;
`

const ResumeContainer = styled.div`
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    width: 100%;

    @media screen and (min-width: 600px){
        width: 90%;
    }
`

const BuyResume = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-family: 'Poppins', sans-serif;

    & h3{
        font-weight: bold; 
    }

    @media screen and (min-width: 600px){
        width: 90%;
    }
`

const BuyResumeValue = styled.div`
    display: flex;
    flex-direction: row;
    gap: .5rem;
`

const BuyResumeDescription = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    width: 100%;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
`

const BuyResumeInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid white;
`

const BuyResumeInfoPortage = styled.div`
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid white;
`

const BuyResumePrices = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    width: 100%;
    gap: .5rem;
`

const BuyResumePrice = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-radius: .5rem;
    background-color: rgba(46, 0, 78, 0.5);
`

const PriceTerms = styled.div`
    display: flex;  
    flex-direction: column;
    text-align: right;
`

const TermsText = styled.p`
    font-size: .8rem;
`

const BuyButton = styled.button`
    font-family: 'Poppins', sans-serif;
    border-radius: .5rem;
    width: 100%;
    color: white;
    background-color: rgb(46,0,78);
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: all .5s ease-in-out;

    &:hover {
        background-color: rgba(46, 0, 78, 0.5);
    }
`

function CartProducts() {
    useEffect(() => {
        document.title = "SevenShop Store | Carrinho";
      }, []);

    const [cartProducts, setCartProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [notifyMessage, setNotifyMessage] = useState("");

    useEffect(() => {
        setLoading(true);
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartProducts(storedCart);
    
        const initialQuantities = {};
        storedCart.forEach((product) => {
            initialQuantities[product.id] = product.quantity;
        });
        setQuantities(initialQuantities);
        setLoading(false);
    }, []);

    function handleDeleteProduct(productId) {
        const updatedCart = cartProducts.filter((product) => product.id !== productId);
        setCartProducts(updatedCart);
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[productId];
            return updatedQuantities;
        });
    
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    function handleQuantityChange(productId, newQuantity) {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    
        const updatedCart = cartProducts.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        );
    
        setCartProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
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

    let isOpen = false;

    function openResume() {
        if (isOpen) {
            const resume = document.querySelector("div.resume-container");
            resume.style.display = "none";

            const img = document.querySelector("img.arrow-img-up");
            img.style.transform = "rotate(0deg)";

            isOpen = false;
        }else{
            const resume = document.querySelector("div.resume-container");
            resume.style.display = "flex";

            const img = document.querySelector("img.arrow-img-up");
            img.style.transform = "rotate(180deg)";

            isOpen = true;
        }
    }

    const [portageValue, setPortageValue] = useState(0);
    const [street, setStreet] = useState('');
    const [cep, setCep] = useState('');

    async function fetchDistance(e) {
        e.preventDefault();
        const origem = '04029-200';
        const destino = cep;
    
        try {
            setLoading(true);
            const response = await getDistance({origem, destino});
            
            if (!response.success || !response.data) {
                setNotifyMessage("Cep Não encontrado!");
                setLoading(false);
                return;
            } else{
                setLoading(false);
            }

            const data = response.data;
            
            if(data.rows[0].elements[0].status === 'OK'){
                getPortageValue(data.rows[0].elements[0].distance.value);
                setStreet(data.destination_addresses[0]);
            }else{
                setNotifyMessage("Cep Não encontrado!");
                return;
            }
        } catch (error) {
            console.error('Erro ao calcular distância:', error);
        }
    };

    const [cepPlaceholder, setCepPlaceholder] = useState('Digite seu CEP*');

    const handleFocus = () => {
        setCepPlaceholder('12345-678');
    };

    const handleBlur = () => {
        setCepPlaceholder('Digite seu CEP*');
    };

    function getPortageValue(distance){
        distance = distance / 1000;

        setPortageValue(distance * 0.1);

        const portageValue = document.querySelector("div.portage-value");
        const portageValueMq = document.querySelector("div.portage-value-mq");

        portageValue.style.display = "flex";
        portageValueMq.style.display = "flex";
    }

    const navigate = useNavigate();

    const verifyPortage = (e) => {
        e.preventDefault();

        if(portageValue > 0){
            navigate("/checkout", { state: { totalPrice, totalNewPrice, portageValue, street } });
        }
        else{
            setNotifyMessage("Preencha o campo de calculo do frete antes de prosseguir com a compra!");
        }
    }

    const handleCep = (e) => {
        let value = e.target.value;

        let result = '';
        const formattedValue = value.replace(/\D/g, '');

        if (formattedValue.length <= 5) {
            result = formattedValue;
        } 
        else {
            result = formattedValue.slice(0, 5) + '-' + formattedValue.slice(5, 9);
        }

        setCep(result);
    };

    const CEPS = ['80215-090', '20531-540', '13484-019', '96200-010', '04809-090', '29102-220', '68908-849']
    
    function generateCep(){
        const randomIndex = Math.floor(Math.random() * CEPS.length);
        const randomCep = CEPS[randomIndex];

        setCep(randomCep);
    }

    return (
        <>
        {loading ? (
            <LoadingContainer>
                <Loading/>
            </LoadingContainer>
        ) : cartProducts.length < 1 ? (

            <CartEmptyContainer> 
                <CardEmptyContent>
                    <Header displaySearch="none" displayButton="none" />
                    <CartEmptyText>
                        <h1>Seu carrinho está vazio.</h1>
                        <p>Adicione algum produto para finalizar a compra</p>
                    </CartEmptyText>
                    <StyledLink to={"/"}>
                        <CartEmptyButton>VOLTE A COMPRAR</CartEmptyButton>
                    </StyledLink>
                </CardEmptyContent>
                <Footer />
            </CartEmptyContainer>
        ) : (
            <>
                <Notify message={notifyMessage} setNotifyMessage={setNotifyMessage} />
                <CartContainer>
                    <CartContentContainer>
                        <Header displaySearch="none" displayButton="none" />
                        <CartContent>
                            <ProductCard>
                                <h1>PRODUTOS</h1>
                                {cartProducts.map((product) => {
                                    const imagePath = `https://7shop.api.ryandev.com.br/uploads/${product.src}.png`;

                                    return (
                                        <CartProductsStyled
                                            key={product.id}
                                            name={product.name}
                                            image={imagePath}
                                            price={product.price}
                                            newprice={product.newprice}
                                            id={product.id}
                                            src={product.src}
                                            quantity={quantities[product.id] || 1}
                                            onQuantityChange={handleQuantityChange}
                                            handleDeleteProduct={handleDeleteProduct}
                                        />
                                    );
                                })}
                            </ProductCard>

                            <Checkout>
                                <CheckoutTitle>RESUMO</CheckoutTitle>
                                <SummaryContainer>
                                    <ProductsTotal>
                                        <TotalValue>
                                            <SubtitleText>Total dos produtos:</SubtitleText>
                                            <Value>R$ {convertNumber(totalPrice)}</Value>
                                        </TotalValue>
                                        <Portage className="portage-value">
                                            <SubtitleText>Frete:</SubtitleText>
                                            <Value>R$ {convertNumber(portageValue)}</Value>
                                        </Portage>
                                    </ProductsTotal>

                                    <PortageContainer onSubmit={fetchDistance}>
                                        <PortageCepContainer>
                                            <PortageCep 
                                                type="text" 
                                                pattern="\d{5}-\d{3}" 
                                                value={cep}
                                                placeholder={cepPlaceholder} 
                                                onFocus={handleFocus} 
                                                onBlur={handleBlur} 
                                                maxLength={9} 
                                                onChange={handleCep}
                                                required
                                            />
                                            <GenerateCepButton onClick={generateCep}>GERAR</GenerateCepButton>
                                        </PortageCepContainer>
                                        <PortageSubmit type="submit" value="CALCULAR"/>
                                    </PortageContainer>

                                    <TotalPrices>
                                        <TotalInTime>
                                            <ValueInTime>
                                                <SubtitleText>Total à prazo:</SubtitleText>
                                                <Value>R$ {convertNumber(totalPrice + portageValue)}</Value>
                                            </ValueInTime>
                                            <Terms>
                                                <p>(Até 10x sem juros)</p>
                                            </Terms>
                                        </TotalInTime>
                                        <Total1x>
                                            <Value1x>
                                                <SubtitleText>Total à vista:</SubtitleText>
                                                <Value>R$ {convertNumber(totalNewPrice + portageValue)}</Value>
                                            </Value1x>
                                            <PriceTerms>
                                                <Terms><p>(Economize: <strong>R$ {convertNumber(totalDiscont)}</strong>)</p></Terms>
                                            </PriceTerms>
                                        </Total1x>
                                    </TotalPrices>
                                </SummaryContainer>

                                <CheckoutButtonContainer>
                                    <ButtonLink>
                                        <CheckoutButton onClick={verifyPortage}>CONTINUAR</CheckoutButton>
                                    </ButtonLink>
                                    <ButtonLink to="/">
                                        <ReturnButton>VOLTE A COMPRAR</ReturnButton>
                                    </ButtonLink>
                                </CheckoutButtonContainer>
                            </Checkout>

                        </CartContent>                      
                    </CartContentContainer>

                    <BuyResumeContainer>
                            <BuyResumeButton onClick={() => openResume()}>
                                <ResumeButtonImg className="arrow-img-up" src={arrowUp}/>
                            </BuyResumeButton>
                            <BuyResume>
                                <h3>RESUMO</h3>
                                <BuyResumeValue>
                                    <p>VALOR À VISTA:</p>
                                    <Value>
                                        <strong>
                                            R$ {convertNumber(totalNewPrice)}
                                        </strong>
                                    </Value>
                                </BuyResumeValue>
                            </BuyResume>

                            <ResumeContainer className="resume-container">

                                <BuyResumeDescription>
                                    <BuyResumeInfo>
                                        <p>Valor à prazo:</p>
                                        <Value><strong>R$ {convertNumber(totalPrice)}</strong></Value>
                                    </BuyResumeInfo>
                                    <BuyResumeInfoPortage className="portage-value-mq">
                                        <p>Frete:</p>
                                        <Value><strong>R$ {convertNumber(portageValue)}</strong></Value>
                                    </BuyResumeInfoPortage>
                                </BuyResumeDescription>

                                <PortageContainer onSubmit={fetchDistance}>
                                    <PortageCepContainer>
                                        <PortageCep 
                                            type="text" 
                                            pattern="\d{5}-\d{3}" 
                                            value={cep}
                                            placeholder={cepPlaceholder} 
                                            onFocus={handleFocus} 
                                            onBlur={handleBlur} 
                                            maxLength={9} 
                                            onChange={handleCep}
                                            required
                                        />
                                        <GenerateCepButton onClick={generateCep}>GERAR</GenerateCepButton>
                                    </PortageCepContainer>
                                    <PortageSubmit type="submit" value="CALCULAR"/>
                                </PortageContainer>

                                <BuyResumePrices>
                                    <BuyResumePrice>
                                        <p>Total à prazo:</p>
                                        <PriceTerms>
                                            <Value><strong>R$ {convertNumber(totalPrice + portageValue)}</strong></Value>
                                            <Terms>
                                                <TermsText>
                                                    (Até <strong>10x</strong> de <strong>{convertNumber((totalPrice + portageValue) / 10)}</strong> sem juros)
                                                </TermsText>
                                            </Terms>
                                        </PriceTerms>
                                    </BuyResumePrice>

                                    <BuyResumePrice>
                                        <p>Total à vista:</p>
                                        <PriceTerms>
                                            <Value><strong>R$ {convertNumber(totalNewPrice + portageValue)}</strong></Value>
                                            <Terms>
                                                <TermsText>
                                                    (Economize: <strong>R$ {convertNumber(totalDiscont)}</strong>)
                                                </TermsText>
                                            </Terms>
                                        </PriceTerms>
                                    </BuyResumePrice>
                                </BuyResumePrices>

                            </ResumeContainer>
                            <ButtonLink className="buy-button-link">
                                <BuyButton onClick={verifyPortage}>CONTINUAR</BuyButton>             
                            </ButtonLink>
                        </BuyResumeContainer>

                    <Footer display="none" />

                </CartContainer>
                </>
            )}
        </>
    );
}

export default CartProducts;

