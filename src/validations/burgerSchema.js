import { z } from 'zod'

export const burgerSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['Beef', 'Chicken', 'Veggie', 'Combo']),
  price: z.coerce.number().min(0.01),
  rating: z.coerce.number().min(0).max(5),
  description: z.string().min(10).max(500),
  image: z.string().url().optional().or(z.literal('')),
  ingredients: z.string().min(3),
})