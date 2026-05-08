import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const ingredients = [
  { name: 'bun-top', color: 'bg-gradient-to-b from-amber-500 to-amber-700', width: 'w-48', height: 'h-14', rounded: 'rounded-t-[3rem]' },
  { name: 'lettuce', color: 'bg-gradient-to-r from-green-500 to-green-600', width: 'w-52', height: 'h-5', rounded: 'rounded-full' },
  { name: 'tomato', color: 'bg-gradient-to-r from-red-500 to-red-600', width: 'w-44', height: 'h-4', rounded: 'rounded-md' },
  { name: 'cheese', color: 'bg-gradient-to-r from-yellow-400 to-yellow-500', width: 'w-48', height: 'h-3', rounded: 'rounded-sm' },
  { name: 'onion', color: 'bg-gradient-to-r from-purple-400 to-purple-500', width: 'w-46', height: 'h-3', rounded: 'rounded-full' },
  { name: 'patty', color: 'bg-gradient-to-b from-amber-900 to-amber-950', width: 'w-48', height: 'h-10', rounded: 'rounded-xl' },
  { name: 'sauce', color: 'bg-gradient-to-r from-orange-200 to-orange-300', width: 'w-44', height: 'h-3', rounded: 'rounded-full' },
  { name: 'bun-bottom', color: 'bg-gradient-to-b from-amber-700 to-amber-800', width: 'w-48', height: 'h-10', rounded: 'rounded-b-[2rem]' },
]

const IngredientFall = ({ onComplete }) => {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(true)
      setTimeout(onComplete, 800)
    }, 3500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative flex flex-col items-center">
            {ingredients.map((ing, index) => (
              <motion.div
                key={ing.name}
                className={`${ing.color} ${ing.width} ${ing.height} ${ing.rounded} shadow-lg`}
                style={{ marginBottom: '-1px' }}
                initial={{ y: -600, opacity: 0, rotate: Math.random() * 20 - 10 }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                  delay: index * 0.35,
                  mass: 1.2,
                }}
              />
            ))}

            <motion.div
              className="absolute text-center -bottom-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <h1 className="text-4xl font-black tracking-tight text-orange-500">BURGER HOUSE</h1>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IngredientFall