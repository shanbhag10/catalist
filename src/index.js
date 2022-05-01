import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from "./pages/Homepage";
import { borderbox, header_style } from "./styles";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <HeaderBox />
        <Homepage />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function HeaderBox() {
  return (
    <div style={borderbox}>
      <h1 style={header_style}><span style={{"color":"#CA0101"}}>Cata</span><span style={{"color":"green"}}>List</span></h1>
    </div>
  );
}

reportWebVitals();
