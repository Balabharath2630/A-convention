// src/components/Testimonial/Testimonial.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../config/constants';
import styles from './Testimonial.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonial = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className={styles.goldSubtitle}>Customer Love</span>
          <h2 className="text-gold-gradient">What Families Say</h2>
          <p>Read review stories from hosts who trusted us with their milestone celebrations.</p>
        </div>

        {/* Carousel Slider */}
        <div className={styles.carouselWrapper}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, el: `.${styles.customPagination}` }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className={styles.swiperContainer}
          >
            {INITIAL_TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className={styles.card}>
                  <Quote className={styles.quoteIcon} size={40} />
                  
                  {/* Rating Stars */}
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>

                  <p className={styles.reviewText}>"{t.review}"</p>

                  <div className={styles.divider} />

                  {/* Customer Info */}
                  <div className={styles.clientInfo}>
                    <img src={t.avatar} alt={t.name} className={styles.avatar} />
                    <div className={styles.details}>
                      <h4 className={styles.name}>{t.name}</h4>
                      <span className={styles.role}>{t.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination Indicator */}
          <div className={styles.customPagination}></div>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
