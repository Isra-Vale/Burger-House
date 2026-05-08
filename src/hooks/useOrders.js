import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../api/orderApi'
import toast from 'react-hot-toast'

export const useOrders = () => useQuery({
  queryKey: ['orders'],
  queryFn: () => orderApi.getAll().then(r => r.data),
})

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: orderApi.create,
    onSuccess: () => { qc.invalidateQueries(['orders']); toast.success('Order placed!') },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed'),
  })
}

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => orderApi.updateStatus(id, status),
    onSuccess: () => { qc.invalidateQueries(['orders']); toast.success('Updated!') },
  })
}

export const useDeleteOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: orderApi.delete,
    onSuccess: () => { qc.invalidateQueries(['orders']); toast.success('Deleted!') },
  })
}