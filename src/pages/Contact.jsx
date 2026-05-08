import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contactSchema } from '../validations/authSchema'
import { contactApi } from '../api/contactApi'
import toast from 'react-hot-toast'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await contactApi.send(data)
      setSubmitted(true)
      toast.success('Message sent!')
      setTimeout(() => { setSubmitted(false); reset() }, 3000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="min-h-screen pb-20 pt-28">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black">Get In Touch</h1>
          <p className="text-lg text-gray-400">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="p-8 mb-8 glass-card">
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Address', value: '123 Burger Lane, Food City, FC 12345' },
                  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
                  { icon: Mail, label: 'Email', value: 'hello@burgerhouse.com' },
                  { icon: Clock, label: 'Hours', value: 'Mon-Sun: 10AM - 11PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 bg-burger-orange/10 rounded-xl"><item.icon className="w-5 h-5 text-burger-orange" /></div>
                    <div><h3 className="text-sm font-semibold text-gray-400">{item.label}</h3><p className="text-white">{item.value}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 overflow-hidden glass-card">
              <div className="absolute inset-0 flex items-center justify-center bg-dark-700">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-burger-orange" />
                  <p className="text-gray-400">Google Maps Placeholder</p>
                  <p className="mt-1 text-sm text-gray-600">123 Burger Lane, Food City</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 glass-card">
              <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
              <div className="space-y-6">
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-400">{field.label}</label>
                    <input {...register(field.name)} type={field.type} className={`input-field ${errors[field.name] ? 'input-error' : ''}`} placeholder={field.placeholder} />
                    {errors[field.name] && <p className="flex items-center gap-1 mt-1 text-sm text-burger-red"><AlertCircle className="w-3 h-3" /> {errors[field.name].message}</p>}
                  </div>
                ))}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-400">Message</label>
                  <textarea {...register('message')} rows={4} className={`input-field resize-none ${errors.message ? 'input-error' : ''}`} placeholder="Tell us what's on your mind..." />
                  {errors.message && <p className="flex items-center gap-1 mt-1 text-sm text-burger-red"><AlertCircle className="w-3 h-3" /> {errors.message.message}</p>}
                </div>
                <motion.button type="submit" disabled={isSubmitting || submitted}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${submitted ? 'bg-green-500 text-white' : 'bg-burger-orange text-white hover:bg-burger-yellow hover:text-dark-900'} disabled:opacity-50`}
                  whileHover={!submitted && !isSubmitting ? { scale: 1.02 } : {}} whileTap={!submitted && !isSubmitting ? { scale: 0.98 } : {}}>
                  {submitted ? <><CheckCircle className="w-5 h-5" /> Message Sent!</> : isSubmitting ? <><div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
export default Contact