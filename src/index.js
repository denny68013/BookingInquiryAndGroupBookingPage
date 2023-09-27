import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/all.scss';
import ContextProvider from './components/ContextA';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   
      <ContextProvider>
      <App />
      </ContextProvider>
  
  // </React.StrictMode>
);


