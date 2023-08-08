'use client';

import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import React from 'react';

import { RootState } from '@/store/store';

const ClientToast = () => {
  const currentTheme = useSelector((state: RootState) => state.theme).theme;
  const theme = currentTheme === 'dark' ? 'dark' : 'light';
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme={theme}
    />
  );
};

export default ClientToast;
