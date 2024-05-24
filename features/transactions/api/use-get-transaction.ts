import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['transaction', { id }],
    queryFn: async () => {
      //RPC
      const res = await client.api.transactions[':id'].$get({
        param: { id },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch transaction')
      }

      const { data } = await res.json()

      return data
    },
  })
  return query
}
