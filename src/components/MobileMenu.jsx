import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Shield, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MobileMenu = ({ onClose, links }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  return (
    <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="absolute top-0 bottom-0 right-0 shadow-2xl w-72 bg-dark-800"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
        <div className="p-6">
          <button onClick={onClose} className="block p-2 ml-auto rounded-full hover:bg-white/10"><X className="w-6 h-6" /></button>
          {isAuthenticated && (
            <div className="p-4 mt-4 mb-4 bg-white/5 rounded-xl">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}
          <nav className="flex flex-col gap-1 mt-4">
            {links.map((link, index) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                <Link to={link.path} className="block py-3 text-lg font-medium text-gray-300 transition-colors border-b hover:text-burger-orange border-white/5">{link.label}</Link>
              </motion.div>
            ))}
            {isAdmin && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Link to="/admin" className="flex items-center gap-2 py-3 text-lg font-medium transition-colors border-b text-burger-yellow hover:text-burger-orange border-white/5"><Shield className="w-5 h-5" /> Admin</Link>
              </motion.div>
            )}
            {isAuthenticated ? (
              <>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <Link to="/profile" className="flex items-center gap-2 py-3 text-lg font-medium text-gray-300 transition-colors border-b hover:text-burger-orange border-white/5"><User className="w-5 h-5" /> Profile</Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <button onClick={logout} className="flex items-center gap-2 py-3 text-lg font-medium transition-colors text-burger-red"><LogOut className="w-5 h-5" /> Logout</button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Link to="/login" className="block py-3 text-lg font-medium transition-colors border-b text-burger-orange hover:text-burger-yellow border-white/5">Sign In</Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <Link to="/register" className="block py-3 text-lg font-medium text-gray-300 transition-colors hover:text-burger-orange">Create Account</Link>
                </motion.div>
              </>
            )}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default MobileMenu