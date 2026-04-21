// File: src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import HomePage       from './pages/HomePage';
import ShopPage       from './pages/ShopPage';
import AsoEbiPage     from './pages/AsoEbiPage';
import CollectionsPage from './pages/CollectionsPage';
import ProductPage    from './pages/ProductPage';
import ContactPage    from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/shop"        element={<ShopPage />} />
            <Route path="/aso-ebi"     element={<AsoEbiPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact"     element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
