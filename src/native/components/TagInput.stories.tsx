import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { TagInput } from './TagInput'

const meta = {
  title: 'Native/TagInput',
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component:
          'Tags as chips inside the field, with suggestions. Comma, space or return confirms a tag (`separators` changes which characters do); backspace on an empty field removes the last.',
      },
    },
  },
} satisfies Meta<typeof TagInput>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const Demo = ({ initial, disabled }: { initial: string[]; disabled?: boolean }) => {
  const [tags, setTags] = useState(initial)
  return (
    <View style={{ maxWidth: 360 }}>
      <TagInput
        value={tags}
        onChange={setTags}
        suggestions={['ink', 'pigment', 'binding', 'paper', 'gilding']}
        placeholder="Add a tag"
        {...(disabled ? { disabled } : {})}
      />
    </View>
  )
}

export const Default: Story = { render: () => <Demo initial={['ink', 'pigment']} /> }

export const Empty: Story = { render: () => <Demo initial={[]} /> }

export const Disabled: Story = { render: () => <Demo initial={['ink']} disabled /> }

const PhrasesDemo = () => {
  const [tags, setTags] = useState(['the Captain'])
  return (
    <View style={{ maxWidth: 360 }}>
      <TagInput value={tags} onChange={setTags} separators={[',']} normalize={(raw) => raw.trim()} placeholder="Add an alias" />
    </View>
  )
}

/** Phrases as tags: only a comma or return confirms, so a space stays in the tag. */
export const Phrases: Story = { render: () => <PhrasesDemo /> }
