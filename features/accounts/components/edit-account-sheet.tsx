import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { insertAccountSchema } from '@/db/schema'
import { AccountForm } from '@/features/accounts/components/account-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useEditAccount } from '@/features/accounts/hooks/use-edit-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {
  const { onClose, isOpen, id } = useOpenAccount()

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id)

  const isPending = editMutation.isPending

  const isLoading = accountQuery.isLoading

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
      onError: () => {
        onClose()
      },
    })
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Editar Conta</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
