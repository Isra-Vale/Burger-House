import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { categories } from '../data/burgers'
import { burgers } from '../api/burgerApi'
import BurgerCard from '../components/BurgerCard'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = burgers.filter(burger => {
    const matchesCategory = activeCategory === 'All' || burger.category === activeCategory
    const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-20 pt-28"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-black">Our Menu</h1>
          <p className="text-lg text-gray-400">Discover your next favorite burger</p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 mb-12 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-burger-orange text-white shadow-lg shadow-burger-orange/25'
                    : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search burgers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-white/10 rounded-full text-sm focus:outline-none focus:border-burger-orange transition-colors"
            />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode='popLayout'>
            {filtered.map((burger, index) => (
              <BurgerCard key={burger.id} burger={burger} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-xl">No burgers found matching your criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Menu
