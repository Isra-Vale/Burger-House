import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { registerSchema } from '../validations/authSchema'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register: registerUser } = useAuth()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    await registerUser(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen px-4 pt-20"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-black">Create Account</h1>
          <p className="text-gray-400">Join the Burger House family</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 glass-card">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Name</label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
              <input {...register('name')} className={`input-field pl-10 ${errors.name ? 'input-error' : ''}`} placeholder="John Doe" />
            </div>
            {errors.name && <p className="mt-1 text-sm text-burger-red">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Email</label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
              <input {...register('email')} type="email" className={`input-field pl-10 ${errors.email ? 'input-error' : ''}`} placeholder="you@example.com" />
            </div>
            {errors.email && <p className="mt-1 text-sm text-burger-red">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
              <input {...register('password')} type={showPassword ? 'text' : 'password'} className={`input-field pl-10 pr-10 ${errors.password ? 'input-error' : ''}`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-white">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-burger-red">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2" />
              <input {...register('confirmPassword')} type="password" className={`input-field pl-10 ${errors.confirmPassword ? 'input-error' : ''}`} placeholder="••••••••" />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-burger-red">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full gap-2 btn-primary">
            {isSubmitting ? <Spinner size="sm" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="transition-colors text-burger-orange hover:text-burger-yellow">Sign in</Link>
          </p>
        </form>
      </div>
    </motion.div>
  )
}

export default Register