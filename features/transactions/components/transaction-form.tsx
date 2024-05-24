import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { insertTransactionSchema } from '@/db/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Select } from '@/components/select'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  date: z.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
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
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma conta"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma categoria"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pagamento</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Adicionar pagamento"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ''}
                  disabled={disabled}
                  placeholder="comentarios adicionais"
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
