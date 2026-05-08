import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Truck, Shield, ChevronRight, Quote } from 'lucide-react';
import { burgers, testimonials } from '../data/burgers';
import BurgerCard from '../components/BurgerCard';

const HomePage = () => {
  const featuredBurgers = burgers.slice(0, 4);

  const features = [
    { icon: Clock, title: 'Fast Delivery', desc: '30 min or less guaranteed' },
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $25' },
    { icon: Shield, title: 'Fresh Quality', desc: 'Premium ingredients daily' },
    { icon: Star, title: 'Top Rated', desc: '4.8+ average rating' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-burger-darker">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(247,201,72,0.1)_0%,_transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-burger-orange/10 border border-burger-orange/20 rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-burger-orange rounded-full animate-pulse" />
                <span className="text-burger-orange text-sm font-medium">Now Delivering in Your Area</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-6">
                Fresh Burgers{' '}
                <span className="text-gradient">Delivered</span>{' '}
                Fast
              </h1>

              <p className="text-gray-400 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
                Handcrafted with premium ingredients, grilled to perfection, and delivered hot to your door. Experience burger excellence today.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-warm text-white font-semibold rounded-2xl shadow-lg shadow-burger-orange/25 hover:shadow-burger-orange/40 transition-shadow"
                  >
                    Order Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-colors"
                  >
                    View Menu
                  </motion.button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '4.9', label: 'Average Rating' },
                  { value: '25min', label: 'Avg Delivery' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <p className="text-2xl sm:text-3xl font-display font-bold text-white">{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
                    alt="Delicious Burger"
                    className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-burger-orange/20"
                  />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-burger-darker border border-white/10 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-burger-green/20 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-burger-green" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Top Rated</p>
                      <p className="text-gray-500 text-xs">#1 in City</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-burger-darker border border-white/10 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-burger-orange/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-burger-orange" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Fast Delivery</p>
                      <p className="text-gray-500 text-xs">Under 30 min</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-burger-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-burger-orange" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{feature.title}</p>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Burgers */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-burger-orange text-sm font-semibold tracking-wider uppercase">Our Menu</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
              Featured Burgers
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Handpicked favorites that our customers can't stop raving about. Try them today!
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBurgers.map((burger, i) => (
              <BurgerCard key={burger.id} burger={burger} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-colors"
              >
                View Full Menu
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-burger-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-burger-orange text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Don't just take our word for it. Here's what burger lovers around the city are saying.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="relative bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-burger-orange/20 transition-all"
              >
                <Quote className="w-10 h-10 text-burger-orange/20 mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-burger-yellow fill-burger-yellow" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-burger-orange/20 to-burger-yellow/10 border border-burger-orange/20 p-12 sm:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.1)_0%,_transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Ready to Order?
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Get your favorite burger delivered in under 30 minutes. Fresh, hot, and delicious.
              </p>
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 bg-gradient-warm text-white font-semibold rounded-2xl shadow-lg shadow-burger-orange/25"
                >
                  Start Ordering
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
