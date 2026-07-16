// src/pages/Menu/Menu.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
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
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize menu items with LocalStorage
  useEffect(() => {
    const storedMenu = localStorage.getItem('acaterings_menu');
    if (storedMenu) {
      setMenuItems(JSON.parse(storedMenu));
    } else {
      localStorage.setItem('acaterings_menu', JSON.stringify(INITIAL_MENU_ITEMS));
      setMenuItems(INITIAL_MENU_ITEMS);
    }
  }, []);

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
                  <MenuCard item={item} />
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
    </motion.div>
  );
};

export default Menu;
