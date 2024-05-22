import { z } from 'zod'
import { useNewAccount } from '@/features/accounts/hooks/use-new-accounts'
import { insertAccountSchema } from '@/db/schema'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { AccountForm } from '@/features/accounts/components/account-form'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {
  const { onClose, isOpen } = useNewAccount()

  const mutation = useCreateAccount()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
      onError: () => {
        onClose()
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova Conta</SheetTitle>
          <SheetDescription>
            Criar nova conta para controlar suas finanças.
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  )
}
