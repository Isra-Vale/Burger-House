import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { burgers } from '../api/burgerApi'


const AdminBurgers = () => {
  const [search, setSearch] = useState('')

  const filtered = burgers.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 pt-28"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
          <h1 className="text-4xl font-black">Manage Burgers</h1>
          <Link to="/admin/burgers/new" className="flex items-center gap-2 btn-primary">
            <Plus className="w-4 h-4" /> Add Burger
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
          <input 
            type="text" 
            placeholder="Search burgers..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 input-field sm:w-96"
          />
        </div>

        <div className="overflow-hidden glass-card">
          <table className="w-full">
            <thead className="bg-dark-900/50">
              <tr className="text-sm text-left text-gray-400">
                <th className="p-4">Burger</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((burger) => (
                <tr key={burger.id} className="transition-colors hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={burger.image} alt={burger.name} className="object-cover w-12 h-12 rounded-lg" />
                      <span className="font-semibold">{burger.name}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-burger-orange/10 text-burger-orange">{burger.category}</span></td>
                  <td className="p-4 font-bold text-burger-yellow">${burger.price}</td>
                  <td className="p-4">{burger.rating}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/burgers/edit/${burger.id}`} className="p-2 transition-colors rounded-full hover:bg-white/10 text-burger-yellow">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button className="p-2 transition-colors rounded-full hover:bg-white/10 text-burger-red">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminBurgers