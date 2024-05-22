import { toast } from 'sonner'
import { InferResponseType, InferRequestType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const res = await client.api.accounts[':id']['$delete']({
        param: { id },
      })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Conta excluída.')
      queryClient.invalidateQueries({ queryKey: ['account', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Falha ao excluir conta.')
    },
  })

  return mutation
}
