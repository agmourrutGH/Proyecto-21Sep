import React from 'react';
import ReactDOM from 'react-dom/client';
// estilos base primero, así los de cada componente pueden sobrescribirlos
import './birthday.css';
import BirthdayApp from './BirthdayApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BirthdayApp />
  </React.StrictMode>
);
