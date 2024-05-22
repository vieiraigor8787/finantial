import { toast } from 'sonner'
import { InferResponseType, InferRequestType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)[':id']['$patch']
>['json']

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts[':id']['$patch']({
        json,
        param: { id },
      })
      return await res.json()
    },

    onSuccess: () => {
      toast.success('Conta atualizada.')
      queryClient.invalidateQueries({ queryKey: ['account', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Falha ao atualizar conta.')
    },
  })

  return mutation
}
