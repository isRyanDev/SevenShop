import { deleteCartProduct } from "../../services/cart.js";
import styled from "styled-components"
import remCartImg from "../images/trash.png"
import arrowLeft from "../images/arrow-left.png"
import arrowRight from "../images/arrow-right.png"

const ProductsList = styled.ol`
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
`

const Product = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    background-color: rgba(46,0,78,0.5);
    padding: 1rem;
    border-radius: .5rem;
    transition: all .7s;

    &:hover {
        box-shadow: 1px 0px 5px 5px rgba(89, 0, 161, 0.2);
    }

    @media screen and (min-width: 1080px){
        flex-direction: row;

    }
`

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1.25rem;
    text-align: left;
    color: white;
    gap: 1.5rem;
`

const Description = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
`

const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;

    @media screen and (min-width: 1080px){
        flex-direction: row;
    }
`

const ProductImg = styled.img`
    max-height: 8rem;
    max-width: 8rem;
`

const ProductName = styled.h4`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: horizontal;
`

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 35rem;
`

const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .1rem;
`

const ProductPrice = styled.h3`
    font-size: .8rem;
    font-weight: 400;
    color: rgb(214, 214, 214);
`

const ProductNewPrice = styled.h3`
    font-size: .8rem;
    font-weight: 400;
    color: rgb(214, 214, 214);
`

const QuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 1080px){
        align-items: flex-start;
        width: unset;
    }
`

const QuantityMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    gap: .5rem;
`

const QuantityInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    border: none;
    color: white;
    fonte-weight: bold;
    padding: .2rem;
    width: 1.5rem;

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: 1px solid rgb(0, 183, 255);
        border-radius: .5rem;
    }
`

const QuantityContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: .5rem;

    & button{
        display: flex;
        background-color: transparent;
        border: none;
        cursor: pointer;

        & img {
            width: 1rem;
        }
    }
`

const CartRemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .5rem;
    text-align: center;
    border-radius: .5rem;
    transition: all .7s;
    max-width: 2rem;
`

const ButtonCartContainer = styled.button`
    display: flex;
    justify-content: center;
    border: none;
    align-items: center;
    background-color: transparent;
    border-radius: .5rem;
    transition: all .7s;
    cursor: pointer;
`

const ButtonCart = styled.img`
    width: 2rem;
`

const DiscontPriceContainer = styled.div`
    display: flex;
    color: white;
    flex-direction: column;
    max-width: 15rem;
    font-size: .8rem;
    gap: .5rem;

    & h2 {
        text-align: right;
        color: rgb(0, 183, 255);
    }
`

function CartProductsStyled({name, image, price, newprice, src, id, quantity, onQuantityChange, onDelete}) {

    function handleQuantityChange(e) {
        const newQuantity = Math.max(1, Math.min(25, Number(e.target.value)));
        onQuantityChange(id, newQuantity);
    }

    async function delCartProduct(productId) {
        await deleteCartProduct(productId);
        onDelete(productId);
    }

    function arrowL(){
        if(quantity > 1){
            onQuantityChange(id, Number(quantity) - 1);
        }
        else{
            delCartProduct(id);
        }
    }

    function arrowR(){
        if(quantity < 25){
            onQuantityChange(id, Number(quantity) + 1);
        }
        else{
            alert("Você pode não pode comprar mais de 25 produtos por vez!")
        }
    }

    let priceConvert = parseFloat(price)
    let newPriceConvert = parseFloat(newprice)

    priceConvert *= quantity
    newPriceConvert *= quantity

    return(
        <ProductsList>
            <Product key={id}> 
                <DescriptionContainer>
                    <Description>
                        <InfosContainer>
                            <ProductImg src={image} alt={src}/>
                            <ProductContainer>
                                <ProductName>
                                    {name}
                                </ProductName>
                                <PriceContainer>
                                    <ProductNewPrice>
                                        A vista com desconto: <strong>R${newPriceConvert.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                                    </ProductNewPrice>
                                    <ProductPrice>
                                        Parcelado em até 10x: <strong>R${priceConvert.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                                    </ProductPrice>
                                </PriceContainer>
                            </ProductContainer>
                        </InfosContainer>
                    </Description>
                </DescriptionContainer>

                <QuantityContainer>


                    <QuantityMain>
                        <label>Qtd</label>
                        <QuantityContent>
                            <button onClick={() => {arrowL()}}>
                                <img src={arrowLeft} alt="arrow-left"/>
                            </button>
                            <QuantityInput type="number" value={quantity} onChange={handleQuantityChange} min="1" max="25"/>
                            <button onClick={() => {arrowR()}}>
                                <img src={arrowRight} alt="arrow-right"/>
                            </button>
                        </QuantityContent>

                        <CartRemContainer>
                            <ButtonCartContainer onClick={() => {
                                delCartProduct(id)
                            }}>
                                <ButtonCart src={remCartImg} alt="Cart Icon"/>
                            </ButtonCartContainer>
                        </CartRemContainer>
                    </QuantityMain>
                        <DiscontPriceContainer>
                            <h4>Preço à vista no pix</h4>
                            <h2>R${newPriceConvert.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </DiscontPriceContainer>
                </QuantityContainer>

            </Product>
        </ProductsList>
    )
}

export default CartProductsStyled