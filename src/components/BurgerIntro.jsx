import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ingredients = [
  {
    name: 'bun-top',
    color: '#d4a373',
    height: 60,
    shape: 'rounded-t-full rounded-b-lg',
    seeds: true,
  },
  {
    name: 'lettuce',
    color: '#70e000',
    height: 20,
    shape: 'rounded-full',
    wavy: true,
  },
  {
    name: 'tomato',
    color: '#e63946',
    height: 16,
    shape: 'rounded-lg',
  },
  {
    name: 'cheese',
    color: '#f7c948',
    height: 12,
    shape: 'rounded-sm',
    drip: true,
  },
  {
    name: 'onion',
    color: '#c77dff',
    height: 14,
    shape: 'rounded-full',
    rings: true,
  },
  {
    name: 'patty',
    color: '#6f4e37',
    height: 28,
    shape: 'rounded-xl',
    texture: true,
  },
  {
    name: 'sauce',
    color: '#e63946',
    height: 10,
    shape: 'rounded-full',
    spread: true,
  },
  {
    name: 'bun-bottom',
    color: '#d4a373',
    height: 30,
    shape: 'rounded-t-sm rounded-b-xl',
  },
];

const BurgerIntro = ({ onComplete }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIngredients(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (completedIngredients === ingredients.length) {
      const timer = setTimeout(() => {
        setShowContent(true);
        setTimeout(onComplete, 1000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [completedIngredients, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-burger-darker flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Burger Stack */}
            <div className="relative w-64 sm:w-80 flex flex-col items-center">
              {ingredients.map((ingredient, index) => (
                <AnimatePresence key={ingredient.name}>
                  {showIngredients && (
                    <motion.div
                      initial={{ y: -600, opacity: 0, rotate: Math.random() * 20 - 10 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.4,
                        },
                      }}
                      onAnimationComplete={() => {
                        setCompletedIngredients((prev) => prev + 1);
                      }}
                      className={`w-full flex justify-center ${index > 0 ? '-mt-1' : ''}`}
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          delay: index * 0.4 + 0.5,
                          duration: 0.3,
                          times: [0, 0.5, 1],
                        }}
                        className={`relative ${ingredient.shape}`}
                        style={{
                          width: ingredient.name.includes('bun') ? '85%' : '80%',
                          height: ingredient.height,
                          backgroundColor: ingredient.color,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        }}
                      >
                        {/* Bun top seeds */}
                        {ingredient.seeds && (
                          <div className="absolute inset-0 flex items-start justify-center pt-2 gap-3">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1 bg-yellow-200/60 rounded-full"
                                style={{ transform: `translateY(${i % 2 * 4}px)` }}
                              />
                            ))}
                          </div>
                        )}
                        {/* Lettuce waves */}
                        {ingredient.wavy && (
                          <div className="absolute -top-1 left-0 right-0 flex justify-between">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: ingredient.color }}
                              />
                            ))}
                          </div>
                        )}
                        {/* Cheese drip */}
                        {ingredient.drip && (
                          <div className="absolute bottom-0 left-4 w-3 h-5 rounded-b-full" style={{ backgroundColor: ingredient.color }} />
                        )}
                        {/* Onion rings */}
                        {ingredient.rings && (
                          <div className="absolute inset-0 flex items-center justify-center gap-1">
                            <div className="w-full h-0.5 bg-purple-300/40 rounded-full" />
                          </div>
                        )}
                        {/* Patty texture */}
                        {ingredient.texture && (
                          <div className="absolute inset-0 flex items-center justify-center gap-4">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="w-8 h-0.5 bg-black/10 rounded-full" />
                            ))}
                          </div>
                        )}
                        {/* Sauce spread */}
                        {ingredient.spread && (
                          <div className="absolute -top-2 left-2 right-2 h-4 rounded-full" style={{ backgroundColor: ingredient.color, opacity: 0.6 }} />
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 text-burger-orange font-display text-lg tracking-widest uppercase"
            >
              Building Your Burger
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: completedIngredients / ingredients.length }}
              className="mt-4 w-48 h-1 bg-gradient-warm rounded-full origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerIntro;
