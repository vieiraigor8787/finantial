import { Hono } from 'hono'
import { clerkMiddleware } from '@hono/clerk-auth'

import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { useAuth } from '@clerk/nextjs'

const app = new Hono().get('/', clerkMiddleware(), async (c) => {
  const auth = useAuth()

  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)

  return c.json({ data })
})

export default app
