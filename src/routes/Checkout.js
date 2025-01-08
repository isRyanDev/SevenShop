import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ccType from 'credit-card-type';
import styled from "styled-components";
import arrowUp from "../assets/images/arrow-up.png"
import pix from "../assets/images/pix-icon.png"
import card from "../assets/images/card-icon.png"
import barCode from "../assets/images/bar-code-icon.png"
import cardChip from "../assets/images/card-chip.png"
import mastercardIcon from "../assets/images/mastercard-icon.png"
import visaIcon from "../assets/images/visa-icon.png"
import amexIcon from "../assets/images/amex-icon.png"
import eloIcon from "../assets/images/elo-icon.png"
import Footer from "../assets/footer/index.js";
import Header from "../assets/header/index.js";

const CheckoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`

const CheckoutContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const CheckoutContent = styled.div`
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

const PaymentsMethodContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 2rem;

    @media screen and (min-width: 1720px){
        width: 50%;
    }
`

const PaymentsMethodContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const PaymentMethod = styled.button`
    display: flex;
    flex-direction: column;
    border-radius: .5rem;
    background-color: transparent;
    overflow: hidden;
    width: 100%;
    border: 1px solid white;
    cursor: pointer;

    & .active{
        transition: all .5s ease-in-out;
        opacity: 1;
        max-height: unset;
        transform: translateY(0);
        padding: 1rem;

        & p {
            opacity: 1;
            max-height: unset;
        }
    }

    & .active-card{
        justify-content: center;
        gap: 1rem;
        align-items: center;
        opacity: 1;
        transform: translateY(0);
        max-height: unset;
        padding: 1rem;

        & p {
            opacity: 1;
            max-height: unset;
        }
    }

    @media screen and (min-width: 1720px){
        & .active-card{
            justify-content: space-evenly;
            align-items: unset;
        }
    }
`

const PaymentMethodCheckbox = styled.div`
    display: flex;
    font-family: 'Poppins', sans-serif;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    align-items: center;
`

const MethodTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    color: white;
`

const MethodImg = styled.img`
    width: 1rem;

    @media screen and (min-width: 1720px){
        width: 1.5rem;
    }
`

const CardChipImg = styled.img`
    width: 2.5rem;
`

const PaymentContent = styled.div`
    display: flex;
    text-align: left;
    font-family: 'Poppins', sans-serif;
    border-top: 1px solid white;
    transition: all .5s ease-in-out;
    transform: translateX(-50rem);
    overflow: hidden;
    width: 100%;    
    opacity: 0;
    max-height: 0;
    box-sizing: border-box;
    padding: 0;
    color: white;

    & p {
        opacity: 0;
        max-height: 0;
    }
`

const CardPaymentContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: left;
    border-top: 1px solid white;
    transition: all .5s ease-in-out;
    width: 100%;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transform: translateX(-50rem);
    box-sizing: border-box;
    padding: 0;
    color: white;

    & p {
        opacity: 0;
        max-height: 0;
    }

    @media screen and (min-width: 1720px){
        flex-direction: row;
    }

    & .flip-card{
        transform: rotate3d(0, 1, 0, 180deg)
    }
`

const SummaryContainer = styled.div`
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

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: .5rem;
    transition: all .5s ease-in-out;
    width: 90%;
    transform: rotate3d(0);
    gap: 1.5rem;
    background-color: rgb(97, 97, 97);
    padding: 1rem;

    @media screen and (min-width: 650px){
        width: 40%;
        padding: 1.5rem;
    }
`

const CardForm = styled.form`
    display: flex;
    font-family: 'Poppins', sans-serif;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    color: white;

    @media screen and (min-width: 1720px){
        width: 50%;
    }
`

const SmallInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: .5rem;
    width: 100%;
`

const MethodInputSmall = styled.input`
    width: 50%;
    padding: .5rem;
    border: none;
    box-sizing: border-box;
    border-radius: .5rem;

    &::placeholder {
        color: rgb(46,0,78);
    }

    &:focus-visible {
        outline: none;
    }
`

