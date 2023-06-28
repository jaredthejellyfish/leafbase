"use client";

import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const ClientToast = () => {
  const currentTheme = useSelector((state: RootState) => state.theme).theme;
  const theme = currentTheme === "dark" ? "dark" : "light";
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
