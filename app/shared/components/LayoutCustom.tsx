"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import MenuItem from "./MenuItem";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/es/integration/react";
import { store } from "@/app/store/store";
import { persistor } from "@/app/store/storePersitor";
import Footer from "./Footer";

const LayoutCustom = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MenuItem />
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  );
};

export default LayoutCustom;
