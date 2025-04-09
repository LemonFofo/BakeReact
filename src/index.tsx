import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Using inline styles
import OrderToOven from './pages/OrderToOven'; // Import the main app component from its new location
import reportWebVitals from './reportWebVitals';

// Import MUI X Date Picker Localization
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Wrap App with LocalizationProvider */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <OrderToOven /> {/* Render the actual app component */}
    </LocalizationProvider>
    {/* <p>Hello World!</p> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 