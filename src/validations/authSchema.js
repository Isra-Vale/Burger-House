import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name too short').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name too short').max(50),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject too short').max(100),
  message: z.string().min(10, 'Message too short').max(1000),
})