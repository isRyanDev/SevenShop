import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import Header from './assets/header/index.js';
import Products from './routes/Products';
import CartProducts from './routes/Cart';
import Buy from './routes/Buy';
import reportWebVitals from './reportWebVitals.js';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`

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
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/produtos" element={<Products/>} />
        <Route path="/carrinho" element={<CartProducts/>} />
        <Route path="/compra" element={<Buy/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your Home, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
