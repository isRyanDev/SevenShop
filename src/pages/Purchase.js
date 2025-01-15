import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { convertNumber } from "../utils/ConvertNumber.js";
import { getProducts, postProduct } from "../services/ProductsAPI.js";
import CustomUpload from "../components/CustomUpload/index.js";
import styled from "styled-components"
import Header from "../components/Header/header.js";
import Footer from "../components/Footer/index.js";
import Loading from "../components/Loading/index.js";

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
    justify-content: space-around;
    gap: 2rem;
    width: 100%;
    min-height: 87vh;
`

const Purshace = styled.div`    
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    width: 100%;
`

const AddProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 2rem;
    text-align: center;
    box-sizing: border-box;
    width: 40%;
    height: 100%;
    background-color: rgb(46,0,78);
    border-radius: .5rem;
`

const PurshaceInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(46,0,78);
    max-width: 28%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: .5rem;
`

const InfoTitle = styled.h1`
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif;
    text-align: center;
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
    font-size: 1.375rem;
    letter-spacing: 1px;
`

const InfoValue = styled.p`
    max-width: 50%;
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

    .file-upload-label input {
    display: none;
    }
    .file-upload-label svg {
    height: 50px;
    fill: white;
    margin-bottom: 20px;
    }
    .file-upload-label {
    cursor: pointer;
    background-color: rgba(109, 0, 156, 0.5);
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 40px;
    border: 2px dashed white;
    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
    }
    .file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    }
    .browse-button {
    background-color: rgba(109, 0, 156, 0.5);
    padding: 5px 15px;
    border-radius: 10px;
    color: white;
    transition: all 0.3s;
    }
    .browse-button:hover {
    background-color: rgb(46,0,78);
    }

`

const InputsContainer = styled.div`
    display: flex;
    flex-direction: row;
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
    width: 50%;
    gap: 1rem;
`

const AddProductInput = styled.input`
    width: 100%;
    padding: .5rem;
    border-radius: .5rem;
    border: none;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    color: rgb(46,0,78);

    &::placeholder{
        color: rgb(46,0,78);
    }
`

const AddProductButton = styled.button`
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
    width: 30%;
    height: 3rem;
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
    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImgName, setProductImgName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const { totalValue, street, selectedMethod } = location.state || {};
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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

    function handleAddProduct(event) {
        event.preventDefault();
    
        const product = {
            name: productName,
            price: productPrice,
            newprice: Number(productPrice) - Number(productPrice * 0.2),
            src: productImgName,
            author: userName,
            id: products.length + 1,
        };
    
        postProduct(product);
    
        if (imageFile) {
            const formData = new FormData();
            formData.append('imagem', imageFile);
            formData.append('filename', productImgName);

            fetch('https://api.ryandev.com.br/uploads', {
                method: 'POST',
                body: formData,
            });
        }
    }
    return(
        <>
          {loading ? (
              <LoadingContainer>
                  <Loading/>
              </LoadingContainer>
          ) : (
                <PurchaseContainer>
                    <Header displaySearch="none" displayButton="none"/>

                    <PurchaseContent>
                        <InfoTitle>COMPRA EFETUADA COM SUCESSO!</InfoTitle>

                        <Purshace>
                            <AddProductContainer>
                                <label>
                                    <p>Obrigado por chegar até aqui!</p>
                                    <p>Agora você pode adicionar um novo produto ficticio ao nosso catálogo</p>
                                </label>
                                <AddProductForm onSubmit={handleAddProduct}>
                                    <InputsContainer>
                                        <Inputs>
                                            <AddProductInput type="text" onChange={e => setUserName(e.target.value)} placeholder="Digite seu nome"/>
                                            <AddProductInput type="text" onChange={e => setProductName(e.target.value)} placeholder="Digite o nome do produto"/>
                                            <AddProductInput type="text" onChange={e => setProductImgName(e.target.value)} placeholder="Digite o nome abreviado"/>
                                            <AddProductInput type="text" onChange={e => setProductPrice(e.target.value)} placeholder="Digite o valor do produto"/>
                                        </Inputs>
                                        <CustomUpload setImageFile={setImageFile}/>
                                    </InputsContainer>
                                    <AddProductButton type="submit">Adicionar Produto</AddProductButton>
                                </AddProductForm>
                            </AddProductContainer>

                            <PurshaceInfo>
                                <InfoTitle>Informações da compra</InfoTitle>

                                <Infos> 
                                    <InfoRef>Total pago:</InfoRef>
                                    <InfoValue>R$ {convertNumber(totalValue)}</InfoValue>
                                </Infos>

                                <Infos>
                                    <InfoRef>Endereço de entrega:</InfoRef>
                                    <InfoValue>{street}</InfoValue>
                                </Infos>

                                <Infos>
                                    <InfoRef>Método de pagamento:</InfoRef>
                                    <InfoValue>{selectedMethod}</InfoValue>
                                </Infos>
                            </PurshaceInfo>
                        </Purshace>

                        <ReturnButton onClick={() => navigate("/")}>Voltar ao início</ReturnButton>

                        <h3>PAGINA EM DESENVOLVIMENTO</h3>
                    </PurchaseContent>
                    
                    <Footer/>
                </PurchaseContainer>
            )}
      </>
    )
}

export default Purchase