const MethodInput = styled.input`
    width: 100%;
    padding: .5rem;
    border: none;
    color: rgb(46,0,78);
    box-sizing: border-box;
    border-radius: .5rem;

    &::placeholder {
        color: rgb(46,0,78);
    }

    &:focus-visible {
        outline: none;
    }
`

const CardContentContainer = styled.div`
    display: flex;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    & p{
        transition: all .5s ease-in-out;
    }

    & .active-input{
        transition: all .5s ease-in-out;
        font-weight: bold;
    }
`

const CardFlagInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const CardFlagImg = styled.img`
    border-radius: .5rem;
    width: 4rem;
`

const CardContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const CardDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .2rem;
`

const SummaryContent = styled.div`
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

    & .active{
        opacity: 1;
        max-height: unset;
        padding: .5rem;
    }
`

const ValueContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: .5rem;
    justify-content: space-between;
    border-bottom: 1px solid white;
    color: white;
`

const DiscontContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0;
    opacity: 0;
    max-height: 0;
    justify-content: space-between;
    border-bottom: 1px solid white;
    color: white;
    transition: all .5s ease-in-out;
`

const Portage = styled.div`
    display: flex;
    flex-direction: row;
    padding: .5rem;
    justify-content: space-between;
    border-bottom: 1px solid white;
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

const CheckoutButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;,

    &.open {
        max-height: unset;
        opacity: 1;
    }

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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid white;
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
    transition: all .5s ease-in-out;

    &:hover {
        background-color: rgba(46, 0, 78, 0.5);
    }
