import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Beef, ShoppingBag, Users, DollarSign, TrendingUp, Package } from 'lucide-react'
import { burgers } from '../api/burgerApi'


const AdminDashboard = () => {
  const stats = [
    { label: 'Total Burgers', value: burgers.length, icon: Beef, color: 'text-burger-orange' },
    { label: 'Total Orders', value: 156, icon: ShoppingBag, color: 'text-burger-yellow' },
    { label: 'Total Users', value: 89, icon: Users, color: 'text-green-400' },
    { label: 'Revenue', value: '$12,450', icon: DollarSign, color: 'text-burger-red' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 pt-28"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <Link to="/admin/burgers" className="btn-primary">Manage Burgers</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 glass-card"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="p-6 glass-card">
            <h2 className="mb-4 text-xl font-bold">Recent Orders</h2>
            <div className="space-y-3">
              {[
                { id: '#1234', customer: 'John Doe', total: '$45.98', status: 'Delivered' },
                { id: '#1235', customer: 'Jane Smith', total: '$32.50', status: 'Preparing' },
                { id: '#1236', customer: 'Mike Johnson', total: '$67.20', status: 'On the way' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-dark-900">
                  <div>
                    <p className="text-sm font-semibold">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{order.total}</p>
                    <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-400' : order.status === 'Preparing' ? 'text-burger-yellow' : 'text-burger-orange'}`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 glass-card">
            <h2 className="mb-4 text-xl font-bold">Top Selling Burgers</h2>
            <div className="space-y-3">
              {burgers.slice(0, 4).map((burger, i) => (
                <div key={burger.id} className="flex items-center gap-3 p-3 rounded-lg bg-dark-900">
                  <span className="text-2xl font-black text-burger-orange">#{i + 1}</span>
                  <img src={burger.image} alt={burger.name} className="object-cover w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{burger.name}</p>
                    <p className="text-xs text-gray-400">{burger.category}</p>
                  </div>
                  <p className="font-bold text-burger-yellow">${burger.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard