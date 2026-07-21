import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from './TagInput'

const meta = {
  title: 'Inputs/TagInput',
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component:
          'Chips-in-input for editing a list of short string tags. Type a value and press Enter to add it as a chip; click × or press Backspace on an empty input to remove the last one. Autocompletes from `suggestions`. The web counterpart of the native `TagInput`. Controlled via `value` / `onChange`; chips use the active accent.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { value: [], onChange: () => {} },
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

function Controlled({
  initial = [],
  ...props
}: { initial?: string[] } & Partial<React.ComponentProps<typeof TagInput>>) {
  const [value, setValue] = useState<string[]>(initial)
  return (
    <div style={{ maxWidth: 360 }}>
      <TagInput value={value} onChange={setValue} {...props} />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled initial={['fiction', 'draft']} placeholder="Add a tag…" />,
}

export const WithSuggestions: Story = {
  render: () => (
    <Controlled
      placeholder="Type 'f'…"
      suggestions={['fiction', 'fantasy', 'folklore', 'draft', 'archived']}
    />
  ),
}

export const Disabled: Story = {
  render: () => <Controlled initial={['locked', 'read-only']} disabled />,
}
