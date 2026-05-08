import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { burgerApi } from '../api/burgerApi'
import toast from 'react-hot-toast'

export const useBurgers = (filters) => useQuery({
  queryKey: ['burgers', filters],
  queryFn: () => burgerApi.getAll(filters).then(r => r.data),
})

export const useBurger = (id) => useQuery({
  queryKey: ['burger', id],
  queryFn: () => burgerApi.getById(id).then(r => r.data),
  enabled: !!id,
})

export const useCreateBurger = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: burgerApi.create,
    onSuccess: () => { qc.invalidateQueries(['burgers']); toast.success('Burger created!') },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed'),
  })
}

export const useUpdateBurger = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => burgerApi.update(id, data),
    onSuccess: (_, v) => { qc.invalidateQueries(['burgers']); qc.invalidateQueries(['burger', v.id]); toast.success('Updated!') },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed'),
  })
}

export const useDeleteBurger = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: burgerApi.delete,
    onSuccess: () => { qc.invalidateQueries(['burgers']); toast.success('Deleted!') },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed'),
  })
}