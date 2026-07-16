// src/components/BookingForm/BookingForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, MessageSquare, ClipboardList, User, Phone, Mail } from 'lucide-react';
import { OWNER_WHATSAPP } from '../../config/constants';
import styles from './BookingForm.module.css';

const EVENT_TYPES = [
  'Wedding Reception',
  'Engagement Ceremony',
  'House Warming (Gruhapravesam)',
  'Birthday Celebration',
  'Corporate Event / Gathering',
  'Temple Festival / Pooja',
  'Thread Ceremony (Upanayanam)',
  'Half Saree Ceremony',
  'Other Celebration'
];

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      guests: 100
    }
  });

  const onSubmit = (data) => {
    // 1. Save Booking to LocalStorage (for Admin page accessibility)
    const storedBookings = localStorage.getItem('acaterings_bookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
    
    const newBooking = {
      id: 'b_' + Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      date: data.date,
      type: data.type,
      guests: parseInt(data.guests),
      address: data.address,
      requirements: data.requirements || 'None',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem('acaterings_bookings', JSON.stringify(bookings));

    // 2. Save WhatsApp history request to LocalStorage
    const storedHistory = localStorage.getItem('acaterings_wa_history');
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    history.push({
      id: 'w_' + Date.now(),
      name: data.name,
      phone: data.phone,
      date: data.date,
      type: data.type,
      guests: data.guests,
      sentAt: new Date().toISOString()
    });
    localStorage.setItem('acaterings_wa_history', JSON.stringify(history));

    // 3. Generate Structured WhatsApp message
    const message = `Hello A Caterings,

I would like to book catering.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event Date: ${data.date}
Guests: ${data.guests}
Address: ${data.address}
Event Type: ${data.type}
Additional Requirements: ${data.requirements || 'None'}

Please contact me.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`;

    // 4. Open WhatsApp tab
    window.open(whatsappUrl, '_blank');

    // 5. Reset Form
    reset();
  };

  return (
    <motion.div 
      className={`${styles.formContainer} glass-card`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.formHeader}>
        <ClipboardList className={styles.headerIcon} size={28} />
        <h2>Request a Catering Proposal</h2>
        <p>Fill out details below and complete redirecting to WhatsApp. Our catering executives will contact you within 2 hours.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        
        {/* Row 1: Name & Phone */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <User size={16} className={styles.inputIcon} />
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Anand Varma"
              className={errors.name ? styles.inputError : ''}
              {...register('name', { required: 'Customer name is required' })}
            />
            {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">
              <Phone size={16} className={styles.inputIcon} />
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              className={errors.phone ? styles.inputError : ''}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Please enter a valid 10-digit mobile number'
                }
              })}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
          </div>
        </div>

        {/* Row 2: Email & Event Date */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <Mail size={16} className={styles.inputIcon} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. anand@example.com"
              className={errors.email ? styles.inputError : ''}
              {...register('email', { 
                required: 'Email address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">
              <Calendar size={16} className={styles.inputIcon} />
              Event Date
            </label>
            <input
              id="date"
              type="date"
              className={errors.date ? styles.inputError : ''}
              min={new Date().toISOString().split('T')[0]} // prevent past dates
              {...register('date', { required: 'Please select an event date' })}
            />
            {errors.date && <span className={styles.errorText}>{errors.date.message}</span>}
          </div>
        </div>

        {/* Row 3: Event Type & Guests Count */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="type">
              <ClipboardList size={16} className={styles.inputIcon} />
              Event Type
            </label>
            <select
              id="type"
              className={errors.type ? styles.inputError : ''}
              {...register('type', { required: 'Please select your celebration type' })}
            >
              <option value="">-- Choose Event Type --</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <span className={styles.errorText}>{errors.type.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="guests">
              <Users size={16} className={styles.inputIcon} />
              Number of Guests
            </label>
            <input
              id="guests"
              type="number"
              placeholder="Min 50 guests"
              className={errors.guests ? styles.inputError : ''}
              {...register('guests', { 
                required: 'Approximate guest count is required',
                min: { value: 30, message: 'Minimum ordering size is 30 guests' },
                max: { value: 20000, message: 'For events over 20,000 guests, contact us directly' }
              })}
            />
            {errors.guests && <span className={styles.errorText}>{errors.guests.message}</span>}
          </div>
        </div>

        {/* Full Row: Event Venue Address */}
        <div className={styles.formGroup}>
          <label htmlFor="address">
            <MapPin size={16} className={styles.inputIcon} />
            Venue / Delivery Address
          </label>
          <textarea
            id="address"
            rows="3"
            placeholder="Please enter the detailed venue or home address..."
            className={errors.address ? styles.inputError : ''}
            {...register('address', { required: 'Event location or address is required' })}
          />
          {errors.address && <span className={styles.errorText}>{errors.address.message}</span>}
        </div>

        {/* Full Row: Additional Requirements */}
        <div className={styles.formGroup}>
          <label htmlFor="requirements">
            <MessageSquare size={16} className={styles.inputIcon} />
            Special Requests & Requirements (Optional)
          </label>
          <textarea
            id="requirements"
            rows="3"
            placeholder="e.g. Pure Veg, specific items like Mutton Biryani required, live dosa station wanted, specific styling themes..."
            {...register('requirements')}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-gold"
          style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Catering Proposal
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
