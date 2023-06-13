"use client";

import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}

export default Providers;
