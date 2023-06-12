"use client";

import React from "react";
import { ToastContainer } from "react-toastify";

const ClientToast = () => {
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
      theme="dark"
    />
  );
};

export default ClientToast;
