// src/components/Hero/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';
import heroImage from '../../assets/hero/hero.jpeg';
import biryaniImage from '../../assets/hero/biryani.jpeg';
import mealsImage from '../../assets/hero/meals.jpeg';
import sweetsImage from '../../assets/hero/sweets.jpeg';
import liveCounterImage from '../../assets/hero/live-counter.jpeg';

const HERO_SLIDES = [
  {
    image: heroImage,
    title: 'Premium Indian Catering',
    subtitle: 'ARUN CATERERS Guntur',
    caption: 'Crafting Royal Gastronomical Journeys Since 2011'
  },
  {
    image: biryaniImage,
    title: 'Authentic Telugu Catering',
    subtitle: 'for Every Celebration',
    caption: 'Traditional Taste • Premium Service • Memorable Events'
  },
  {
    image: mealsImage,
    title: 'Royal Andhra Feast',
    subtitle: 'The Soul of Heritage',
    caption: 'Genuine Ingredients • Time-Honored Recipes • Pure Bliss'
  },
  {
    image: sweetsImage,
    title: 'Premium Sweet Counters',
    subtitle: 'Golden Sweet Delights',
    caption: 'Desi Ghee Artistry • Traditional Sweets • Royal Presentation'
  },
  {
    image: liveCounterImage,
    title: 'Grand Live Stations',
    subtitle: 'Sizzle & Aroma Live',
    caption: 'Professional Chefs • Visual Culinary Art • Fresh & Hot'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 9000); // 9 seconds interval as requested (8-10s)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroContainer}>
      {/* Background Slideshow */}
      <div className={styles.slideshowWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }} // smooth crossfade
          >
            {/* Zoom/Scale effect */}
            <motion.div
              className={styles.slideImage}
              style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 9, ease: 'linear' }}
            />
            {/* Dark overlay */}
            <div className={styles.overlay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Decorative Spice Elements (Premium Micro-interaction) */}
      <div className={styles.floatingContainer}>
        <motion.div 
          className={`${styles.floatingElement} ${styles.starAnise}`}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: 'linear' 
          }}
        />
        <motion.div 
          className={`${styles.floatingElement} ${styles.cardamom}`}
          animate={{ 
            y: [0, 20, 0],
            x: [0, 10, 0],
            rotate: [0, -180],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: 'easeInOut' 
          }}
        />
      </div>

      {/* Hero Center Text Content */}
      <div className={styles.contentContainer}>
        <div className={styles.textBlock}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className={styles.goldSubtitle}>ARUN CATERERS Presents</span>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={styles.mainTitle}>{HERO_SLIDES[currentSlide].title}</h1>
              <h2 className={styles.subTitle}>{HERO_SLIDES[currentSlide].subtitle}</h2>
              <p className={styles.captionText}>{HERO_SLIDES[currentSlide].caption}</p>
            </motion.div>
          </AnimatePresence>
          
          {/* Action Buttons */}
          <motion.div 
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.button 
              onClick={() => navigate('/booking')} 
              className="btn btn-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={18} />
              Book Catering
            </motion.button>
            <motion.button 
              onClick={() => navigate('/menu')} 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Menu
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className={styles.dotNavigation}>
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
