import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { Glyph } from './Glyph'
import { GlyphCategories, searchGlyphs, glyphLabel } from './glyphMeta'
import type { GlyphName } from '../types/components'

const ALL_NAMES = Object.values(GlyphCategories).flat() as GlyphName[]

const meta: Meta = {
  title: 'Primitives/GlyphGallery',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Searchable reference for all 394 glyphs + 3 brand marks in the Achery icon set. Type to filter by name, label, or alias.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Gallery: Story = {
  render: () => {
    const [query, setQuery] = useState('')
    const [copied, setCopied] = useState<string | null>(null)

    const copyToClipboard = (name: string) => {
      navigator.clipboard?.writeText(name).then(() => {
        setCopied(name)
        setTimeout(() => setCopied(null), 1500)
      })
    }

    const q = query.trim()
    const isSearching = q.length > 0

    const searchResults = useMemo(() => {
      if (!isSearching) return null
      return searchGlyphs(q, ALL_NAMES)
    }, [q, isSearching])

    const categoriesToShow = useMemo(() => {
      if (isSearching) return null
      return Object.entries(GlyphCategories)
    }, [isSearching])

    return (
      <div style={{ padding: '24px', fontFamily: 'var(--achery-font-body, system-ui)', minHeight: '100vh', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            Glyph Gallery
            <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 400, opacity: 0.5 }}>
              {ALL_NAMES.length} glyphs
            </span>
          </h2>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, keyword, or alias…"
            style={{
              padding: '8px 12px',
              border: '1.5px solid #ccc',
              borderRadius: 2,
              fontFamily: 'inherit',
              fontSize: 14,
              width: '100%',
              maxWidth: 480,
              boxSizing: 'border-box',
              outline: 'none',
            }}
            autoFocus
          />
          {isSearching && (
            <p style={{ margin: 0, fontSize: 12, opacity: 0.5 }}>
              {searchResults?.length ?? 0} result{searchResults?.length !== 1 ? 's' : ''} for "{q}"
            </p>
          )}
        </div>

        {isSearching ? (
          searchResults && searchResults.length > 0 ? (
            <GlyphGrid names={searchResults.map(r => r.name)} copied={copied} onCopy={copyToClipboard} />
          ) : (
            <p style={{ opacity: 0.4, fontSize: 14 }}>No glyphs match "{q}"</p>
          )
        ) : (
          categoriesToShow!.map(([category, names]) => (
            <div key={category} style={{ marginBottom: 32 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4 }}>
                {category}
                <span style={{ marginLeft: 6, fontWeight: 400 }}>({names.length})</span>
              </h3>
              <GlyphGrid names={names as GlyphName[]} copied={copied} onCopy={copyToClipboard} />
            </div>
          ))
        )}

        {copied && (
          <div style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            background: '#1f1d18', color: '#fbf8f0', padding: '8px 16px',
            borderRadius: 4, fontSize: 13, pointerEvents: 'none', zIndex: 9999,
          }}>
            Copied "{copied}"
          </div>
        )}
      </div>
    )
  },
}

interface GlyphGridProps {
  names: readonly GlyphName[]
  copied: string | null
  onCopy: (name: string) => void
}

const GlyphGrid = ({ names, copied, onCopy }: GlyphGridProps) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
    gap: 4,
  }}>
    {names.map(name => (
      <button
        key={name}
        type="button"
        title={`${glyphLabel(name)} — click to copy "${name}"`}
        onClick={() => onCopy(name)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 6, padding: '10px 4px',
          background: copied === name ? '#e8f0e0' : 'transparent',
          border: '1px solid transparent',
          borderRadius: 3, cursor: 'pointer',
          transition: 'background 0.12s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (copied !== name) (e.currentTarget as HTMLButtonElement).style.background = '#f5f0e8' }}
        onMouseLeave={e => { if (copied !== name) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <Glyph name={name} size={20} />
        <span style={{ fontSize: 9, fontFamily: 'monospace', opacity: 0.5, textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>
          {name}
        </span>
      </button>
    ))}
  </div>
)
