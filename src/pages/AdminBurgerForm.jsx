import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { burgerSchema } from '../validations/burgerSchema'
import { burgers } from '../api/burgerApi'


const AdminBurgerForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const burger = isEdit ? burgers.find(b => b.id === Number(id)) : null

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(burgerSchema),
    defaultValues: burger || {
      name: '', category: 'Beef', price: '', rating: 5, description: '', image: '', ingredients: ''
    }
  })

  const onSubmit = async (data) => {
    console.log('Submitting:', data)
    // TODO: API call
    navigate('/admin/burgers')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 pt-28"
    >
      <div className="max-w-2xl px-4 mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-gray-400 transition-colors hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="mb-8 text-4xl font-black">{isEdit ? 'Edit Burger' : 'Add New Burger'}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 glass-card">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Name</label>
            <input {...register('name')} className={`input-field ${errors.name ? 'input-error' : ''}`} />
            {errors.name && <p className="mt-1 text-sm text-burger-red">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">Category</label>
              <select {...register('category')} className="input-field">
                <option value="Beef">Beef</option>
                <option value="Chicken">Chicken</option>
                <option value="Veggie">Veggie</option>
                <option value="Combo">Combo</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">Price</label>
              <input {...register('price')} type="number" step="0.01" className={`input-field ${errors.price ? 'input-error' : ''}`} />
              {errors.price && <p className="mt-1 text-sm text-burger-red">{errors.price.message}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Rating (0-5)</label>
            <input {...register('rating')} type="number" step="0.1" min="0" max="5" className="input-field" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Image URL</label>
            <input {...register('image')} className={`input-field ${errors.image ? 'input-error' : ''}`} placeholder="https://..." />
            {errors.image && <p className="mt-1 text-sm text-burger-red">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Description</label>
            <textarea {...register('description')} rows={3} className={`input-field resize-none ${errors.description ? 'input-error' : ''}`} />
            {errors.description && <p className="mt-1 text-sm text-burger-red">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Ingredients (comma separated)</label>
            <input {...register('ingredients')} className={`input-field ${errors.ingredients ? 'input-error' : ''}`} placeholder="Beef, Cheese, Lettuce..." />
            {errors.ingredients && <p className="mt-1 text-sm text-burger-red">{errors.ingredients.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full gap-2 btn-primary">
            <Save className="w-4 h-4" /> {isEdit ? 'Update Burger' : 'Create Burger'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default AdminBurgerForm