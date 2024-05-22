import { z } from 'zod'

import { insertCategorySchema } from '@/db/schema'
import { CategoryForm } from '@/features/categories/components/category-form'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useCreateCategory } from '@/features/categories/api/use-create-category'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertCategorySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {
  const { onClose, isOpen } = useNewCategory()

  const mutation = useCreateCategory()

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
          <SheetTitle>Nova Categoria</SheetTitle>
          <SheetDescription>Criar nova categoria de contas.</SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  )
}
