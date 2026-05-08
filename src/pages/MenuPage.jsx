import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { burgers, categories } from '../data/burgers';
import BurgerCard from '../components/BurgerCard';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBurgers = burgers.filter((burger) => {
    const matchesCategory = activeCategory === 'All' || burger.category === activeCategory;
    const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         burger.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-burger-orange text-sm font-semibold tracking-wider uppercase">Our Menu</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            Explore Our Burgers
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            From classic beef to plant-based options, find your perfect burger match.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search burgers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-burger-orange/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-warm text-white shadow-lg shadow-burger-orange/25'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Burger Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBurgers.map((burger, i) => (
              <BurgerCard key={burger.id} burger={burger} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredBurgers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <SlidersHorizontal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No burgers found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-burger-orange hover:text-burger-yellow transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
