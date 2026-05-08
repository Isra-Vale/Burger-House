import { Link } from 'react-router-dom'
import { Flame, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-burger-orange" />
              <span className="text-xl font-black">
                BURGER<span className="text-burger-orange">HOUSE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting the finest burgers with premium ingredients since 2020. Every bite is an experience.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-burger-orange transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-burger-orange transition-colors">Menu</Link></li>
              <li><Link to="/contact" className="hover:text-burger-orange transition-colors">Contact</Link></li>
              <li><Link to="/cart" className="hover:text-burger-orange transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-burger-orange" />
                123 Burger Lane, Food City
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-burger-orange" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-burger-orange" />
                hello@burgerhouse.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-burger-orange hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-burger-orange hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-burger-orange hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Burger House. All rights reserved. Made with hunger.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
