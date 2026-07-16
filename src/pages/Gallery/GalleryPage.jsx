// src/pages/Gallery/GalleryPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Gallery from '../../components/Gallery/Gallery';
import styles from './GalleryPage.module.css';

const GalleryPage = () => {
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
            <span className={styles.goldSubtitle}>Visual Feast</span>
            <h1 className="text-gold-gradient">Event Gallery</h1>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className={styles.goldSubtitle}>Moments we Served</span>
            <h2 className="text-gold-gradient">Glimpses of Luxury</h2>
            <p>Explore our premium catering presentations, buffet structures, and culinary designs.</p>
          </div>

          {/* Gallery Grid */}
          <Gallery />
        </div>
      </section>
    </motion.div>
  );
};

export default GalleryPage;
