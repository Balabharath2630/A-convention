// src/pages/Booking/BookingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ExternalLink } from 'lucide-react';
import menuPdf from '../../assets/menu/Arun-Caterers-Menu.pdf';
import BookingForm from '../../components/BookingForm/BookingForm';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.page}
    >
      <Helmet>
        <title>Book Catering Services | ARUN CATERERS</title>
        <meta name="description" content="Book ARUN CATERERS for weddings, birthdays, receptions, corporate events and special occasions in Guntur." />
        <link rel="canonical" href="https://aruncaterers.co.in/booking" />
        <meta property="og:title" content="Book Catering Services | ARUN CATERERS" />
        <meta property="og:description" content="Book ARUN CATERERS for weddings, birthdays, receptions, corporate events and special occasions in Guntur." />
        <meta property="og:url" content="https://aruncaterers.co.in/booking" />
        <meta property="og:image" content="https://aruncaterers.co.in/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Catering Services | ARUN CATERERS" />
        <meta name="twitter:description" content="Book ARUN CATERERS for weddings, birthdays, receptions, corporate events and special occasions in Guntur." />
        <meta name="twitter:image" content="https://aruncaterers.co.in/logo.png" />
      </Helmet>

      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <span className={styles.goldSubtitle}>Celebrate with Us</span>
            <h1 className="text-gold-gradient">Catering Proposal</h1>
          </div>
        </div>
      </section>

      {/* Booking Flow Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className={styles.bookingGrid}>
            
            {/* Left Column: Catering Menu Card */}
            <div className={styles.menuReviewSection}>
              <div className={`${styles.menuCard} glass-card`}>
                <BookOpen size={48} className={styles.menuIcon} />
                <h3>Catering Menu</h3>
                <p>
                  Please review our complete catering menu before submitting your booking request. Mention your preferred package or dishes in the booking form, and our team will contact you with a customized quotation.
                </p>
                <a 
                  href={menuPdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-gold"
                  style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
                >
                  <ExternalLink size={18} />
                  View Catering Menu
                </a>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className={styles.formSection}>
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BookingPage;

