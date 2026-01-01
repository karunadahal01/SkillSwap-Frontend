// src\main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; 
import { SwapProvider } from "@context/SwapContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <BrowserRouter>
        <AuthProvider>
          <SwapProvider>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </SwapProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeModeProvider>
  </React.StrictMode>
);
