'use client'

import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Tem certeza?',
    'Você não poderá reverter esta ação'
  )
  const deleteMutation = useDeleteCategory(id)
  const { onOpen } = useOpenCategory()

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
