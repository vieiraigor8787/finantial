import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { insertAccountSchema } from '@/db/schema'
import { useConfirm } from '@/hooks/use-confirm'

import { AccountForm } from '@/features/accounts/components/account-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'

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

  const [ConfirmDialog, confirm] = useConfirm(
    'Tem certeza?',
    'Você não poderá reverter esta ação.'
  )

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)

  const isPending = editMutation.isPending || deleteMutation.isPending

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

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        },
      })
    }
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <>
      <ConfirmDialog />
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
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
