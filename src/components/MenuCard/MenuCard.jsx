// src/components/MenuCard/MenuCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Flame } from 'lucide-react';
import styles from './MenuCard.module.css';

const MenuCard = ({ item }) => {
  return (
    <motion.div 
      className={`${styles.card} glass-card`}
      layout // smooth animate layout changes (filtering)
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Food Image Container */}
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} className={styles.image} loading="lazy" />
        <div className={`${styles.categoryBadge} ${item.category === 'Non Veg' ? styles.nonVeg : styles.veg}`}>
          <span className={styles.dot} />
          {item.category}
        </div>
        
        {/* Availability Overlay */}
        {!item.available && (
          <div className={styles.unavailableOverlay}>
            <span>Sold Out Today</span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{item.name}</h3>
        </div>
        
        <p className={styles.description}>{item.description}</p>
        
        {/* Tags Row */}
        <div className={styles.tags}>
          {item.tags && item.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag === 'Live Counters' && <Flame size={12} className={styles.liveIcon} />}
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footerRow}>
          <div className={styles.priceContainer}>
            <IndianRupee size={16} className={styles.rupeeIcon} />
            <span className={styles.price}>{item.price}</span>
            <span className={styles.perPlate}>/ plate</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
