import { motion } from 'framer-motion'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 pt-28"
    >
      <div className="max-w-2xl px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-black">My Profile</h1>
        
        <div className="p-8 glass-card">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full bg-gradient-to-br from-burger-orange to-burger-red">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
              {user?.role === 'admin' && (
                <span className="inline-flex items-center gap-1 mt-1 text-sm text-burger-yellow">
                  <Shield className="w-4 h-4" /> Administrator
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-dark-900 rounded-xl">
              <User className="w-5 h-5 text-burger-orange" />
              <div><p className="text-sm text-gray-400\">Full Name</p><p className="font-semibold\">{user?.name}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-dark-900 rounded-xl">
              <Mail className="w-5 h-5 text-burger-orange" />
              <div><p className="text-sm text-gray-400\">Email</p><p className="font-semibold\">{user?.email}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-dark-900 rounded-xl">
              <Calendar className="w-5 h-5 text-burger-orange" />
              <div><p className="text-sm text-gray-400">Member Since</p><p className="font-semibold">{new Date().toLocaleDateString()}</p></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile