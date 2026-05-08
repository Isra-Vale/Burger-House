import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-card p-6 relative"
    >
      <Quote className="w-8 h-8 text-burger-orange/20 absolute top-4 right-4" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-burger-yellow fill-burger-yellow' : 'text-gray-600'}`}
          />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burger-orange to-burger-red flex items-center justify-center text-white font-bold">
          {testimonial.name[0]}
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
