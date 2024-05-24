'use client'

import { useMemo } from 'react'
import { SingleValue } from 'react-select'
import CreateTableSelect from 'react-select/creatable'

type Props = {
  onChange: (value?: string) => void
  onCreate?: (value: string) => void
  options?: { label: string; value: string }[]
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
}

export const Select = ({
  value,
  placeholder,
  onCreate,
  options = [],
  onChange,
  disabled,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value)
  }

  const formatedValue = useMemo(() => {
    return options.find((opt) => opt.value === value)
  }, [options, value])

  return (
    <CreateTableSelect
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
      }}
      value={formatedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  )
}
