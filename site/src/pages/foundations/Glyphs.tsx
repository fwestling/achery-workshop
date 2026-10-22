import { useMemo, useState } from 'react'
import { Glyph, SearchInput, glyphLabel, searchGlyphs, type GlyphName } from 'achery-ui'
import { PageIntro } from '../../components/Prose'
import { ALL_GLYPHS as ALL, GLYPH_GROUPS as GROUPS } from '../../foundations/glyphs'

const Tile = ({ name, copied, onCopy }: { name: GlyphName; copied: boolean; onCopy: (n: GlyphName) => void }) => (
  <li>
    <button type="button" className="glyph-tile" onClick={() => onCopy(name)} aria-label={`${glyphLabel(name)}: copy name`}>
      <Glyph name={name} size={24} />
      <code className="glyph-tile__name">{copied ? 'Copied' : name}</code>
    </button>
  </li>
)

export const Glyphs = () => {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<GlyphName | null>(null)
  const results = useMemo(() => (query.trim() ? searchGlyphs(query, ALL).map((r) => r.name) : null), [query])

  const copy = (name: GlyphName) => {
    void navigator.clipboard?.writeText(name).then(
      () => setCopied(name),
      () => setCopied(null),
    )
  }

  return (
    <>
      <PageIntro title="Glyphs">
        <p>
          {ALL.length} glyphs drawn in the vocabulary of alchemical and botanical illustration, plus the
          everyday UI set. Each inherits <code>currentColor</code>. Use{' '}
          <code>{'<Glyph name="…" />'}</code>, or the <code>glyph</code> prop on Button, Sidebar items and
          the rest. Pass <code>title</code> when a glyph carries meaning on its own; without one it's
          hidden from screen readers.
        </p>
        <p>
          Search uses <code>searchGlyphs</code>, the same as <code>GlyphPicker</code>. Select a glyph to
          copy its name.
        </p>
      </PageIntro>

      <div className="glyph-search" role="search">
        <SearchInput
          placeholder="e.g. potion, money, arrow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search glyphs"
        />
        <p className="glyph-search__count" aria-live="polite">
          {results ? `${results.length} of ${ALL.length}` : `${ALL.length} glyphs`}
        </p>
      </div>

      {results ? (
        <ul className="glyph-grid">
          {results.map((name) => (
            <Tile key={name} name={name} copied={copied === name} onCopy={copy} />
          ))}
        </ul>
      ) : (
        GROUPS.map(({ name, glyphs }) => (
          <section key={name} aria-labelledby={`g-${name}`}>
            <h2 id={`g-${name}`} className="glyph-group__title">
              {name} <span className="h-aside">{glyphs.length}</span>
            </h2>
            <ul className="glyph-grid">
              {glyphs.map((g) => (
                <Tile key={g} name={g} copied={copied === g} onCopy={copy} />
              ))}
            </ul>
          </section>
        ))
      )}

      <p className="note">
        <code>mark</code> and <code>wordmark</code> still render, as <code>hex-arrow</code> and{' '}
        <code>hex-arrow-lockup</code>, but are deprecated: neither is the Achery logo.
      </p>
    </>
  )
}
