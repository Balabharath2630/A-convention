// src/pages/About/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Compass, Award, ShieldCheck, Soup,
  Clock, Flame, HeartHandshake, Gift, Briefcase, Home, Landmark 
} from 'lucide-react';
import styles from './About.module.css';
import liveCounterImage from '../../assets/hero/live-counter.jpeg';

const WHY_CHOOSE_US = [
  {
    icon: Soup,
    title: 'Fresh Ingredients',
    desc: 'Sourced daily from local organic farms; no artificial colors, preservatives, or MSG.'
  },
  {
    icon: Award,
    title: 'Experienced Chefs',
    desc: 'Our culinary artisans carry 15+ years of experience in crafting traditional Telugu recipes.'
  },
  {
    icon: Gift,
    title: 'Affordable Packages',
    desc: 'Curated premium catering packages tailored to suit different event scales and budgets.'
  },
  {
    icon: Compass,
    title: 'Authentic Telugu Taste',
    desc: 'True spices and traditional cooking methods that preserve the authentic flavors of Andhra & Telangana.'
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    desc: 'Punctual logistics setup ensuring food arrives fresh, hot, and perfectly ready for service.'
  },
  {
    icon: Flame,
    title: 'Live Counters',
    desc: 'Engaging, interactive hot food stations (dosa, tandoori, jalebi) made fresh in front of guests.'
  },
  {
    icon: HeartHandshake,
    title: 'Wedding Specialists',
    desc: 'Complete end-to-end wedding banquets, buffet styling, and VIP dining hospitality.'
  },
  {
    icon: Gift,
    title: 'Birthday Specialists',
    desc: 'Fun live food stations, children-friendly mocktail bars, and delicious mini bites.'
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Professional catering setups, quick buffets, high tea, and executive lunch boxes.'
  },
  {
    icon: Home,
    title: 'House Warming',
    desc: 'Traditional satyanarayana pooja prasadam, lunch buffets, and eco-friendly packaging.'
  },
  {
    icon: Landmark,
    title: 'Temple Functions',
    desc: '100% pure vegetarian, garlic-free/onion-free satvik catering cooked in absolute sanctity.'
  }
];

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.aboutPage}
    >
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.headerContent}
          >
            <span className={styles.goldSubtitle}>Discover Our Legacy</span>
            <h1 className="text-gold-gradient">The Art of Catering</h1>
          </motion.div>
        </div>
      </section>

      {/* Profile & Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.profileGrid}>
            <motion.div 
              className={styles.aboutImageWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={liveCounterImage} alt="ARUN CATERERS Kitchen Setup" className={styles.aboutImg} />
              <div className={styles.frameDecoration} />
            </motion.div>

            <motion.div 
              className={styles.profileText}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.goldSubtitle}>Who We Are</span>
              <h2 className="text-gold-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Crafting Royal Gastronomical Journeys</h2>
              <p style={{ marginBottom: '1.2rem' }}>
                ARUN CATERERS is a premier Telugu wedding and event catering company founded in Guntur with a simple vision: to serve authentic, top-tier Telugu dishes with the elegance of modern royal dining. Over the last 15 years, we have grown from a small family recipe kitchen into a trusted catering partner for thousands of families and corporates across the state.
              </p>
              <p style={{ marginBottom: '2.2rem', opacity: 0.85 }}>
                Our operations are driven by a commitment to absolute purity, pristine presentation, and a relentless focus on customer satisfaction. Every ingredient is scrutinized, every dish is prepared with passion, and every setup is organized to wow your guests at first glance.
              </p>

              {/* Mission & Vision Row */}
              <div className={styles.mvRow}>
                <div className={styles.mvCard}>
                  <h3 className={styles.mvTitle}>Our Mission</h3>
                  <p className={styles.mvText}>To preserve traditional culinary arts, sourcing pure ingredients to deliver a premium, hygienic dining experience for every event.</p>
                </div>
                <div className={styles.mvCard}>
                  <h3 className={styles.mvTitle}>Our Vision</h3>
                  <p className={styles.mvText}>To set the benchmark for authentic Indian catering globally, blending authentic heritage tastes with premium service standards.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars of Purity */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarItem}>
              <ShieldCheck className={styles.pillarIcon} size={36} />
              <h4>100% Hygienic Kitchen</h4>
              <p>Regular sanitization, filtered water systems, and gloves-on handling in every stage of prep.</p>
            </div>
            <div className={styles.pillarItem}>
              <Soup className={styles.pillarIcon} size={36} />
              <h4>Fresh Organic Sourcing</h4>
              <p>Vegetables and farm-raised poultry purchased fresh daily; zero recycled oil or cold storages.</p>
            </div>
            <div className={styles.pillarItem}>
              <Clock className={styles.pillarIcon} size={36} />
              <h4>Professional Uniformed Staff</h4>
              <p>Well-trained serving professionals, waiters, and kitchen crew presenting royal hospitality standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding" style={{ backgroundColor: '#2D1D1A' }}>
        <div className="container">
          <div className="section-header">
            <span className={styles.goldSubtitle}>Why Choose Us</span>
            <h2 className="text-gold-gradient">The ARUN CATERERS Distinction</h2>
            <p>What sets us apart in creating premium culinary experiences.</p>
          </div>

          <motion.div 
            className={styles.whyChooseGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {WHY_CHOOSE_US.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={index}
                  className={`${styles.whyCard} glass-card`}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10, 
                    borderColor: 'rgba(214, 175, 55, 0.5)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.iconContainer}>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={styles.cardIcon} size={28} />
                    </motion.div>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
