import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { convertNumber } from "../utils/ConvertNumber.js";
import { getProducts, postProduct } from "../services/ProductsAPI.js";
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
    gap: 3vh;
    font-family: 'Poppins', sans-serif; 
    color: white;
`

const PurchaseContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 81vh;
    gap: 2rem;
    width: 100%;
`

const AddProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    text-align: center;
    width: 30%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgb(46,0,78);
    border-radius: .5rem;
`

const PurshaceInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(46,0,78);
    max-width: 30%;
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
    gap: 1rem;

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
    width: 100%;
    padding: .5rem;
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
            newprice: Number(productPrice - productPrice * 0.2),
            src: productImgName,
            author: userName,
            id: products.length + 1,
        };
    
        postProduct(product);
    
        if (imageFile) {
            const formData = new FormData();
            formData.append('imagem', imageFile);
            formData.append('filename', productImgName); // Nome personalizado para o arquivo
    
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

                    <InfoTitle>COMPRA EFETUADA COM SUCESSO!</InfoTitle>

                    <PurchaseContent>

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

                        <AddProductContainer>
                        <label>
                            
                            <p>Obrigado por chegar até aqui!</p>
                            <p>Agora você pode adicionar um novo produto ao nosso catálogo</p>
                        </label>
                            <AddProductForm onSubmit={handleAddProduct}>
                                <AddProductInput type="text" onChange={e => setUserName(e.target.value)} placeholder="Digite seu nome"/>
                                <AddProductInput type="text" onChange={e => setProductName(e.target.value)} placeholder="Digite o nome do produto"/>
                                <AddProductInput type="text" onChange={e => setProductImgName(e.target.value)} placeholder="Digite o nome abreviado"/>
                                <AddProductInput type="text" onChange={e => setProductPrice(e.target.value)} placeholder="Digite o valor do produto"/>
                                <AddProductInput type="file" name="imagem" onChange={e => setImageFile(e.target.files[0])}/>

                                <label for="file" class="file-upload-label">
                                    <div class="file-upload-design">
                                    <svg viewBox="0 0 640 512" height="1em">
                                        <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                        ></path>
                                    </svg>
                                    <p>Arraste a imagem do produto aqui</p>
                                    <span class="browse-button">Ou procure nos arquivos</span>
                                    </div>
                                    <input id="file" type="file" />
                                </label>

                                <AddProductButton type="submit">Adicionar Produto</AddProductButton>
                                <AddProductButton onClick={() => navigate("/")}>Voltar ao início</AddProductButton>
                            </AddProductForm>
                        </AddProductContainer>
                    </PurchaseContent>
                    <Footer/>
                </PurchaseContainer>
            )}
      </>
    )
}

export default Purchase