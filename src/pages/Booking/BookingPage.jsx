// src/pages/Booking/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('selected_catering_menu');
    if (saved) {
      setSelectedItems(JSON.parse(saved));
    }
  }, []);

  const handleRemoveItem = (itemId) => {
    const updated = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updated);
    localStorage.setItem('selected_catering_menu', JSON.stringify(updated));
    window.dispatchEvent(new Event('selected_menu_updated'));
  };

  const handleClearMenu = () => {
    setSelectedItems([]);
    localStorage.removeItem('selected_catering_menu');
    window.dispatchEvent(new Event('selected_menu_updated'));
  };

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
            <h1 className="text-gold-gradient">Catering Proposal</h1>
          </div>
        </div>
      </section>

      {/* Booking Flow Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className={styles.bookingGrid}>
            
            {/* Left Column: Selected Menu Review */}
            <div className={styles.menuReviewSection}>
              <div className={styles.sectionHeader}>
                <h2>Your Selected Menu</h2>
                {selectedItems.length > 0 && (
                  <button onClick={handleClearMenu} className={styles.clearBtn}>
                    Clear All
                  </button>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {selectedItems.length > 0 ? (
                  <div className={styles.selectedList}>
                    {selectedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`${styles.selectedCard} glass-card`}
                      >
                        <div className={styles.cardImageWrapper}>
                          <img src={item.image} alt={item.name} className={styles.cardImage} />
                        </div>
                        <div className={styles.cardDetails}>
                          <h3>{item.name}</h3>
                          <span className={styles.categoryBadge}>{item.category}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className={styles.removeBtn}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                    
                    <div className={styles.addMoreWrapper}>
                      <Link to="/menu" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        <ArrowLeft size={16} style={{ marginRight: '6px' }} />
                        Add More Dishes
                      </Link>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.emptySelection}
                  >
                    <ShoppingBag size={48} className={styles.emptyIcon} />
                    <h3>Your Menu is Empty</h3>
                    <p>Select premium dishes from our menu to request a custom catering quotation proposal.</p>
                    <Link to="/menu" className="btn btn-gold btn-sm" style={{ marginTop: '1.2rem' }}>
                      Browse Catering Menu
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Booking Form */}
            <div className={styles.formSection}>
              <BookingForm 
                selectedItems={selectedItems} 
                onClearMenu={handleClearMenu} 
              />
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BookingPage;
