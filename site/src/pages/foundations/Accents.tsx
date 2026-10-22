import { Button, Checkbox, Eyebrow, useTheme, type AccentDial } from 'achery-ui'
import { accentColorNames, accentColors } from 'achery-ui/tokens'
import { InlineMd, PageIntro } from '../../components/Prose'
import { Chip, RatioTag } from '../../components/Swatch'
import { ThemeScope } from '../../components/ThemeScope'
import { contrast, rateText } from '../../foundations/contrast'
import { themeTokens } from '../../foundations/colourRoles'
import { usage } from '../../foundations/designSystem'

const LEGACY = new Set(['olive'])

const AccentCard = ({ name }: { name: (typeof accentColorNames)[number] }) => {
  const { theme } = useTheme()
  const a = accentColors[name]
  // The fill each theme uses (main in light, light in dark) and the text that sits on it
  const fills = [
    { theme: 'light' as const, fill: a.main, fg: a.fg },
    { theme: 'dark' as const, fill: a.light, fg: a.fgDark },
  ]
  const note = usage('color', name)
  return (
    <li className="accent-card">
      <div className="accent-card__head">
        <code className="accent-card__name">{name}</code>
        {LEGACY.has(name) && <span className="accent-card__legacy">Legacy alias of moss</span>}
      </div>
      <dl className="accent-card__steps">
        {(['main', 'light', 'deep'] as const).map((step) => (
          <div key={step}>
            <dt>{step}</dt>
            <dd>
              <Chip colour={a[step]} size="sm" /> <code>{a[step]}</code>
            </dd>
          </div>
        ))}
      </dl>
      <div className="accent-card__ratios">
        {fills.map(({ theme: t, fill, fg }) => {
          const ratio = contrast(fg, fill)
          return <RatioTag key={t} ratio={ratio} rating={rateText(ratio)} against={`text on ${t} fill`} />
        })}
        {fills.map(({ theme: t, fill }) => {
          const ratio = contrast(fill, themeTokens[t]['bg']!)
          return <RatioTag key={`${t}-bg`} ratio={ratio} rating={rateText(ratio)} against={`as text on ${t} bg`} />
        })}
      </div>
      {note && <InlineMd className="accent-card__usage" text={note} />}
      <ThemeScope accent={name} theme={theme} className="accent-card__preview">
        <Button variant="accent" size="sm">
          Bind the ledger
        </Button>
        <a href="#accents">A link</a>
      </ThemeScope>
    </li>
  )
}

const DIALS: { dial: AccentDial; summary: string }[] = [
  { dial: 'underline', summary: 'Accent on links, focus rings and the active-tab underline only. Ticks are ink.' },
  {
    dial: 'chrome',
    summary: 'The default. The accent threads the wiring: ticks, a rule before each eyebrow, outline-button borders.',
  },
  { dial: 'surface', summary: 'As chrome, and the one `.signature-surface` panel per view floods with the accent.' },
]

export const Accents = () => (
  <>
    <PageIntro title="Accents & dial">
      <p>
        Each project picks one accent; everything else stays paper and ink. Set it with{' '}
        <code>{'<AcheryProvider defaultAccent="…">'}</code>, and the visitor's choice is remembered. The
        swatches in the header switch this whole site.
      </p>
      <p>
        An accent fills with <code>main</code> in light and <code>light</code> in dark; <code>deep</code> is
        its pressed state. The text on each fill is <code>fg</code> and <code>fgDark</code>. Previews below
        follow the site's light/dark setting.
      </p>
    </PageIntro>

    <section aria-labelledby="accents">
      <h2 id="accents">
        {accentColorNames.length - LEGACY.size} accents
        {LEGACY.size > 0 && <span className="h-aside"> + {LEGACY.size} legacy alias</span>}
      </h2>
      <ul className="accent-grid">
        {accentColorNames.map((name) => (
          <AccentCard key={name} name={name} />
        ))}
      </ul>
    </section>

    <section aria-labelledby="dial">
      <h2 id="dial">The dial</h2>
      <p className="section-lead">
        How loudly the accent runs: <code>{'<AcheryProvider defaultDial="…">'}</code>, or{' '}
        <code>setDial</code> from <code>useTheme()</code>. It only dresses the interaction layer. The paper,
        ink hairlines and square corners never change.
      </p>
      <ul className="dial-grid">
        {DIALS.map(({ dial, summary }) => (
          <li key={dial}>
            <ThemeScope dial={dial} className="dial-card">
              <Eyebrow>{dial}</Eyebrow>
              <p className="dial-card__summary">
                <InlineMd text={summary} />
              </p>
              <Checkbox defaultChecked label="Ticked" />
              <Button size="sm">Outline button</Button>
              <div className="signature-surface dial-card__surface">
                <code>.signature-surface</code>
              </div>
            </ThemeScope>
          </li>
        ))}
      </ul>
      <p className="note">
        The dial puts the accent on <strong>marks, never text</strong>: eyebrow labels stay in{' '}
        <code>fg2</code> with an accent rule beside them. As 11px text, the accent would miss 4.5:1 for
        terracotta, copper, ochre and amber on paper, and for most hues on dark cards. React Native components
        don't read the dial yet.
      </p>
    </section>
  </>
)
