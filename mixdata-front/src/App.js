import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routing } from './routers/index';
import { AuthContextProvider } from './Context/Context';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from './Context/ToastContext';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthContextProvider>
          <div className="d-flex">
            <Routing />
          </div>
        </AuthContextProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}


export default App;
