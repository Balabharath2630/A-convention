// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { OWNER_WHATSAPP } from './config/constants';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
const GalleryPage = lazy(() => import('./pages/Gallery/GalleryPage'));
const BookingPage = lazy(() => import('./pages/Booking/BookingPage'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll Progress & Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCall = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20A%20Caterings%2C%20I%20would%20like%20to%20inquire%20about%20your%20catering%20services.`, '_blank');
  };

  return (
    <>
      {/* Cinematic Logo Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#1E1210',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.img
              src="/src/assets/logo.png"
              alt="A Caterings Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ width: '150px', height: 'auto', marginBottom: '20px' }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
              style={{ height: '2px', background: '#D4AF37' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ color: '#FFF8F0', marginTop: '15px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', letterSpacing: '2px', fontSize: '0.9rem' }}
            >
              Authentic Telugu Catering
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Container */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          
          {/* Scroll Progress Indicator */}
          <div className="scroll-progress-container">
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
          </div>

          {/* Sticky Header */}
          <Navbar />

          {/* Main Content Area with Page Transitions */}
          <main style={{ flexGrow: 1 }}>
            <Suspense fallback={
              <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1210' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(214, 175, 55, 0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            }>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* Site Footer */}
          <Footer />

          {/* Floating Actions Panel */}
          <div style={{ position: 'fixed', bottom: '2.5rem', right: '1.5rem', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            
            {/* Scroll to Top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#1E1210' }}
                  style={{
                    width: '3.2rem',
                    height: '3.2rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(30, 18, 16, 0.85)',
                    color: '#D4AF37',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <ArrowUp size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Call Action */}
            <motion.button
              onClick={handleCall}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: '3.2rem',
                height: '3.2rem',
                borderRadius: '50%',
                backgroundColor: '#7A1414',
                color: '#FFF8F0',
                border: '1px solid rgba(214,175,55,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(122, 20, 20, 0.4)'
              }}
            >
              <Phone size={20} />
            </motion.button>

            {/* WhatsApp Action */}
            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: '3.2rem',
                height: '3.2rem',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                color: '#FFF8F0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
              }}
            >
              <MessageCircle size={22} />
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
