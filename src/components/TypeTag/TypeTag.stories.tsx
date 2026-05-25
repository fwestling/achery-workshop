import type { Meta, StoryObj } from '@storybook/react'
import { TypeTag } from './TypeTag'

const meta: Meta<typeof TypeTag> = {
  title: 'Components/TypeTag',
  component: TypeTag,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof TypeTag>

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <TypeTag type="basic" />
      <TypeTag type="internal" />
      <TypeTag type="exceptional" />
      <TypeTag type="fee" />
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <TypeTag type="basic" />
      <TypeTag type="internal" />
      <TypeTag type="exceptional" />
      <TypeTag type="fee" />
    </div>
  ),
}
