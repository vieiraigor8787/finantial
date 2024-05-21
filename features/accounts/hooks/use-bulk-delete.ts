import { toast } from 'sonner'
import { InferResponseType, InferRequestType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json']

export const useBulkDeleteAccount = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts['bulk-delete']['$post']({ json })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Conta excluída com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      //TODO: also invalidate summary
    },
    onError: () => {
      toast.error('Falha ao excluir conta.')
    },
  })

  return mutation
}
