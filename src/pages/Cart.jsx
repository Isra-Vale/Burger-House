import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, dispatch, subtotal, tax, total } = useCart()

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-28 pb-20 min-h-screen flex flex-col items-center justify-center"
      >
        <ShoppingBag className="w-20 h-20 text-gray-700 mb-6" />
        <h1 className="text-3xl font-black mb-2">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added any burgers yet.</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-burger-orange font-semibold">${item.price}</p>
              </div>

              <div className="flex items-center gap-2 bg-dark-900 rounded-full p-1">
                <button
                  onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: item.quantity - 1 }
                  })}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: item.quantity + 1 }
                  })}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="text-right min-w-[80px]">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                className="p-2 text-gray-500 hover:text-burger-red transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="text-burger-yellow">${total.toFixed(2)}</span>
          </div>

          <motion.button
            className="w-full btn-primary py-4 text-lg mt-4 inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
