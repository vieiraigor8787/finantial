import { toast } from 'sonner'
import { InferResponseType, InferRequestType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>['json']

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions['bulk-delete']['$post']({
        json,
      })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Transação excluída com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      //TODO: also invalidate summary
    },
    onError: () => {
      toast.error('Falha ao excluir transação.')
    },
  })

  return mutation
}
