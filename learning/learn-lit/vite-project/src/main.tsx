import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../../vite-lit/dist/vite-lit';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
