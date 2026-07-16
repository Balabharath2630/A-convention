// src/components/Gallery/Gallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../../config/constants';
import styles from './Gallery.module.css';

const TABS = ['All', 'Food', 'Setup', 'Decor'];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab.toLowerCase();
  });

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.galleryWrapper}>
      
      {/* Category Tabs */}
      <div className={styles.tabsContainer}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Setup' ? 'Service Setups' : tab === 'Decor' ? 'Floral Decor' : tab}
          </button>
        ))}
      </div>

      {/* Pinterest Masonry Grid */}
      <div className={styles.masonryGrid}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.masonryItem}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.imageOverlayContainer}>
                <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
                <div className={styles.imageOverlay}>
                  <ZoomIn size={24} className={styles.zoomIcon} />
                  <span className={styles.overlayTitle}>{item.title}</span>
                  <span className={styles.overlayCategory}>{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close lightbox">
              <X size={30} color="#FFF8F0" />
            </button>

            {/* Navigation Arrows */}
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={showPrev} aria-label="Previous image">
              <ChevronLeft size={36} color="#FFF8F0" />
            </button>
            
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={showNext} aria-label="Next image">
              <ChevronRight size={36} color="#FFF8F0" />
            </button>

            {/* Image Container */}
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedImageIndex}
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className={styles.lightboxImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className={styles.lightboxCaption}>
                <h4>{filteredItems[selectedImageIndex].title}</h4>
                <span className={styles.lightboxCategory}>{filteredItems[selectedImageIndex].category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Gallery;
