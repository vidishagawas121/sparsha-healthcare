import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Care from './pages/Care';
import Retreat from './pages/Retreat';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Articles from './pages/Articles';
import DietCharts from './pages/DietCharts';
import DietChartsDownloadFiles from './pages/DietChartsDownloadFiles';
import Testimonials from './pages/Testimonials';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Scroll to top helper on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
          <Navbar />
          <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/care" element={<Care />} />
              <Route path="/retreat" element={<Retreat />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/diet-charts" element={<DietCharts />} />
              <Route path="/diet-charts/download-files" element={<DietChartsDownloadFiles />} />
              <Route path="/diet-charts/download-files/:slug" element={<DietChartsDownloadFiles />} />
              <Route path="/diet-chart/:slug" element={<DietChartsDownloadFiles />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/admin" element={<Admin />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <Toast />
        </div>
      </Router>
    </CartProvider>
  );
}
