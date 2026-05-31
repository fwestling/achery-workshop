import type { Meta, StoryObj } from '@storybook/react'
import { MaterialCard } from './MaterialCard'
import { Body } from '../Typography/Typography'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { Button } from '../Button/Button'

const meta = {
  title: 'Layout/MaterialCard',
  component: MaterialCard,
  parameters: {
    docs: {
      description: {
        component:
          'A contained surface wearing the project\'s material signature. Use for modals, dialogs, featured cards, and receipts — objects that *arrive*. ' +
          'Set the signature via the Material toolbar picker (or `<AcheryProvider defaultMaterial="leather|wood|copper">`); control intensity per object with the `intensity` prop.',
      },
    },
  },
  argTypes: {
    intensity: { control: 'select', options: ['chrome', 'surface', 'full'] },
  },
} satisfies Meta<typeof MaterialCard>

export default meta
type Story = StoryObj<typeof meta>

const exampleFooter = (
  <>
    <Button variant="primary">Bind &amp; archive</Button>
    <Button variant="ghost">Not yet</Button>
  </>
)

export const Chrome: Story = {
  args: {
    intensity: 'chrome',
    header: 'Bound & filed',
    footer: exampleFooter,
    children: (
      <>
        <Eyebrow>November · sealed</Eyebrow>
        <Body>38 entries · balance 1,284.40</Body>
      </>
    ),
  },
}

export const Surface: Story = {
  args: {
    intensity: 'surface',
    header: 'Close the month',
    footer: exampleFooter,
    children: (
      <>
        <Eyebrow>November · ready to bind</Eyebrow>
        <Body>
          Seal the ledger and file it to the archive. Once bound, entries are
          read-only — a clean line under the month.
        </Body>
      </>
    ),
  },
}

export const Full: Story = {
  args: {
    intensity: 'full',
    header: 'Project of the year',
    children: (
      <>
        <Eyebrow>Finished · 14 phases</Eyebrow>
        <Body>The orchard — done.</Body>
      </>
    ),
  },
}

export const AllIntensities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      {(['chrome', 'surface', 'full'] as const).map(intensity => (
        <MaterialCard
          key={intensity}
          intensity={intensity}
          header={`${intensity} intensity`}
          footer={<Button variant="primary">Action</Button>}
        >
          <Eyebrow>November · sealed</Eyebrow>
          <Body>38 entries · balance 1,284.40</Body>
        </MaterialCard>
      ))}
    </div>
  ),
}

export const LeatherSignature: Story = {
  parameters: { globals: { material: 'leather' } },
  args: {
    intensity: 'surface',
    header: 'Leather',
    children: (
      <>
        <Eyebrow>Signature · leather</Eyebrow>
        <Body>Warm brown, gold metal. Set via the Material toolbar picker or AcheryProvider.</Body>
      </>
    ),
  },
}

export const WoodSignature: Story = {
  parameters: { globals: { material: 'wood' } },
  args: {
    intensity: 'surface',
    header: 'Wood',
    children: (
      <>
        <Eyebrow>Signature · wood</Eyebrow>
        <Body>Tan brown, copper metal. Set via the Material toolbar picker or AcheryProvider.</Body>
      </>
    ),
  },
}

export const CopperSignature: Story = {
  parameters: { globals: { material: 'copper' } },
  args: {
    intensity: 'surface',
    header: 'Copper',
    children: (
      <>
        <Eyebrow>Signature · copper</Eyebrow>
        <Body>Warm orange-brown, silver metal. Set via the Material toolbar picker or AcheryProvider.</Body>
      </>
    ),
  },
}
