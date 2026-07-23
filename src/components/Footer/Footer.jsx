// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Compass } from 'lucide-react';
import { OWNER_WHATSAPP } from '../../config/constants';
import logoWhite from '../../assets/logo/logo-white.png';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20ARUN%20CATERERS%2C%20I%20would%20like%20to%20chat%20about%20your%20services.`, '_blank');
  };

  const handleGoogleMaps = () => {
    window.open('https://maps.google.com/?q=ARUN+CATERERS+Guntur', '_blank');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand Column */}
        <div className={styles.columnBrand}>
          <div className={styles.logoRow}>
            <img src={logoWhite} alt="ARUN CATERERS Logo" className={styles.logo} />
            <div className={styles.logoText}>
              <span className={styles.brandName}>ARUN CATERERS</span>
              <span className={styles.brandSubtitle}>ROYAL TELUGU TASTE</span>
            </div>
          </div>
          <p className={styles.brandDesc}>
            ARUN CATERERS specializes in authentic Telugu catering for weddings, receptions, birthdays, corporate events, housewarming ceremonies, and all special occasions. We serve delicious traditional cuisine with exceptional service across Guntur and surrounding areas.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/aruncaterersofficial?igsh=MTh2dmx4bWJ4ZWxsdA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1JW2PdwdG3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.columnLinks}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.linksList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/menu">Catering Menu</Link></li>
            <li><Link to="/booking">Booking Form</Link></li>
            <li><Link to="/contact">Contact Info</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Contact Details Column */}
        <div className={styles.columnContact}>
          <h3 className={styles.columnTitle}>Get in Touch</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={22} className={styles.contactIcon} />
              <span>Amaravathi Road, Guntur, Andhra Pradesh, India</span>
            </li>
            <li>
              <Phone size={18} className={styles.contactIcon} />
              <a href="tel:+917075812345">+91 70758 12345</a>
            </li>
            <li>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:aruncaterersofficial@gmail.com">aruncaterersofficial@gmail.com</a>
            </li>
          </ul>
          
          {/* Map and WhatsApp Quick CTAs */}
          <div className={styles.actions}>
            <button onClick={handleGoogleMaps} className={styles.actionBtn}>
              <Compass size={16} />
              <span>Google Maps</span>
            </button>
            <button onClick={handleWhatsApp} className={`${styles.actionBtn} ${styles.waBtn}`}>
              <MessageSquare size={16} />
              <span>WhatsApp Chat</span>
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            &copy; {currentYear} ARUN CATERERS. All Rights Reserved. Crafted with royal elegance.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <span className={styles.divider}>|</span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
        <div className={styles.developerCreditContainer}>
          <p className={styles.developerCredit}>
            Developed by <span className={styles.highlight}>BD WEB TECHNOLOGIES</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
