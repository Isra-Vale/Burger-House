import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, Clock, Flame, Check } from 'lucide-react';
import { burgers } from '../data/burgers';
import { useCart } from '../context/CartContext';
import BurgerCard from '../components/BurgerCard';

const BurgerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const burger = burgers.find((b) => b.id === parseInt(id));

  if (!burger) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Burger Not Found</h2>
          <Link to="/menu" className="text-burger-orange hover:text-burger-yellow transition-colors">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const relatedBurgers = burgers
    .filter((b) => b.category === burger.category && b.id !== burger.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(burger, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img
                src={burger.image}
                alt={burger.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burger-darker/60 via-transparent to-transparent" />
            </div>

            {/* Floating info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 left-4 right-4 flex gap-3"
            >
              <div className="flex-1 glass rounded-xl p-3 text-center">
                <Flame className="w-5 h-5 text-burger-orange mx-auto mb-1" />
                <p className="text-white text-sm font-semibold">{burger.calories}</p>
                <p className="text-gray-500 text-xs">Calories</p>
              </div>
              <div className="flex-1 glass rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 text-burger-yellow mx-auto mb-1" />
                <p className="text-white text-sm font-semibold">{burger.prepTime}</p>
                <p className="text-gray-500 text-xs">Prep Time</p>
              </div>
              <div className="flex-1 glass rounded-xl p-3 text-center">
                <Star className="w-5 h-5 text-burger-green mx-auto mb-1" />
                <p className="text-white text-sm font-semibold">{burger.rating}</p>
                <p className="text-gray-500 text-xs">Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:pt-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-burger-orange/10 text-burger-orange text-xs font-semibold rounded-full">
                {burger.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-burger-yellow fill-burger-yellow" />
                <span className="text-white text-sm font-semibold">{burger.rating}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              {burger.name}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {burger.description}
            </p>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-white font-display font-semibold text-lg mb-4">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {burger.ingredients.map((ingredient, i) => (
                  <motion.span
                    key={ingredient}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 bg-white/5 text-gray-300 text-sm rounded-xl border border-white/5"
                  >
                    {ingredient}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/5">
              <div>
                <p className="text-gray-500 text-sm mb-1">Price</p>
                <p className="text-4xl font-display font-bold text-burger-yellow">
                  ${burger.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-gray-500 text-sm mr-2">Quantity</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </motion.button>
                <span className="text-white text-xl font-semibold w-8 text-center">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                added
                  ? 'bg-burger-green text-white'
                  : 'bg-gradient-warm text-white shadow-lg shadow-burger-orange/25'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart — ${(burger.price * quantity).toFixed(2)}
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Related Burgers */}
        {relatedBurgers.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-display font-bold text-white mb-8">
              You Might Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBurgers.map((b, i) => (
                <BurgerCard key={b.id} burger={b} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerDetailsPage;
