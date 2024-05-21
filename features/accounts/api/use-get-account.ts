import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['accounts', { id }],
    queryFn: async () => {
      //RPC
      const res = await client.api.accounts[':id'].$get({
        param: { id },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch accounts')
      }

      const { data } = await res.json()

      return data
    },
  })
  return query
}
