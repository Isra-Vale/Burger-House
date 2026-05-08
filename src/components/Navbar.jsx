import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ShoppingCart, Flame, User, LogOut, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { items } = useCart()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setProfileOpen(false) }, [location])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/contact', label: 'Contact' },
  ]

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <Flame className="w-8 h-8 transition-colors text-burger-orange group-hover:text-burger-yellow" />
              <span className="text-2xl font-black tracking-tight">BURGER<span className="text-burger-orange">HOUSE</span></span>
            </Link>

            <div className="items-center hidden gap-8 md:flex">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`relative text-sm font-medium uppercase tracking-wider transition-colors ${location.pathname === link.path ? 'text-burger-orange' : 'text-gray-300 hover:text-white'}`}>
                  {link.label}
                  {location.pathname === link.path && <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-burger-orange" layoutId="navbar-underline" />}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors text-burger-yellow hover:text-burger-orange">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 transition-colors rounded-full hover:bg-white/10">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <motion.span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-burger-red"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount}>{cartCount}</motion.span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-2 transition-colors rounded-full hover:bg-white/10">
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-br from-burger-orange to-burger-red">{user?.name?.[0] || 'U'}</div>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div className="absolute right-0 w-48 mt-2 overflow-hidden border shadow-xl top-full bg-dark-800 border-white/10 rounded-xl"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}>
                        <div className="p-3 border-b border-white/5">
                          <p className="text-sm font-semibold">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"><User className="w-4 h-4" /> Profile</Link>
                        {isAdmin && <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-burger-yellow"><Shield className="w-4 h-4" /> Admin</Link>}
                        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-burger-red"><LogOut className="w-4 h-4" /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden px-4 py-2 text-sm sm:block btn-primary">Sign In</Link>
              )}
              <button className="p-2 transition-colors rounded-full md:hidden hover:bg-white/10" onClick={() => setMobileOpen(true)}><Menu className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} links={navLinks} />}</AnimatePresence>
    </>
  )
}
export default Navbar