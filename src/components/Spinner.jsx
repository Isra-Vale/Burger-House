import { motion } from 'framer-motion'

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' }
  return (
    <motion.div className={`${sizes[size]} ${className}`} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
      <div className="w-full h-full border-4 rounded-full border-dark-700 border-t-burger-orange" />
    </motion.div>
  )
}
export default Spinner