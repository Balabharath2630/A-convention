// src/pages/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Heart, Award, ShieldCheck } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import Counter from '../../components/Counter/Counter';
import Testimonial from '../../components/Testimonial/Testimonial';
import mealsImage from '../../assets/hero/meals.jpeg';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: '#1E1210' }}
    >
      {/* Cinematic Slideshow Hero */}
      <Hero />

      {/* Counter Stats Section */}
      <Counter />

      {/* Royal Welcome Section */}
      <section className="section-padding" style={{ backgroundColor: '#2D1D1A' }}>
        <div className="container">
          <div className={styles.welcomeGrid}>
            <motion.div 
              className={styles.welcomeImageWrapper}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img src={mealsImage} alt="Royal Andhra Meals Setup" className={styles.welcomeImg} />
              <div className={styles.goldFrame} />
            </motion.div>
            
            <motion.div 
              className={styles.welcomeText}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className={styles.goldSubtitle}>Est. 2011</span>
              <h2 className="text-gold-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Elegance In Every Flavor</h2>
              <p style={{ marginBottom: '1.2rem' }}>
                At ARUN CATERERS, we elevate events from ordinary to unforgettable. Deeply rooted in the authentic tastes of Telugu cuisine, we combine centuries-old culinary traditions with modern gourmet presentations.
              </p>
              <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                Whether it is a grand wedding banquet of 5,000 guests or an intimate housewarming dinner, our dedicated master chefs, pristine hygienic kitchen, and signature royal hospitality make every event a luxurious gourmet journey.
              </p>
              <button onClick={() => navigate('/about')} className="btn btn-gold">
                Our Story
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars of Premium Service */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className={styles.goldSubtitle}>Pristine Standards</span>
            <h2 className="text-gold-gradient">The Royal Experience</h2>
            <p>Our commitment to perfection is built on these foundational core values.</p>
          </div>

          <motion.div 
            className={styles.pillarsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className={`${styles.pillarCard} glass-card`} variants={itemVariants}>
              <div className={styles.pillarIconWrapper}>
                <Heart className={styles.pillarIcon} size={28} />
              </div>
              <h3>100% Fresh Ingredients</h3>
              <p>We handpick fresh organic vegetables and premium grade meats daily, avoiding any artificial preservatives or MSG.</p>
            </motion.div>

            <motion.div className={`${styles.pillarCard} glass-card`} variants={itemVariants}>
              <div className={styles.pillarIconWrapper}>
                <Award className={styles.pillarIcon} size={28} />
              </div>
              <h3>Master Chef Craftsmanship</h3>
              <p>Our expert traditional chefs hold decades of experience in preparing authentic Telugu masalas and slow-cooked dum recipes.</p>
            </motion.div>

            <motion.div className={`${styles.pillarCard} glass-card`} variants={itemVariants}>
              <div className={styles.pillarIconWrapper}>
                <ShieldCheck className={styles.pillarIcon} size={28} />
              </div>
              <h3>100% Hygienic Kitchen</h3>
              <p>We maintain strict ISO sanitization protocols in our commercial kitchen setups and carry out regular quality checks.</p>
            </motion.div>

            <motion.div className={`${styles.pillarCard} glass-card`} variants={itemVariants}>
              <div className={styles.pillarIconWrapper}>
                <Flame className={styles.pillarIcon} size={28} />
              </div>
              <h3>Interactive Live Counters</h3>
              <p>Adding dynamic visual energy to events with fresh tandoori grills, live dosa grills, and hot sweet stations prepared live.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Auto Carousel */}
      <Testimonial />

      {/* Call To Action Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div 
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.ctaTitle}>Ready to Host a Royal Celebration?</h2>
            <p className={styles.ctaDesc}>
              Let us curate a custom premium menu tailored perfectly for your event. Book your consultation slots today.
            </p>
            <button onClick={() => navigate('/booking')} className="btn btn-gold btn-lg">
              Book Catering Now
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
