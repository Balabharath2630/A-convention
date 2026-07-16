// src/pages/Admin/Admin.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, LayoutDashboard, Utensils, CalendarDays, History, LogOut,
  Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Check, X, Info
} from 'lucide-react';
import { ADMIN_CREDENTIALS, INITIAL_MENU_ITEMS } from '../../config/constants';
import styles from './Admin.module.css';

const Admin = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Menu Management State
  const [menuItems, setMenuItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [waHistory, setWaHistory] = useState([]);

  // Form Modal States (Add/Edit Item)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form Inputs
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Veg');
  const [formTags, setFormTags] = useState('Lunch');
  const [formPrice, setFormPrice] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formAvailable, setFormAvailable] = useState(true);

  // Check login session on mount
  useEffect(() => {
    const session = localStorage.getItem('acaterings_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
    }
    
    // Load LocalStorage Data
    loadLocalStorageData();
  }, []);

  const loadLocalStorageData = () => {
    // 1. Menu
    const storedMenu = localStorage.getItem('acaterings_menu');
    if (storedMenu) {
      setMenuItems(JSON.parse(storedMenu));
    } else {
      localStorage.setItem('acaterings_menu', JSON.stringify(INITIAL_MENU_ITEMS));
      setMenuItems(INITIAL_MENU_ITEMS);
    }

    // 2. Bookings
    const storedBookings = localStorage.getItem('acaterings_bookings');
    setBookings(storedBookings ? JSON.parse(storedBookings) : []);

    // 3. WhatsApp log
    const storedWa = localStorage.getItem('acaterings_wa_history');
    setWaHistory(storedWa ? JSON.parse(storedWa) : []);
  };

  // Auth Submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === ADMIN_CREDENTIALS.username && passwordInput === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('acaterings_admin_session', 'active');
    } else {
      setLoginError('Invalid Username or Password. Please try again.');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('acaterings_admin_session');
    setUsernameInput('');
    setPasswordInput('');
  };

  // Toggle Availability in LocalStorage
  const handleToggleAvailable = (id) => {
    const updated = menuItems.map(item => {
      if (item.id === id) {
        return { ...item, available: !item.available };
      }
      return item;
    });
    setMenuItems(updated);
    localStorage.setItem('acaterings_menu', JSON.stringify(updated));
  };

  // Delete Menu Item
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      const updated = menuItems.filter(item => item.id !== id);
      setMenuItems(updated);
      localStorage.setItem('acaterings_menu', JSON.stringify(updated));
    }
  };

  // Open Modal (Add)
  const openAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormDesc('');
    setFormCategory('Veg');
    setFormTags('Lunch');
    setFormPrice('');
    setFormImage('');
    setFormAvailable(true);
    setIsModalOpen(true);
  };

  // Open Modal (Edit)
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormDesc(item.description);
    setFormCategory(item.category);
    setFormTags(item.tags ? item.tags.join(', ') : 'Lunch');
    setFormPrice(item.price);
    setFormImage(item.image);
    setFormAvailable(item.available);
    setIsModalOpen(true);
  };

  // Form Submit (Add/Edit save)
  const handleSaveItem = (e) => {
    e.preventDefault();

    if (!formName || !formPrice || !formImage) {
      alert('Please fill out all required fields (Name, Price, Image URL).');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    let updatedMenu = [...menuItems];

    if (editingItem) {
      // Edit mode
      updatedMenu = menuItems.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: formName,
            description: formDesc,
            category: formCategory,
            tags: tagsArray,
            price: parseFloat(formPrice),
            image: formImage,
            available: formAvailable
          };
        }
        return item;
      });
    } else {
      // Add mode
      const newItem = {
        id: 'm_' + Date.now(),
        name: formName,
        description: formDesc,
        category: formCategory,
        tags: tagsArray,
        price: parseFloat(formPrice),
        image: formImage,
        available: formAvailable
      };
      updatedMenu.push(newItem);
    }

    setMenuItems(updatedMenu);
    localStorage.setItem('acaterings_menu', JSON.stringify(updatedMenu));
    setIsModalOpen(false);
  };

  // Delete Booking Log
  const handleDeleteBooking = (id) => {
    if (window.confirm('Remove this booking log?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('acaterings_bookings', JSON.stringify(updated));
    }
  };

  // Clear WhatsApp History Logs
  const handleClearWaHistory = () => {
    if (window.confirm('Delete all WhatsApp Request history logs?')) {
      setWaHistory([]);
      localStorage.removeItem('acaterings_wa_history');
    }
  };

  // Compute stats metrics
  const totalDishes = menuItems.length;
  const vegDishes = menuItems.filter(item => item.category === 'Veg').length;
  const nonVegDishes = menuItems.filter(item => item.category === 'Non Veg').length;
  const liveStations = menuItems.filter(item => item.category === 'Live Counters' || (item.tags && item.tags.includes('Live Counters'))).length;
  const totalBookingsCount = bookings.length;
  const whatsappLogsCount = waHistory.length;

  // Simple math for SVG chart calculations
  const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);
  const averageGuests = totalBookingsCount > 0 ? Math.round(totalGuests / totalBookingsCount) : 0;

  // Group Bookings by type for SVG Pie Chart
  const typeCounts = {};
  bookings.forEach(b => {
    typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
  });

  return (
    <div className={styles.adminPage}>
      
      {/* Authentication Form Wall */}
      {!isAuthenticated ? (
        <div className={styles.authWrapper}>
          <motion.div 
            className={`${styles.authCard} glass-card`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.authHeader}>
              <Lock size={32} className={styles.lockIcon} />
              <h2>A Caterings Admin</h2>
              <p>Enter credentials to access the management dashboard.</p>
            </div>
            
            <form onSubmit={handleLogin} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. admin"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && <div className={styles.loginError}>{loginError}</div>}

              <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.8rem' }}>
                Secure Login
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        
        /* Logged In Dashboard layout */
        <div className={styles.dashboardContainer}>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <img src="/src/assets/logo.png" alt="A Caterings" className={styles.sidebarLogo} />
              <div className={styles.sidebarText}>
                <h3>A Caterings</h3>
                <span>Control Center</span>
              </div>
            </div>

            <nav className={styles.sidebarNav}>
              <button 
                className={`${styles.navBtn} ${activeTab === 'overview' ? styles.activeNavBtn : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </button>
              
              <button 
                className={`${styles.navBtn} ${activeTab === 'menu' ? styles.activeNavBtn : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                <Utensils size={18} />
                <span>Manage Menu</span>
              </button>

              <button 
                className={`${styles.navBtn} ${activeTab === 'bookings' ? styles.activeNavBtn : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <CalendarDays size={18} />
                <span>Bookings ({totalBookingsCount})</span>
              </button>

              <button 
                className={`${styles.navBtn} ${activeTab === 'wa_logs' ? styles.activeNavBtn : ''}`}
                onClick={() => setActiveTab('wa_logs')}
              >
                <History size={18} />
                <span>WhatsApp Log ({whatsappLogsCount})</span>
              </button>
            </nav>

            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={16} />
              <span>Logout Admin</span>
            </button>
          </aside>

          {/* Main Dashboard Panel */}
          <main className={styles.mainContent}>
            
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h1>Dashboard Overview</h1>
                  <p>Welcome back, Administrator. Here is a summary of your catering operations.</p>
                </div>

                {/* Stats Cards Grid */}
                <div className={styles.statsGrid}>
                  <div className={`${styles.statCard} glass-card`}>
                    <h3>Total Menu Dishes</h3>
                    <span className={styles.statNumber}>{totalDishes}</span>
                    <p>{vegDishes} Veg • {nonVegDishes} Non Veg</p>
                  </div>
                  <div className={`${styles.statCard} glass-card`}>
                    <h3>Form Bookings</h3>
                    <span className={styles.statNumber}>{totalBookingsCount}</span>
                    <p>{averageGuests ? `Avg. ${averageGuests} Guests` : 'No bookings yet'}</p>
                  </div>
                  <div className={`${styles.statCard} glass-card`}>
                    <h3>WhatsApp Requests</h3>
                    <span className={styles.statNumber}>{whatsappLogsCount}</span>
                    <p>Total clicks tracked</p>
                  </div>
                  <div className={`${styles.statCard} glass-card`}>
                    <h3>Live Stations</h3>
                    <span className={styles.statNumber}>{liveStations}</span>
                    <p>Interactive cooking units</p>
                  </div>
                </div>

                {/* SVG Visualizations / Charts */}
                <div className={styles.chartsGrid}>
                  
                  {/* Chart 1: Guest Ranges Distribution SVG */}
                  <div className={`${styles.chartCard} glass-card`}>
                    <h4>Reservations Breakdown (Guest Counts)</h4>
                    <div className={styles.chartWrapper}>
                      {bookings.length === 0 ? (
                        <div className={styles.noChartData}>
                          <Info size={30} />
                          <p>Reserve events to populate chart visualizers</p>
                        </div>
                      ) : (
                        <svg viewBox="0 0 400 200" className={styles.svgChart}>
                          {/* Grid Lines */}
                          <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,248,240,0.1)" />
                          <line x1="40" y1="70" x2="380" y2="70" stroke="rgba(255,248,240,0.1)" />
                          <line x1="40" y1="120" x2="380" y2="120" stroke="rgba(255,248,240,0.1)" />
                          <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,248,240,0.3)" />

                          {/* Render columns representing guest sizes */}
                          {bookings.slice(-5).map((b, index) => {
                            const x = 70 + index * 60;
                            const maxVal = Math.max(...bookings.map(book => book.guests), 500);
                            const height = (b.guests / maxVal) * 130;
                            const y = 170 - height;
                            
                            return (
                              <g key={b.id}>
                                <motion.rect
                                  x={x}
                                  y={y}
                                  width="30"
                                  height={height}
                                  fill="url(#goldGradient)"
                                  initial={{ height: 0, y: 170 }}
                                  animate={{ height, y }}
                                  transition={{ duration: 0.8, delay: index * 0.1 }}
                                />
                                <text x={x + 15} y={y - 8} textAnchor="middle" fill="#FFF8F0" fontSize="10">{b.guests}</text>
                                <text x={x + 15} y="185" textAnchor="middle" fill="rgba(255,248,240,0.5)" fontSize="9">
                                  {b.name.split(' ')[0]}
                                </text>
                              </g>
                            );
                          })}

                          {/* Gradients definition inside SVG */}
                          <defs>
                            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FFF89C" />
                              <stop offset="100%" stopColor="#D4AF37" />
                            </linearGradient>
                          </defs>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Chart 2: Event Type Counts SVG Donut Chart */}
                  <div className={`${styles.chartCard} glass-card`}>
                    <h4>Bookings by Celebration Type</h4>
                    <div className={styles.chartWrapper}>
                      {bookings.length === 0 ? (
                        <div className={styles.noChartData}>
                          <Info size={30} />
                          <p>Reserve events to populate chart visualizers</p>
                        </div>
                      ) : (
                        <div className={styles.donutLayout}>
                          <svg viewBox="0 0 200 200" className={styles.svgDonut}>
                            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,248,240,0.05)" strokeWidth="15" />
                            {/* Simple colored segment arcs representation */}
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#7A1414" strokeWidth="15" strokeDasharray="300 440" strokeDashoffset="0" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#D4AF37" strokeWidth="15" strokeDasharray="100 440" strokeDashoffset="-300" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#FFF8F0" strokeWidth="15" strokeDasharray="40 440" strokeDashoffset="-400" />
                          </svg>
                          <div className={styles.donutLegend}>
                            <div className={styles.legendItem}>
                              <span style={{ backgroundColor: '#7A1414' }} />
                              <span>Wedding / Receptions</span>
                            </div>
                            <div className={styles.legendItem}>
                              <span style={{ backgroundColor: '#D4AF37' }} />
                              <span>House Warming</span>
                            </div>
                            <div className={styles.legendItem}>
                              <span style={{ backgroundColor: '#FFF8F0' }} />
                              <span>Others</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Tab: Menu Management */}
            {activeTab === 'menu' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.tabContent}>
                <div className={styles.contentHeaderRow}>
                  <div className={styles.contentHeader}>
                    <h1>Manage Catering Menu</h1>
                    <p>Add, edit, or delete dishes. Changes immediately sync to the user menu page.</p>
                  </div>
                  <button onClick={openAddModal} className="btn btn-gold btn-sm" style={{ gap: '0.4rem' }}>
                    <Plus size={16} />
                    Add Dish Item
                  </button>
                </div>

                {/* Dishes Table */}
                <div className={`${styles.tableWrapper} glass-card`}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Dish Info</th>
                        <th>Category</th>
                        <th>Price Per Plate</th>
                        <th>Availability</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className={styles.dishInfoCell}>
                              <img src={item.image} alt={item.name} className={styles.tableThumb} />
                              <div className={styles.dishDetails}>
                                <strong>{item.name}</strong>
                                <span>{item.description.substring(0, 50)}...</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`${styles.badge} ${item.category === 'Non Veg' ? styles.badgeNonVeg : item.category === 'Veg' ? styles.badgeVeg : styles.badgeSweet}`}>
                              {item.category}
                            </span>
                          </td>
                          <td>
                            <strong className={styles.priceVal}>₹{item.price}</strong>
                          </td>
                          <td>
                            <button 
                              className={styles.toggleBtn}
                              onClick={() => handleToggleAvailable(item.id)}
                            >
                              {item.available ? (
                                <ToggleRight size={28} color="#25D366" />
                              ) : (
                                <ToggleLeft size={28} color="rgba(255,248,240,0.3)" />
                              )}
                            </button>
                          </td>
                          <td>
                            <div className={styles.actionsCell}>
                              <button onClick={() => openEditModal(item)} className={styles.editBtn} aria-label="Edit item">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDeleteItem(item.id)} className={styles.deleteBtn} aria-label="Delete item">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Tab: Bookings */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h1>Catering Bookings Log</h1>
                  <p>View reservations captured from the client booking forms.</p>
                </div>

                <div className={`${styles.tableWrapper} glass-card`}>
                  {bookings.length === 0 ? (
                    <div className={styles.emptyTableState}>
                      <CalendarDays size={48} className={styles.emptyTableIcon} />
                      <h3>No Booking Requests Recorded</h3>
                      <p>Guest catering forms submitted on the booking page will list here.</p>
                    </div>
                  ) : (
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Client Details</th>
                          <th>Event Date</th>
                          <th>Event Type</th>
                          <th>Guests Size</th>
                          <th>Venue Address</th>
                          <th style={{ textAlign: 'center' }}>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.id}>
                            <td>
                              <div className={styles.clientCell}>
                                <strong>{b.name}</strong>
                                <span>{b.phone}</span>
                                <span>{b.email}</span>
                              </div>
                            </td>
                            <td>{b.date}</td>
                            <td>
                              <span className={styles.eventTypeBadge}>{b.type}</span>
                            </td>
                            <td>
                              <strong className={styles.guestCount}>{b.guests} Guests</strong>
                            </td>
                            <td>
                              <div className={styles.addressCell}>
                                <span>{b.address}</span>
                                {b.requirements && b.requirements !== 'None' && (
                                  <small><strong>Note:</strong> {b.requirements}</small>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className={styles.actionsCell}>
                                <button onClick={() => handleDeleteBooking(b.id)} className={styles.deleteBtn} aria-label="Delete booking">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab: WhatsApp Log */}
            {activeTab === 'wa_logs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.tabContent}>
                <div className={styles.contentHeaderRow}>
                  <div className={styles.contentHeader}>
                    <h1>WhatsApp Request History Logs</h1>
                    <p>Tracked timestamps of redirect clicks triggered on checkout.</p>
                  </div>
                  {waHistory.length > 0 && (
                    <button onClick={handleClearWaHistory} className="btn btn-outline btn-sm">
                      Clear Log History
                    </button>
                  )}
                </div>

                <div className={`${styles.tableWrapper} glass-card`}>
                  {waHistory.length === 0 ? (
                    <div className={styles.emptyTableState}>
                      <History size={48} className={styles.emptyTableIcon} />
                      <h3>No Clicks Logged</h3>
                      <p>When users click "Book Catering Proposal" redirecting to WhatsApp, log records will appear here.</p>
                    </div>
                  ) : (
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Client Name</th>
                          <th>Phone</th>
                          <th>Target Event</th>
                          <th>Guest count</th>
                          <th>Click Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waHistory.map((log) => (
                          <tr key={log.id}>
                            <td><strong>{log.name}</strong></td>
                            <td>{log.phone}</td>
                            <td>{log.type} ({log.date})</td>
                            <td>{log.guests}</td>
                            <td><span className={styles.logTime}>{new Date(log.sentAt).toLocaleString()}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

          </main>
        </div>
      )}

      {/* Modal Dialog: Add/Edit Menu Item */}
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <motion.div 
              className={`${styles.modalCard} glass-card`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                <button onClick={() => setIsModalOpen(false)} className={styles.modalCloseBtn}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Dish Name *</label>
                  <input 
                    type="text" 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    placeholder="e.g. Gongura Mutton Biryani" 
                    required 
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                      <option value="Veg">Veg</option>
                      <option value="Non Veg">Non Veg</option>
                      <option value="Sweets">Sweets</option>
                      <option value="Live Counters">Live Counters</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Price Per Plate (INR) *</label>
                    <input 
                      type="number" 
                      value={formPrice} 
                      onChange={(e) => setFormPrice(e.target.value)} 
                      placeholder="e.g. 350" 
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    value={formTags} 
                    onChange={(e) => setFormTags(e.target.value)} 
                    placeholder="e.g. Lunch, Dinner, Spicy" 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Image URL *</label>
                  <input 
                    type="text" 
                    value={formImage} 
                    onChange={(e) => setFormImage(e.target.value)} 
                    placeholder="e.g. https://images.unsplash.com/... or /src/assets/..." 
                    required 
                  />
                  <small className={styles.hint}>You can copy-paste any Unsplash image URL or local paths like /src/assets/biryani.png</small>
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={formDesc} 
                    onChange={(e) => setFormDesc(e.target.value)} 
                    placeholder="Describe the dish ingredients and preparation styles..." 
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    id="available" 
                    checked={formAvailable} 
                    onChange={(e) => setFormAvailable(e.target.checked)} 
                  />
                  <label htmlFor="available">Dish Available For Bookings</label>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold btn-sm">
                    Save Dish Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
