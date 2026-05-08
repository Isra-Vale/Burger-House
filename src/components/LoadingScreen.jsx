import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-dark-700" />
        <div className="absolute inset-0 rounded-full border-4 border-burger-orange border-t-transparent" />
      </motion.div>
      <motion.h2
        className="mt-6 text-2xl font-bold text-burger-orange"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Burger House
      </motion.h2>
      <p className="mt-2 text-gray-400 text-sm">Preparing your feast...</p>
    </motion.div>
  )
}

export default LoadingScreen
