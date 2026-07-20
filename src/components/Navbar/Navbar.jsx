// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoWhite from '../../assets/logo/logo-white.png';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/booking', label: 'Booking' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link to="/" className={styles.logoContainer} onClick={() => setMobileMenuOpen(false)}>
          <img src={logoWhite} alt="ARUN CATERERS Logo" className={styles.logo} />
          <div className={styles.logoText}>
            <span className={styles.brandName}>ARUN CATERERS</span>
            <span className={styles.brandSubtitle}>WEDDING & EVENT CATERERS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navMenu}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <button onClick={() => navigate('/booking')} className="btn btn-gold btn-sm">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle Hamburger */}
        <button 
          className={styles.hamburger} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} color="#FFF8F0" /> : <Menu size={26} color="#FFF8F0" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuContainer}>
              <ul className={styles.mobileMenu}>
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.path}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink 
                      to={link.path} 
                      className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileActiveLink : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className={styles.mobileCta}>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/booking');
                  }} 
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                >
                  Book Catering Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
