// src/pages/Contact/Contact.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Clock, MapPin, Send, Compass } from 'lucide-react';
import { OWNER_WHATSAPP } from '../../config/constants';
import styles from './Contact.module.css';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // Treat as custom inquiry - save to LocalStorage and open WhatsApp
    const message = `Hello ARUN CATERERS,

I have a general inquiry.

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}

Please get back to me.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`, '_blank');
    reset();
  };

  const handleCall = () => {
    window.open('tel:+917075812345', '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20ARUN%20CATERERS%2C%20I%20would%20like%20to%20chat.`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.contactPage}
    >
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <span className={styles.goldSubtitle}>Connect With Us</span>
            <h1 className="text-gold-gradient">Contact ARUN CATERERS</h1>
          </div>
        </div>
      </section>

      {/* Contact Cards & Map Grid */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          
          {/* Quick Contact Cards */}
          <div className={styles.cardsGrid}>
            <motion.div 
              className={`${styles.contactCard} glass-card`}
              whileHover={{ y: -5 }}
              onClick={handleCall}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.iconCircle}>
                <Phone size={24} color="#D4AF37" />
              </div>
              <h3>Call Owner</h3>
              <p>+91 70758 12345</p>
              <span>Click to call instantly</span>
            </motion.div>

            <motion.div 
              className={`${styles.contactCard} glass-card`}
              whileHover={{ y: -5 }}
              onClick={handleWhatsApp}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.iconCircle} style={{ borderColor: '#25D366' }}>
                <MessageSquare size={24} color="#25D366" />
              </div>
              <h3>WhatsApp Chat</h3>
              <p>+91 70758 12345</p>
              <span>Instant chat replies</span>
            </motion.div>

            <motion.div 
              className={`${styles.contactCard} glass-card`}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconCircle}>
                <Mail size={24} color="#D4AF37" />
              </div>
              <h3>Email Inquiry</h3>
              <p>info@aruncaterers.com</p>
              <span>Write us for partnerships</span>
            </motion.div>

            <motion.div 
              className={`${styles.contactCard} glass-card`}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconCircle}>
                <Clock size={24} color="#D4AF37" />
              </div>
              <h3>Kitchen Hours</h3>
              <p>06:00 AM - 11:00 PM</p>
              <span>All 7 Days of the Week</span>
            </motion.div>
          </div>

          {/* Form & Map Splitting Column */}
          <div className={styles.formMapGrid}>
            
            {/* Contact Inquiry Form */}
            <motion.div 
              className={`${styles.formWrapper} glass-card`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.formHeader}>
                <h2>Send an Instant Message</h2>
                <p>Have general queries, reviews, or special feedback? Drop us a line below.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    className={errors.name ? styles.inputError : ''}
                    {...register('name', { required: 'Please enter your name' })}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    className={errors.email ? styles.inputError : ''}
                    {...register('email', { 
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Menu customizations, career inquiry..."
                    className={errors.subject ? styles.inputError : ''}
                    {...register('subject', { required: 'Please specify a subject' })}
                  />
                  {errors.subject && <span className={styles.errorText}>{errors.subject.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message Content</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Describe your request in detail..."
                    className={errors.message ? styles.inputError : ''}
                    {...register('message', { required: 'Please write your message details' })}
                  />
                  {errors.message && <span className={styles.errorText}>{errors.message.message}</span>}
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', gap: '0.6rem' }}>
                  <Send size={16} />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </motion.div>

            {/* Styled Maps Placeholder */}
            <motion.div 
              className={styles.mapWrapper}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`${styles.mapCard} glass-card`}>
                <div className={styles.mapBackgroundOverlay}>
                  <Compass size={60} className={styles.mapCompassIcon} />
                  <h3>Headquarters & Master Kitchen</h3>
                  <div className={styles.addressRow}>
                    <MapPin size={24} className={styles.mapIcon} />
                    <p>Arundalpet, Guntur, Andhra Pradesh - 522002</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Note:</strong> We accept in-person consultations by appointments only. To request a food tasting session, please book at least 3 days in advance.</p>
                  </div>
                  <button 
                    onClick={() => window.open('https://maps.google.com/?q=ARUN+CATERERS+Arundalpet+Guntur', '_blank')} 
                    className="btn btn-gold btn-sm"
                  >
                    Open Google Maps
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
