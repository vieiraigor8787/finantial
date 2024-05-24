import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { insertTransactionSchema } from '@/db/schema'

const formSchema = z.object({
  date: z.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  types: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: ApiFormValues) => void
  onDelete?: () => void
  disabled?: boolean
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void
}

export const TransactionForm = ({
  onDelete,
  id,
  disabled,
  defaultValues,
  onSubmit,
  onCreateCategory,
  onCreateAccount,
  categoryOptions,
  accountOptions,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="p.ex. mercado, luz, aluguel, gasolina..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full mt-4" disabled={disabled}>
          {id ? 'Salvar alterações' : 'Criar transação'}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full mt-4"
            variant="outline"
          >
            <Trash className="size-4 mr-4" />
            Deletar conta
          </Button>
        )}
      </form>
    </Form>
  )
}
