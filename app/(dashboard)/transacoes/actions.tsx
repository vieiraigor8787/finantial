'use client'

import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Tem certeza?',
    'Você não poderá reverter esta ação'
  )
  const deleteMutation = useDeleteAccount(id)
  const { onOpen } = useOpenAccount()

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) deleteMutation.mutate()
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
