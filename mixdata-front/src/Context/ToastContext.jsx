// ToastContext.js
import React, { createContext, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createCustomToast } from '../service/CustomToast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const toaster = createCustomToast();
  console.log("toaster", toaster)
  return (
    <ToastContext.Provider value={toaster}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
