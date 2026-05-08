import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check } from 'lucide-react'
import { burgers } from '../api/burgerApi'
import { useCart } from '../context/CartContext'
import BurgerCard from '../components/BurgerCard'

const BurgerDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const burger = burgers.find(b => b.id === Number(id))
  const related = burgers.filter(b => b.category === burger?.category && b.id !== burger?.id).slice(0, 3)

  if (!burger) {
    return (
      <div className="text-center pt-28">
        <h1 className="text-2xl">Burger not found</h1>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...burger, quantity }
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20 pt-28"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 gap-12 mb-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[500px]"
          >
            <img
              src={burger.image}
              alt={burger.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full w-fit bg-burger-orange/10 text-burger-orange">
              {burger.category}
            </span>
            <h1 className="mb-4 text-5xl font-black">{burger.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(burger.rating) ? 'text-burger-yellow fill-burger-yellow' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400">({burger.rating})</span>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-300">{burger.description}</p>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {burger.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1.5 bg-dark-800 rounded-lg text-sm text-gray-300 border border-white/5">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-4xl font-black text-burger-yellow">${burger.price}</span>

              <div className="flex items-center gap-3 p-1 rounded-full bg-dark-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 transition-colors rounded-full hover:bg-white/10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 font-bold text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 transition-colors rounded-full hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className={`btn-primary inline-flex items-center justify-center gap-2 text-lg w-full sm:w-auto ${
                added ? 'bg-green-500 shadow-green-500/25' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {added ? (
                <><Check className="w-5 h-5" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Add to Cart — ${(burger.price * quantity).toFixed(2)}</>
              )}
            </motion.button>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-black">You Might Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((b, i) => (
                <BurgerCard key={b.id} burger={b} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default BurgerDetails
