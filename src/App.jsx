// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Phone, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { OWNER_WHATSAPP } from './config/constants';
import logoWhite from './assets/logo/logo-white.png';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
const BookingPage = lazy(() => import('./pages/Booking/BookingPage'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

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
    window.open('tel:+917075812345', '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20ARUN%20CATERERS%2C%20I%20would%20like%20to%20inquire%20about%20your%20catering%20services.`, '_blank');
  };

  return (
    <>
      {isAdminRoute && (
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
      )}
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
              src={logoWhite}
              alt="ARUN CATERERS Logo"
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
          {!isAdminRoute && (
            <div className="scroll-progress-container">
              <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>
          )}

          {/* Sticky Header */}
          {!isAdminRoute && <Navbar />}

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
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* Site Footer */}
          {!isAdminRoute && <Footer />}

          {/* Floating Actions Panel */}
          {!isAdminRoute && (
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </motion.button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
