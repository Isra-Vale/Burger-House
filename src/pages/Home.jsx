import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Clock, Award } from 'lucide-react'
import { testimonials } from '../data/burgers'
import { burgers } from '../api/burgerApi'
import BurgerCard from '../components/BurgerCard'
import TestimonialCard from '../components/TestimonialCard'

const Home = () => {
  const featuredBurgers = burgers.slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-burger-orange/10 via-dark-900 to-dark-900" />

        <div className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-burger-orange/10 text-burger-orange text-sm font-semibold mb-6 border border-burger-orange/20">
              🔥 Now Delivering Nationwide
            </span>
            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">
              Fresh Burgers
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-burger-orange via-burger-yellow to-burger-red">
                Delivered Fast
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-gray-400">
              Sink your teeth into premium, handcrafted burgers made with 100% fresh ingredients. 
              From our kitchen to your door in under 30 minutes.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/menu" className="inline-flex items-center gap-2 text-lg btn-primary">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="inline-flex items-center gap-2 text-lg btn-secondary">
                View Menu
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid max-w-3xl grid-cols-1 gap-8 mx-auto mt-20 sm:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Truck, label: 'Free Delivery', desc: 'On orders over $25' },
              { icon: Clock, label: '30 Min Delivery', desc: 'Or your meal is free' },
              { icon: Award, label: 'Top Rated', desc: '4.9/5 from 10k+ reviews' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <item.icon className="w-6 h-6 text-burger-orange" />
                </div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-dark-800/50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black">Fan Favorites</h2>
            <p className="text-gray-400">Our most loved burgers, handpicked for you</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBurgers.map((burger, index) => (
              <BurgerCard key={burger.id} burger={burger} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/menu" className="inline-flex items-center gap-2 btn-secondary">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black">What People Say</h2>
            <p className="text-gray-400">Real reviews from real burger lovers</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <TestimonialCard key={t.id} testimonial={t} index={index} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
