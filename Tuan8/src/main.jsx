import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// BƯỚC 1: Render component gốc vào DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
