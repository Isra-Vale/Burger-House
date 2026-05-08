import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { subtotal, tax, total } = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any burgers yet.</p>
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-gradient-warm text-white font-semibold rounded-xl"
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            Your Cart
          </h1>
          <p className="text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/5"
                >
                  <Link to={`/burger/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/burger/${item.id}`}>
                          <h3 className="text-white font-display font-semibold truncate hover:text-burger-orange transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-white/5 hover:bg-burger-red/20 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-burger-red" />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </motion.button>
                        <span className="text-white font-semibold w-6 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                      <p className="text-burger-yellow font-display font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={clearCart}
              className="text-gray-500 hover:text-burger-red text-sm transition-colors"
            >
              Clear Cart
            </motion.button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-28 h-fit"
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-display font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (8%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery</span>
                  <span className="text-burger-green">Free</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-display font-semibold text-lg">Total</span>
                  <span className="text-2xl font-display font-bold text-burger-yellow">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-warm text-white font-semibold rounded-xl shadow-lg shadow-burger-orange/25 flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Free delivery on orders over $25
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
