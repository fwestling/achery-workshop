import { vars } from 'achery-ui'
import { radius, shadows, spacing, zIndex } from 'achery-ui/tokens'
import { FamilyNote, InlineMd, PageIntro } from '../../components/Prose'
import { ThemeScope } from '../../components/ThemeScope'
import { familyNote, usage } from '../../foundations/designSystem'

const SHADOWS = [
  { key: 'stamp', light: `${shadows.stamp} + border colour`, dark: `${shadows.stamp} + border colour` },
  { key: 'stampLg', light: `${shadows.stampLg} + border colour`, dark: `${shadows.stampLg} + border colour` },
  { key: 'press', light: shadows.pressLight, dark: shadows.pressDark },
  { key: 'soft', light: shadows.softLight, dark: shadows.softDark },
] as const

export const Space = () => (
  <>
    <PageIntro title="Space & shape">
      <p>
        A compact 4px grid, square corners and hard stamp shadows. Values come from{' '}
        <code>achery-ui/tokens</code>; in vanilla-extract styles use <code>vars.space</code>,{' '}
        <code>vars.radius</code> and <code>vars.shadow</code>.
      </p>
    </PageIntro>

    <section aria-labelledby="spacing">
      <h2 id="spacing">Spacing</h2>
      <FamilyNote note={familyNote('spacing')} />
      <ul className="space-scale">
        {Object.entries(spacing).map(([key, value]) => {
          const note = usage('spacing', key)
          return (
            <li key={key} className="space-step">
              <code className="space-step__key">{key}</code>
              <code className="space-step__value">{value}px</code>
              <span className="space-step__bar" style={{ width: value }} aria-hidden="true" />
              {note && <InlineMd className="space-step__usage" text={note} />}
            </li>
          )
        })}
      </ul>
    </section>

    <section aria-labelledby="radius">
      <h2 id="radius">Radius</h2>
      <FamilyNote note={familyNote('radius')} />
      <ul className="shape-grid">
        {Object.entries(radius).map(([key, value]) => {
          const note = usage('radius', key)
          return (
            <li key={key} className="shape-card">
              <span className="shape-card__demo shape-card__demo--radius" style={{ borderRadius: value }} aria-hidden="true" />
              <code className="shape-card__key">radius.{key}</code>
              <code className="shape-card__value">{value}</code>
              {note && <InlineMd className="shape-card__usage" text={note} />}
            </li>
          )
        })}
      </ul>
    </section>

    <section aria-labelledby="shadows">
      <h2 id="shadows">Shadows</h2>
      <FamilyNote note={familyNote('shadow')} />
      <ul className="shape-grid">
        {SHADOWS.map(({ key, light, dark }) => {
          const note = usage('shadow', key)
          return (
            <li key={key} className="shape-card">
              <div className="shadow-pair">
                {(['light', 'dark'] as const).map((theme) => (
                  <ThemeScope key={theme} theme={theme} className="shadow-pair__scope">
                    <span className="shape-card__demo" style={{ boxShadow: vars.shadow[key] }} aria-hidden="true" />
                  </ThemeScope>
                ))}
              </div>
              <code className="shape-card__key">vars.shadow.{key}</code>
              <code className="shape-card__value">
                {light === dark ? light : `${light} · dark: ${dark}`}
              </code>
              {note && <InlineMd className="shape-card__usage" text={note} />}
            </li>
          )
        })}
      </ul>
    </section>

    <section aria-labelledby="layers">
      <h2 id="layers">Layers</h2>
      <div className="table-wrap">
        <table className="token-table token-table--compact">
          <caption className="visually-hidden">z-index layers</caption>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(zIndex).map(([key, value]) => {
              const note = usage('zIndex', key)
              return (
                <tr key={key}>
                  <th scope="row" className="token-name">
                    <code>zIndex.{key}</code>
                  </th>
                  <td data-label="Value">
                    <code>{value}</code>
                  </td>
                  <td className="token-usage" data-label="Usage">
                    {note && <InlineMd text={note} />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  </>
)
