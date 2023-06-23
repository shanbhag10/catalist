import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { borderbox, header_style } from "./styles";
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import LandingPage from './pages/LandingPage';

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <HeaderBox />
          <LandingPage />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
);

function HeaderBox() {
  return (
    <div style={borderbox}>
      <h1 style={header_style}><span style={{"color":"black"}}>CATA</span><span style={{"color":"green"}}>LIST</span></h1>
    </div>
  );
}

reportWebVitals();
