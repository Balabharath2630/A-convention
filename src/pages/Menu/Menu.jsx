// src/pages/Menu/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, AlertCircle, ArrowRight } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../../config/constants';
import MenuCard from '../../components/MenuCard/MenuCard';
import styles from './Menu.module.css';

const CATEGORIES = [
  'All',
  'Veg',
  'Non Veg',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Sweets',
  'Live Counters'
];

const Menu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef({});
  const isFirstRender = useRef(true);

  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem('selected_catering_menu');
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleSelect = (item) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some((i) => i.id === item.id);
      let updated;
      if (isAlreadySelected) {
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem('selected_catering_menu', JSON.stringify(updated));
      return updated;
    });
  };

  // Synchronize menu items with LocalStorage
  useEffect(() => {
    const storedMenu = localStorage.getItem('aruncaterers_menu');
    if (storedMenu && JSON.parse(storedMenu).length === INITIAL_MENU_ITEMS.length) {
      setMenuItems(JSON.parse(storedMenu));
    } else {
      localStorage.setItem('aruncaterers_menu', JSON.stringify(INITIAL_MENU_ITEMS));
      setMenuItems(INITIAL_MENU_ITEMS);
    }
  }, []);

  // Smooth scroll active category chip into center view on mobile/horizontal scroll
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const activeEl = categoryRefs.current[activeCategory];
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  // Filtering Logic
  const filteredItems = menuItems.filter((item) => {
    // Search Query Match
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Category Match
    if (activeCategory === 'All') return true;

    // Check if category is standard category e.g. item.category matches, 
    // or if the category is one of the tags e.g. item.tags contains activeCategory
    const categoryMatches = item.category === activeCategory;
    const tagMatches = item.tags && item.tags.includes(activeCategory);

    return categoryMatches || tagMatches;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.menuPage}
    >
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <span className={styles.goldSubtitle}>Royal Flavors</span>
            <h1 className="text-gold-gradient">Catering Menu</h1>
          </div>
        </div>
      </section>

      {/* Main Filter and Menu Grid Section */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          
          {/* Search and Filters Bar */}
          <div className={styles.filterBar}>
            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Search premium dishes (e.g. Biryani, Garelu)..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
            
            {/* Mobile filter slider indicator */}
            <div className={styles.filterHeader}>
              <SlidersHorizontal size={16} color="#D4AF37" />
              <span>Filter Categories</span>
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  ref={(el) => (categoryRefs.current[category] = el)}
                  className={`${styles.tabBtn} ${activeCategory === category ? styles.activeTab : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Result Stats */}
          <div className={styles.resultStats}>
            Showing <span>{filteredItems.length}</span> premium dishes
          </div>

          {/* Menu Items Grid */}
          <motion.div 
            className={styles.grid}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <MenuCard 
                    item={item} 
                    isSelected={selectedItems.some((i) => i.id === item.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty Results Screen */}
          {filteredItems.length === 0 && (
            <motion.div 
              className={styles.emptyState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={48} className={styles.emptyIcon} />
              <h3>No Culinary Delights Found</h3>
              <p>We couldn't find any dishes matching "{searchQuery}" in category "{activeCategory}". Try clearing your filters or searching another keyword.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }} 
                className="btn btn-gold btn-sm"
                style={{ marginTop: '1.5rem' }}
              >
                Reset Filters
              </button>
            </motion.div>
          )}

        </div>
      </section>

      {/* Floating Summary Button */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <div className={styles.floatingSummary}>
            <motion.button 
              onClick={() => navigate('/booking')} 
              className="btn btn-gold btn-lg"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 8px 30px rgba(214, 175, 55, 0.4)',
                borderRadius: '30px',
                padding: '1rem 2.2rem',
                fontSize: '1.05rem',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              My Selected Menu ({selectedItems.length})
              <ArrowRight size={18} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Menu;
