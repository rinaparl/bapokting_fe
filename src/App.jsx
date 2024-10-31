import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Grafik from "./pages/GrafikPage";

function App() {
  return (
    <ChakraProvider>
      <header>
        <HeaderNav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grafik" element={<Grafik />} />
        </Routes>
      </main>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