`

function Checkout() {
    const location = useLocation();
    const { totalPrice, totalNewPrice, portageValue } = location.state || {};
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedInput, setSelectedInput] = useState(null);
    const [cardNumber, setCardNumber] = useState('•••• •••• •••• ••••');
    const [cardBrand, setCardBrand] = useState(null);
    const [cardDate, setCardDate] = useState('••/••');
    const [cardDateForm, setCardDateForm] = useState('');
    const [cardName, setCardName] = useState('NOME DO TITULAR');
    const totalDiscont = totalPrice - totalNewPrice;

    useEffect(() => {
        document.title = "SevenShop Store | Checkout";
      }, []);

    useEffect(() => {
        const cardNumber = document.getElementById("card-number");
        const cardName = document.getElementById("card-name");
        const cardDate = document.getElementById("card-date");

        if(selectedInput === "cvv") {
            cardNumber.style.opacity = "0";
            cardName.style.opacity = "0";
            cardDate.style.opacity = "0";
        }
        else {
            cardNumber.style.opacity = "1";
            cardName.style.opacity = "1";
            cardDate.style.opacity = "1";
        }
    })

    function openResume() {
        const resume = document.querySelector("div.resume-container");
        const img = document.querySelector("img.arrow-img-up");
    
        if (resume.classList.contains("open")) {
            resume.classList.remove("open");
            img.style.transform = "rotate(0deg)";
        } else {
            resume.classList.add("open");
            img.style.transform = "rotate(180deg)";
        }
    }

    const handleMethodClick = (method) => {
        setSelectedMethod(method);
    };

    const handleInputClick = (method) => {
        setSelectedInput(method);
    };

    const handleCardNumber = (e) => {
        const value = e.target.value;
        setCardNumber(cardNumberFormatter(value));

        const cardInfo = ccType(value);
        if (cardInfo.length > 0 && value !== '') {
          setCardBrand(cardInfo[0].type);
        //   console.log(cardInfo)
        } else {
          setCardBrand(null);
        }
    };

    const cardNumberFormatter = (value) => {
    const clearNumber = value.replace(/\D/g, '');
    
    let simbolNumber = '•••• •••• •••• ••••';

    for (let i = 0; i < clearNumber.length; i++) {
        simbolNumber = simbolNumber.replace('•', clearNumber[i]);
    }

    return simbolNumber;
    };

    const getCardBrandLogo = (brand) => {
        switch (brand) {
          case 'visa':
            return <CardFlagImg src={visaIcon} alt="Visa" />;
          case 'mastercard':
            return <CardFlagImg src={mastercardIcon} alt="MasterCard" />;
          case 'american-express':
            return <CardFlagImg src={amexIcon} alt="American Express" />;
          case 'elo':
            return <CardFlagImg src={eloIcon} alt="Elo" />;
          default:
            return null;
        }
    };

    const handleCardName = (e) => {
        const value = e.target.value;
        setCardName(cardNameFormatter(value));
    };

    const cardNameFormatter = (value) => {
        let defaultName = 'NOME DO TITULAR';

        if(value === '') return defaultName;

        return value;
    };

    const handleCardDate = (e) => {
        let value = e.target.value;
        setCardDate(cardDateFormatter(value));

        let result = '';
        const formattedValue = value.replace(/\D/g, '');

        if (formattedValue.length <= 2) {
            result = formattedValue;
        } 
        else {
            result = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
        }

        setCardDateForm(result);
    };

    const cardDateFormatter = (value) => {
        const clearNumber = value.replace(/\D/g, '');
        
        let simbolNumber = '••/••';
    
        for (let i = 0; i < clearNumber.length; i++) {
            simbolNumber = simbolNumber.replace('•', clearNumber[i]);
        }
    
        return simbolNumber;
    };

    return (
        <CheckoutContainer>
            <CheckoutContentContainer>
                <Header displaySearch="none"/>
                
                <CheckoutContent>

                    <PaymentsMethodContainer>
                        <CheckoutTitle>FORMA DE PAGAMENTO</CheckoutTitle>

                        <PaymentsMethodContent>
                            <PaymentMethod onClick={() => handleMethodClick("pix")}>
                                <PaymentMethodCheckbox>
                                    <MethodTitle>
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            checked={selectedMethod === "pix"}
                                            readOnly
                                        />
                                        <h3>PIX</h3>
                                    </MethodTitle>
                                    <MethodImg src={pix} alt="pix-icon" />
                                </PaymentMethodCheckbox>
                                <PaymentContent className={selectedMethod === "pix" ? "active" : ""}>
                                    <p>Até 20% de desconto com aprovação imediata que torna a expedição mais rápida do pedido.</p>
                                </PaymentContent>
                            </PaymentMethod>

                            <PaymentMethod onClick={() => handleMethodClick("boleto")}>
                                <PaymentMethodCheckbox>
                                    <MethodTitle>
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            checked={selectedMethod === "boleto"}
                                            readOnly
                                        />
                                        <h3>BOLETO BANCÁRIO</h3>
                                    </MethodTitle>
                                    <MethodImg src={barCode} alt="bar-code-icon" />
                                </PaymentMethodCheckbox>
                                <PaymentContent className={selectedMethod === "boleto" ? "active" : ""}>
                                    <p>Opção prática com aprovação em até 2 dias úteis.</p>
                                </PaymentContent>
                            </PaymentMethod>

                            <PaymentMethod onClick={() => handleMethodClick("card")}>
                                <PaymentMethodCheckbox>
                                    <MethodTitle>
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            checked={selectedMethod === "card"}
                                            readOnly
                                        />
                                        <h3>CARTÃO DE CRÉDITO</h3>
                                    </MethodTitle>
                                    <MethodImg src={card} alt="card-icon" />
                                </PaymentMethodCheckbox>
                                <CardPaymentContent className={selectedMethod === "card" ? "active-card" : ""}>

                                    <CardContainer className={selectedInput === "cvv" ? "flip-card" : ""}>
                                        <CardChipImg src={cardChip} alt="card=chip"/>

                                        <CardContentContainer>
                                            <CardFlagInfo>
                                                <p id="card-number" className={selectedInput === "number" ? "active-input" : ""}> {cardNumber}</p>
                                                {getCardBrandLogo(cardBrand)}
                                            </CardFlagInfo>

                                            <CardContent>
                                                <p id="card-name" className={selectedInput === "name" ? "active-input" : ""}>{cardName}</p>

                                                <CardDate id="card-date" className={selectedInput === "date" ? "active-input" : ""}>
                                                    <p>Valido até</p>
                                                    <p>{cardDate}</p>
                                                </CardDate>
                                            </CardContent>
                                        </CardContentContainer>
                                    </CardContainer>
                                    <CardForm>
                                        <MethodInput onFocus={() => handleInputClick("number")}
                                            type="text"
                                            onChange={handleCardNumber}
                                            maxLength={16}
                                            placeholder="1234 5678 1234 5678"
                                        />

                                        <MethodInput onFocus={() => handleInputClick("name")}
                                            type="text"
                                            onChange={handleCardName}
                                            placeholder="Nome impresso no cartão"
                                        />  

                                        <SmallInputContainer>
                                            <MethodInputSmall onFocus={() => handleInputClick("date")}
                                                type="text"
                                                value={cardDateForm}
                                                onChange={handleCardDate}
                                                pattern="\d{2}/\d{2}"
                                                maxLength={5}
                                                placeholder="MM/AA"
                                            />  

                                            <MethodInputSmall onFocus={() => handleInputClick("cvv")}
                                                type="text"
                                                maxLength={3}   
                                                placeholder="CVV"
                                            />  
                                        </SmallInputContainer>
                                    </CardForm>
                                </CardPaymentContent>
                            </PaymentMethod>
                        </PaymentsMethodContent>
                    </PaymentsMethodContainer>

                    <SummaryContainer>
                        <CheckoutTitle>RESUMO</CheckoutTitle>
                        <SummaryContent>
                            <ProductsTotal>
                                <ValueContainer>
                                    <SubtitleText>Valor dos produtos:</SubtitleText>
                                    <Value>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                                </ValueContainer>

                                <DiscontContainer className={selectedMethod === "pix" || selectedMethod === "boleto" ? "active" : ""}>
                                    <SubtitleText>Desconto:</SubtitleText>
                                    <Value>R$ {totalDiscont.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                                </DiscontContainer>

                                <Portage className="portage-value">
                                    <SubtitleText>Frete:</SubtitleText>
                                    <Value>R$ {portageValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
                                </Portage>

                            </ProductsTotal>

                            <CheckoutButtonContainer>
                                <ButtonLink>
                                    <CheckoutButton>FINALIZAR COMPRA</CheckoutButton>
                                </ButtonLink>
                                <ButtonLink to="/carrinho">
                                    <ReturnButton>VOLTAR</ReturnButton>
                                </ButtonLink>
                            </CheckoutButtonContainer>

                        </SummaryContent>
                    </SummaryContainer>

                </CheckoutContent>                      
            </CheckoutContentContainer>

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
                                    R$ {totalNewPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </strong>
                            </Value>
                        </BuyResumeValue>
                    </BuyResume>

                    <ResumeContainer className="resume-container">

                        <BuyResumeDescription>

                            <BuyResumeInfo>
                                <p>Valor à prazo:</p>
                                <Value><strong>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></Value>
                            </BuyResumeInfo>
                            <BuyResumeInfoPortage className="portage-value-mq">
                                <p>Frete:</p>
                                <Value><strong>R$ {portageValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></Value>
                            </BuyResumeInfoPortage>
                        </BuyResumeDescription>

                    </ResumeContainer>
                    <ButtonLink className="buy-button-link">
                        <BuyButton>FINALIZAR COMPRA</BuyButton>             
                    </ButtonLink>
                </BuyResumeContainer>

                <h3 style={{textAlign: "center", color: "white"}}>PAGINA EM DESENVOLVIMENTO</h3>

            <Footer display="none" />

        </CheckoutContainer>
    );
}

export default Checkout;