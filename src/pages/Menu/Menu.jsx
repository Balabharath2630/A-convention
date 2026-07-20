// src/pages/Menu/Menu.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';
import menuPdf from '../../assets/menu/Arun-Caterers-Menu.pdf';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.menuPage}
    >
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <span className={styles.goldSubtitle}>Royal Flavors</span>
            <h1 className="text-gold-gradient">Catering Menu</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className={`${styles.premiumCard} glass-card`}>
            <h2 className={styles.cardHeading}>Official Catering Menu</h2>
            <p className={styles.cardDescription}>
              Browse our complete catering menu featuring authentic Telugu cuisine, wedding packages, breakfast, vegetarian and non-vegetarian dishes, desserts, beverages, and live counters.
            </p>
            
            <div className={styles.buttonGroup}>
              <a 
                href={menuPdf} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold"
              >
                <ExternalLink size={18} />
                View Menu
              </a>
              <a 
                href={menuPdf} 
                download="Arun-Caterers-Menu.pdf" 
                className="btn btn-outline"
              >
                <Download size={18} />
                Download Menu
              </a>
            </div>

            <div className={styles.pdfContainer}>
              <iframe
                src={`${menuPdf}#toolbar=0`}
                title="Official Catering Menu"
                className={styles.pdfViewer}
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Menu;

