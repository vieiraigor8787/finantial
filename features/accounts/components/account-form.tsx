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
import { insertAccountSchema } from '@/db/schema'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export const AccountForm = ({
  onDelete,
  id,
  disabled,
  defaultValues,
  onSubmit,
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
          {id ? 'Salvar alterações' : 'Criar conta'}
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
