import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Using inline styles
import OrderToOven from './pages/OrderToOven'; // Import the main app component from its new location
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <OrderToOven /> {/* Render the actual app component */}
    {/* <p>Hello World!</p> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 