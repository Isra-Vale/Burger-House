import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Burger Lane', 'Food City, FC 12345'],
      color: 'bg-burger-orange/10 text-burger-orange',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-BURG', '(555) 123-2874'],
      color: 'bg-burger-yellow/10 text-burger-yellow',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@burgerhouse.com', 'support@burgerhouse.com'],
      color: 'bg-burger-green/10 text-burger-green',
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: ['Mon-Thu: 11AM - 10PM', 'Fri-Sat: 11AM - 12AM', 'Sun: 12PM - 9PM'],
      color: 'bg-purple-500/10 text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-burger-orange text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a question, feedback, or want to place a large order? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-display font-semibold mb-2">{info.title}</h3>
              {info.details.map((detail, j) => (
                <p key={j} className="text-gray-400 text-sm">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/5"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-burger-green mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-center">We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-burger-orange/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-burger-orange/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-burger-orange/50 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-burger-orange/50 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-warm text-white font-semibold rounded-xl shadow-lg shadow-burger-orange/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 h-full min-h-[400px]"
          >
            <div className="w-full h-full bg-burger-dark relative flex items-center justify-center">
              {/* Stylized Map Placeholder */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <rect width="400" height="400" fill="#1a1a1a" />
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <line x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="#333" strokeWidth="0.5" />
                      <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#333" strokeWidth="0.5" />
                    </React.Fragment>
                  ))}
                  <path d="M0 200 Q100 180 200 200 T400 200" stroke="#444" strokeWidth="4" fill="none" />
                  <path d="M200 0 Q180 100 200 200 T200 400" stroke="#444" strokeWidth="4" fill="none" />
                  <path d="M0 100 Q200 120 400 100" stroke="#444" strokeWidth="2" fill="none" />
                  <path d="M100 0 Q120 200 100 400" stroke="#444" strokeWidth="2" fill="none" />
                  <path d="M300 0 Q280 200 300 400" stroke="#444" strokeWidth="2" fill="none" />
                  <path d="M0 300 Q200 280 400 300" stroke="#444" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 bg-burger-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-burger-orange/40">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-display font-semibold text-lg">Burger House</h3>
                <p className="text-gray-400 text-sm">123 Burger Lane, Food City</p>
                <p className="text-burger-orange text-sm mt-1">Get Directions</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
