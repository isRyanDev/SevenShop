import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Products from './pages/Products';
import CartProducts from './pages/Cart';
import Checkout from './pages/Checkout';
import Purchase from './pages/Purchase';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`

  :root {
    --transition: 350ms;
    --folder-W: 120px;
    --folder-H: 80px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0; 
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, rgb(46 0 78) 0%, rgb(84 0 133) 100%);
  }

  li {
    list-style: none;
  }

  ::-webkit-input-placeholder { 
    font-weight: bold;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgb(46 0 78); 
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(120 0 138);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(84 0 133);
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/produtos" element={<Products/>} />
        <Route path="/carrinho" element={<CartProducts/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/purchase" element={<Purchase/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);