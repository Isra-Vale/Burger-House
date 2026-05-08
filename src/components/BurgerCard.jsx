import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const BurgerCard = ({ burger, index }) => {
  const { dispatch } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...burger, quantity: 1 }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/burger/${burger.id}`}>
        <div className="glass-card overflow-hidden hover:border-burger-orange/30 transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <img
              src={burger.image}
              alt={burger.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-burger-yellow fill-burger-yellow" />
              <span className="text-xs font-bold">{burger.rating}</span>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold bg-burger-orange text-white px-3 py-1 rounded-full">
                {burger.category}
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-bold text-white group-hover:text-burger-orange transition-colors">
              {burger.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{burger.description}</p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-black text-burger-yellow">${burger.price}</span>
              <motion.button
                onClick={handleAddToCart}
                className="p-3 bg-burger-orange rounded-full text-white hover:bg-burger-yellow hover:text-dark-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BurgerCard
