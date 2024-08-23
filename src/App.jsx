import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import Statistik from './pages/GrafikPage';
import LoginPage from './pages/LoginPage';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <header>
        <HeaderNav />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/grafik' element={<Statistik />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </main>

      <Footer />
    </ChakraProvider>
  )
}

export default App
