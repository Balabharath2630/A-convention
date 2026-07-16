// src/config/constants.js

export const OWNER_WHATSAPP = "919876543210";

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "123" // Simple password as requested or standard credentials
};

export const INITIAL_MENU_ITEMS = [
  {
    id: "m1",
    name: "Chicken Dum Biryani",
    description: "Authentic Hyderabadi style double-masala long-grain basmati rice biryani cooked under dum with tender marinated chicken.",
    category: "Non Veg",
    tags: ["Lunch", "Dinner"],
    price: 350,
    image: "/src/assets/biryani.png",
    available: true
  },
  {
    id: "m2",
    name: "Mutton Curry (Andhra Style)",
    description: "Tender goat meat slow-cooked in a fiery and aromatic gravy made of poppy seeds, coconut, and freshly ground spices.",
    category: "Non Veg",
    tags: ["Lunch", "Dinner"],
    price: 450,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m3",
    name: "Gongura Chicken",
    description: "A classic Andhra delicacy combining succulent chicken pieces cooked in a tangy sorrel leaves (gongura) paste and spices.",
    category: "Non Veg",
    tags: ["Lunch", "Dinner"],
    price: 320,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m4",
    name: "Royal Andhra Meals Thali",
    description: "Premium banana-leaf style catering layout featuring white rice, ghee, Pappu, Gongura pickle, Avakaya, Sambar, Rasam, and Majjiga Pulusu.",
    category: "Veg",
    tags: ["Lunch"],
    price: 250,
    image: "/src/assets/meals.png",
    available: true
  },
  {
    id: "m5",
    name: "Gutti Vankaya Curry",
    description: "Tender baby eggplants stuffed with a rich, roasted spice paste of peanuts, sesame seeds, coconut, and tamarind.",
    category: "Veg",
    tags: ["Lunch", "Dinner"],
    price: 220,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m6",
    name: "Special Pulihora",
    description: "Traditional tamarind rice cooked with roasted peanuts, green chilies, mustard seeds, curry leaves, and a touch of asafoetida.",
    category: "Veg",
    tags: ["Breakfast", "Lunch"],
    price: 180,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m7",
    name: "Spiced Fish Fry",
    description: "Fresh catch of the day marinated in Nellore spices and shallow fried to a perfect golden crisp.",
    category: "Non Veg",
    tags: ["Snacks", "Dinner"],
    price: 380,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m8",
    name: "Crispy Garelu with Chutney",
    description: "Deep-fried black gram lentil fritters, crispy on the outside, fluffy inside, served with fresh coconut and tomato chutneys.",
    category: "Veg",
    tags: ["Breakfast", "Snacks"],
    price: 140,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m9",
    name: "Ghee Bobbatlu (Puran Poli)",
    description: "Sweet flatbread filled with a rich mixture of chana dal, jaggery, and cardamom, toasted with copious amounts of pure desi ghee.",
    category: "Sweets",
    tags: ["Snacks", "Sweets"],
    price: 200,
    image: "/src/assets/sweets.png",
    available: true
  },
  {
    id: "m10",
    name: "Elachi Payasam",
    description: "Traditional creamy rice and milk pudding flavored with cardamom, saffron, and loaded with golden-fried cashew nuts and raisins.",
    category: "Sweets",
    tags: ["Sweets"],
    price: 160,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "m11",
    name: "Live Dosa Counter",
    description: "Live station serving hot, crispy, and custom-ordered varieties of dosas including Masala Dosa, Ghee Roast, and Cheese Dosa with piping hot sambar.",
    category: "Live Counters",
    tags: ["Breakfast", "Dinner", "Live Counters"],
    price: 280,
    image: "/src/assets/live_counter.png",
    available: true
  },
  {
    id: "m12",
    name: "Live Tandoori Starters Station",
    description: "Interactive fire station preparing fresh Chicken Tikka, Paneer Shashlik, and Seekh Kababs live over natural charcoal clay ovens.",
    category: "Live Counters",
    tags: ["Snacks", "Dinner", "Live Counters"],
    price: 400,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    available: true
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t1",
    name: "Dr. Srinivas Rao",
    role: "Bride's Father (Wedding Event)",
    review: "A Caterings did an absolute masterpiece of a job for my daughter's wedding! The Chicken Dum Biryani and live sweets counter were the highlights. Guests are still talking about the authentic Andhra flavors. Simply outstanding and highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "Kavitha Reddy",
    role: "Housewarming Host",
    review: "Hired them for our housewarming function. The Gutti Vankaya and Pulihora tasted exactly like traditional home-cooked recipes but with a highly premium presentation. The staff was professional and the setup was immaculate.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t3",
    name: "Raghavendra Chawla",
    role: "Corporate Lead (Tech Mahindra)",
    review: "Superb service. We ordered live counters for our corporate annual meet. The dosa variety and live tandoor starters were extremely fast, fresh, and delicious. Cleanliness and hygiene standards were outstanding.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Cinematic Chicken Dum Biryani",
    category: "food",
    image: "/src/assets/biryani.png"
  },
  {
    id: "g2",
    title: "Royal Andhra Meals Thali Setup",
    category: "food",
    image: "/src/assets/meals.png"
  },
  {
    id: "g3",
    title: "Premium Sweets Buffet Display",
    category: "setup",
    image: "/src/assets/sweets.png"
  },
  {
    id: "g4",
    title: "Interactive Live Cooking Station",
    category: "setup",
    image: "/src/assets/live_counter.png"
  },
  {
    id: "g5",
    title: "Gourmet Paneer Tikka Platter",
    category: "food",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g6",
    title: "Grand Entrance Catering Layout",
    category: "setup",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g7",
    title: "Crispy Traditional Garelu",
    category: "food",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g8",
    title: "Luxury Dining Table Arrangement",
    category: "decor",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g9",
    title: "Elegant Floral Decor",
    category: "decor",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"
  }
];
