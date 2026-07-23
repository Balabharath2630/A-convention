// src/components/Counter/Counter.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Counter.module.css';

const STATS_DATA = [
  { id: 1, target: 801, suffix: '+', label: 'Events Executed' },
  { id: 2, target: 500, suffix: '+', label: 'Happy Families' },
  { id: 3, target: 400, suffix: '+', label: 'Menu Items' },
  { id: 4, target: 5, suffix: '+', label: 'Years Experience' }
];

const StatItem = ({ target, suffix, label }) => {
  const [count, setCount] = useState(0);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = target;
    const increment = Math.ceil(end / (duration / 16)); // ~60fps
    
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div 
      ref={itemRef} 
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className={styles.numberWrapper}>
        <span className={styles.number}>{count}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.divider} />
      <span className={styles.label}>{label}</span>
    </motion.div>
  );
};

const Counter = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {STATS_DATA.map((stat) => (
            <StatItem 
              key={stat.id} 
              target={stat.target} 
              suffix={stat.suffix} 
              label={stat.label} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
