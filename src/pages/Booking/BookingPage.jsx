// src/pages/Booking/BookingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
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
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <span className={styles.goldSubtitle}>Celebrate with Us</span>
            <h1 className="text-gold-gradient">Catering Reservations</h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </motion.div>
  );
};

export default BookingPage;
