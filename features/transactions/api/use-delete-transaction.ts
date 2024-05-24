import { toast } from 'sonner'
import { InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$delete']
>

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const res = await client.api.transactions[':id']['$delete']({
        param: { id },
      })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Transação excluída.')
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: () => {
      toast.error('Falha ao excluir transação.')
    },
  })

  return mutation
}
