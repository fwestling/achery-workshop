import { palette } from 'achery-ui/tokens'
import { Chip, RatioTag } from '../../components/Swatch'
import { InlineMd, PageIntro } from '../../components/Prose'
import { checks, SEMANTIC_GROUPS, themeTokens, type Theme } from '../../foundations/colourRoles'
import { usage } from '../../foundations/designSystem'

const THEMES: Theme[] = ['light', 'dark']

/** `paperWarm` → family `paper`; `copperPatina` → `copper`. Families keep palette.ts order. */
const familyOf = (key: string) => key.replace(/(Deep|Light|Mid|Warm|Toasted|Soft|Patina)$/, '')

const FAMILIES = Object.keys(palette).reduce<{ name: string; keys: string[] }[]>((acc, key) => {
  const name = familyOf(key)
  const family = acc.find((f) => f.name === name)
  if (family) family.keys.push(key)
  else acc.push({ name, keys: [key] })
  return acc
}, [])

const SemanticTable = () => (
  <div className="table-wrap">
    <table className="token-table">
      <caption className="visually-hidden">Semantic colour tokens in light and dark themes</caption>
      <thead>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Light</th>
          <th scope="col">Dark</th>
          <th scope="col">Usage</th>
        </tr>
      </thead>
      {SEMANTIC_GROUPS.map((group) => (
        <tbody key={group.title}>
          <tr className="token-table__group">
            <th scope="colgroup" colSpan={4}>
              {group.title}
            </th>
          </tr>
          {group.tokens.map(({ key, role }) => {
            const note = usage('color', key)
            return (
              <tr key={key}>
                <th scope="row" className="token-name">
                  <code>{key}</code>
                  <code className="token-name__alias">--achery-color-{key}</code>
                </th>
                {THEMES.map((theme) => {
                  const value = themeTokens[theme][key]!
                  return (
                    <td key={theme} className="token-value" data-label={theme === 'light' ? 'Light' : 'Dark'}>
                      <span className="token-value__swatch">
                        <Chip colour={value} />
                        <code>{value}</code>
                      </span>
                      {checks(key, role, theme).map((c) => (
                        <RatioTag key={c.against} {...c} />
                      ))}
                    </td>
                  )
                })}
                <td className="token-usage" data-label="Usage">
                  {note ? <InlineMd text={note} /> : null}
                </td>
              </tr>
            )
          })}
        </tbody>
      ))}
    </table>
  </div>
)

export const Colour = () => (
  <>
    <PageIntro title="Colour">
      <p>
        Ink on paper in light, candlelight on lamp black in dark. Components use the semantic tokens, which
        change with the theme. The palette underneath stays the same in both, and isn't for direct use in
        components.
      </p>
      <p>
        Values come from <code>achery-ui/tokens</code>. Usage notes come from the Achery design system,
        which these values mirror. Ratios are WCAG contrast: text needs 4.5:1, or 3:1 at 24px and up;
        lines and marks need 3:1.
      </p>
    </PageIntro>

    <section aria-labelledby="semantic">
      <h2 id="semantic">Semantic tokens</h2>
      <p className="section-lead">
        In CSS, use the <code>--achery-color-*</code> custom properties; in vanilla-extract,{' '}
        <code>vars.color.*</code>; in React Native, <code>lightTokens</code> and <code>darkTokens</code>.
      </p>
      <SemanticTable />
    </section>

    <section aria-labelledby="palette">
      <h2 id="palette">Palette</h2>
      <p className="section-lead">
        <code>palette</code> from <code>achery-ui/tokens</code>: the same in both themes.
      </p>
      {FAMILIES.map((family) => (
        <div key={family.name} className="palette-family">
          <h3 className="palette-family__name">{family.name}</h3>
          <ul className="palette-grid">
            {family.keys.map((key) => {
              const value = (palette as Record<string, string>)[key]!
              const note = usage('color', key)
              return (
                <li key={key} className="palette-card">
                  <Chip colour={value} size="lg" />
                  <div className="palette-card__text">
                    <code className="palette-card__name">{key}</code>
                    <code className="palette-card__hex">{value}</code>
                    {note && <InlineMd className="palette-card__usage" text={note} />}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  </>
)
