import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { convertNumber } from "../utils/ConvertNumber.js";
import { getProducts, postProduct } from "../services/ProductsAPI.js";
import CustomUpload from "../components/CustomUpload/index.js";
import styled from "styled-components"
import Header from "../components/Header/header.js";
import Footer from "../components/Footer/index.js";
import Loading from "../components/Loading/index.js";
import Notify from "../components/Notify/index.js";

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

const PurchaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif; 
    color: white;
`

const PurchaseContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    min-height: 87vh;
    box-sizing: border-box;
    text-align: center;
    padding: 1rem;
`

const SectionTItle = styled.h1`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    font-size: 2.5rem;
`

const Purshace = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;

    @media screen and (min-width: 1150px){
        flex-direction: row;
        align-items: unset;
    }
`

const AddProductText = styled.label`
    display: flex;
    flex-direction: column;
    width: 80%;
`

const AddProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    gap: 1rem;
    text-align: center;
    box-sizing: border-box;
    width: 85%;
    height: 100%;
    background-color: rgb(46,0,78);
    border-radius: .5rem;

    @media screen and (min-width: 1150px){
        max-width: 35%;
    }
`

const PurshaceInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 85%;
    height: 100%;
    gap: 1rem;
    box-sizing: border-box;

    @media screen and (min-width: 1150px){
        max-width: 28%;
    }
`

const PurshaceInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(46,0,78);
    border-radius: .5rem;
    gap: 1rem;
    padding: 1.5rem;
`

