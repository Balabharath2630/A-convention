// src/components/BookingForm/BookingForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, MessageSquare, ClipboardList, User, Phone, Mail, Clock } from 'lucide-react';
import { OWNER_WHATSAPP } from '../../config/constants';
import styles from './BookingForm.module.css';

const EVENT_TYPES = [
  'Wedding',
  'Reception',
  'Birthday',
  'Housewarming',
  'Corporate Event',
  'Temple Function',
  'Engagement',
  'Other'
];

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      guests: 100
    }
  });

  const onSubmit = (data) => {
    // 1. Save Booking to LocalStorage (for Admin page accessibility)
    const storedBookings = localStorage.getItem('aruncaterers_bookings');
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
      servingTime: data.servingTime,
      requirements: data.requirements || 'None',
      preferredMenu: data.preferredMenu || 'None',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem('aruncaterers_bookings', JSON.stringify(bookings));

    // 2. Save WhatsApp history request to LocalStorage
    const storedHistory = localStorage.getItem('aruncaterers_wa_history');
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
    localStorage.setItem('aruncaterers_wa_history', JSON.stringify(history));

    // 3. Generate Structured WhatsApp message
    const message = `Hello ARUN CATERERS,

I would like to request a custom catering quotation proposal for my event.

*Customer Details:*
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email}

*Event Details:*
- Event Type: ${data.type}
- Event Date: ${data.date}
- Preferred Serving Time: ${data.servingTime}
- Number of Guests: ${data.guests}
- Venue Address: ${data.address}

*Preferred Menu / Catering Requirements:*
${data.preferredMenu || 'None'}

*Special Requests:*
${data.requirements || 'None'}

Please share the pricing quote and customized menu options.

Thank You.`;

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
        <p>Fill out details below and complete redirecting to WhatsApp. Our catering executives will contact you within 2 hours to share customized menu plans.</p>
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
              placeholder="e.g. 7075812345"
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

        {/* Row 2: Email */}
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

        {/* Row 3: Event Date & Preferred Serving Time */}
        <div className={styles.row}>
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

          <div className={styles.formGroup}>
            <label htmlFor="servingTime">
              <Clock size={16} className={styles.inputIcon} />
              Preferred Serving Time
            </label>
            <input
              id="servingTime"
              type="text"
              placeholder="e.g. 12:30 PM, 7:00 PM"
              className={errors.servingTime ? styles.inputError : ''}
              {...register('servingTime', { required: 'Preferred serving time is required' })}
            />
            {errors.servingTime && <span className={styles.errorText}>{errors.servingTime.message}</span>}
          </div>
        </div>

        {/* Row 4: Event Type & Guests Count */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="type">
              <ClipboardList size={16} className={styles.inputIcon} />
              Event Type
            </label>
            <select
              id="type"
              className={errors.type ? styles.inputError : ''}
              {...register('type', { required: 'Please select your event type' })}
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
              placeholder="Min 30 guests"
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
            Venue Address
          </label>
          <textarea
            id="address"
            rows="3"
            placeholder="Please enter the detailed venue or home address..."
            className={errors.address ? styles.inputError : ''}
            {...register('address', { required: 'Event location/venue address is required' })}
          />
          {errors.address && <span className={styles.errorText}>{errors.address.message}</span>}
        </div>

        {/* Full Row: Special Requests */}
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

        {/* Full Row: Preferred Menu / Catering Requirements */}
        <div className={styles.formGroup}>
          <label htmlFor="preferredMenu">
            <ClipboardList size={16} className={styles.inputIcon} />
            Preferred Menu / Catering Requirements
          </label>
          <textarea
            id="preferredMenu"
            rows="5"
            placeholder={`Example:
Wedding Package
Veg / Non-Veg
Live Counters
Special Dishes
Custom Requirements`}
            className={errors.preferredMenu ? styles.inputError : ''}
            {...register('preferredMenu', { required: 'Preferred menu or catering requirements are required' })}
          />
          {errors.preferredMenu && <span className={styles.errorText}>{errors.preferredMenu.message}</span>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-gold"
          style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Booking Proposal Request
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
