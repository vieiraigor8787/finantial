import { toast } from 'sonner'
import { InferResponseType, InferRequestType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const res = await client.api.categories[':id']['$delete']({
        param: { id },
      })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Categoria excluída.')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: () => {
      toast.error('Falha ao excluir categoria.')
    },
  })

  return mutation
}
