import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Toast } from './components/Toast/Toast';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Books } from './pages/Books/Books';
import { BookDetails } from './pages/BookDetails/BookDetails';
import { Offers } from './pages/Offers/Offers';
import { Cart } from './pages/Cart/Cart';
import { NotFound } from './pages/NotFound/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="app-layout">
            <Navbar />
            <main className="app-main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