const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .address{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
`

const InfoTitle = styled.h1`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    color: rgb(0, 183, 255);
`

const Infos = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    padding: .5rem;
    border-bottom: 1px solid white;
`

const InfoRef = styled.h3`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    text-align: left;
    font-size: 1.375rem;
    letter-spacing: 1px;
`

const InfoValue = styled.p`
    text-align: left;
`

const AddProductForm = styled.form` 
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    gap: 2rem;

    input:focus-visible{
        outline: none;
    }
`

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: space-around;
    justify-content: space-between;
    width: 100%;
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid rgb(0, 183, 255);
    text-align: left;
`

const InputLabel = styled.label`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    padding: .5rem;
    font-size: 1.5rem;
    letter-spacing: 1px;
`

const AddProductInput = styled.input`
    width: 100%;
    padding: .5rem;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    color: white;

    &::placeholder{
        color: white;
    }
`

const AddProductButton = styled.button`
    width: 100%;
    padding: 1rem;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    border-radius: .5rem;
    border: none;
    background-color: rgba(109, 0, 156, 0.5);
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all .5s ease-in-out;

    &:hover {
        background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
    }   
`

const ReturnButton = styled.button`
    width: 100%;
    height: 3.5rem;
    padding: .5rem;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    border-radius: .5rem;
    border: none;
    background-color: rgb(46,0,78);
    box-sizing: border-box; 
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all .5s ease-in-out;

    &:hover {
        background: linear-gradient(315deg, rgba(46,0,78,0.5) 30%, rgba(125,0,180,0.5) 100%);
    }   
`

function Purchase(){
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [ products, setProducts ] = useState([]);
    const { totalValue, street, selectedMethod } = location.state || {};

    async function fetchProducts() {
        setLoading(true);
        const productsAPI = await getProducts();
        setProducts(productsAPI);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartProducts(storedCart);
    }, []);

    function handleClearCart() {
        setCartProducts([]);
    
        localStorage.removeItem("cart");
    }

    function handleAddProduct(event) {
        event.preventDefault();
    
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}_${String(currentDate.getHours()).padStart(2, '0')}${String(currentDate.getMinutes()).padStart(2, '0')}${String(currentDate.getSeconds()).padStart(2, '0')}`;
    
        const newProductImgName = `produto_${formattedDate}`;
    
        const product = {
            name: productName,
            price: productPrice,
            newprice: Number(productPrice) - Number(productPrice * 0.2),
            src: newProductImgName,
            author: userName,
            id: products.length + 1,
        };
    
        if (imageFile && productPrice > 100) {
            const formData = new FormData();
            postProduct(product);

            formData.append('imagem', imageFile);
            formData.append('filename', newProductImgName); 
    
            fetch('https://api.ryandev.com.br/uploads', {
                method: 'POST',
                body: formData,
            });

            alert("Produto adicionado com sucesso!");
            navigate("/");
            handleClearCart();
        }
        else{
            setNotifyMessage("Imagem ou valor do produto inválido!");
        }
    }
    const handleProductValue = (e) => {
        let value = e.target.value;
        
        value = value.replace(/[^0-9,]/g, '');
    
        value = value.replace(',', '.');
    
        console.log(value.length)

        if (value.length > 2) {

            const integerPart = value.slice(0, value.length - 2); 
            const decimalPart = value.slice(value.length - 2);
    
            const integerValue = parseInt(integerPart, 10);
    
            value = `${integerValue}.${decimalPart}`;
        }

        setProductPrice(value);
    };

    return(
        <>
            {loading ? (
                <LoadingContainer>
                    <Loading/>
                </LoadingContainer>
            ) : (
                <>
                    <Notify message={notifyMessage} setNotifyMessage={setNotifyMessage} />
                    <PurchaseContainer>
                        <Header displaySearch="none" displayButton="none"/>

                        <PurchaseContent>
                            <SectionTItle>COMPRA EFETUADA COM SUCESSO!</SectionTItle>

                            <Purshace>
                                <AddProductContainer>
                                    <InfoTitle>Adicione um produto</InfoTitle>
                                    <AddProductText>
                                        <p>Obrigado por chegar até aqui!</p>
                                        <p>Como agradecimento, agora você pode adicionar um novo produto ficticio ao nosso catálogo</p>
                                    </AddProductText>
                                    <AddProductForm onSubmit={handleAddProduct}>
                                        <InputsContainer>
                                            <Inputs>
                                                <InputContent>
                                                    <InputLabel>Nome</InputLabel>
                                                    <AddProductInput type="text" onChange={e => setUserName(e.target.value)} placeholder="Digite seu nome"/>
                                                </InputContent>
                                                <InputContent>
                                                    <InputLabel>Nome do produto</InputLabel>
                                                    <AddProductInput type="text" onChange={e => setProductName(e.target.value)} placeholder="Digite o nome do produto"/>
                                                </InputContent>
                                                <InputContent>
                                                    <InputLabel>Valor</InputLabel>
                                                    <AddProductInput 
                                                    type="text" 
                                                    value={productPrice} 
                                                    maxLength={8}
                                                    onChange={handleProductValue} 
                                                    placeholder="Digite o valor do produto"/>
                                                </InputContent>
                                            </Inputs>
                                            <CustomUpload setImageFile={setImageFile}/>
                                        </InputsContainer>
                                        <AddProductButton type="submit">Adicionar Produto</AddProductButton>
                                    </AddProductForm>
                                </AddProductContainer>

                                <PurshaceInfoContainer>
                                    <PurshaceInfo>
                                        <InfoTitle>Informações da compra</InfoTitle>

                                        <InfosContainer>
                                            <Infos> 
                                                <InfoRef>Total pago:</InfoRef>
                                                <InfoValue>R$ {convertNumber(totalValue)}</InfoValue>
                                            </Infos>

                                            <Infos>
                                                <InfoRef>Método de pagamento:</InfoRef>
                                                <InfoValue>{selectedMethod}</InfoValue>
                                            </Infos>

                                            <Infos className="address">
                                                <InfoRef>Endereço de entrega:</InfoRef>
                                                <InfoValue>{street}</InfoValue>
                                            </Infos>


                                        </InfosContainer>
                                    </PurshaceInfo>

                                    <ReturnButton onClick={() => navigate("/")}>Voltar ao início</ReturnButton>
                                </PurshaceInfoContainer>
                            </Purshace>
                        </PurchaseContent>
                        
                        <Footer/>
                    </PurchaseContainer>
                </>
            )}
        </>
    )
}

export default Purchase