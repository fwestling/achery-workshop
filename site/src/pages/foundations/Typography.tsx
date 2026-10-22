import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Body, Display, Eyebrow, Heading, Mono } from 'achery-ui'
import { fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights } from 'achery-ui/tokens'
import { FamilyNote, InlineMd, PageIntro } from '../../components/Prose'
import { familyNote, typeStyles, usage, type DsFamilyName } from '../../foundations/designSystem'

/** Which achery-ui component renders each of the design system's type styles. */
const COMPONENT_FOR: Record<string, { code: string; render: (sample: string) => ReactNode }> = {
  display: { code: '<Display>', render: (s) => <Display>{s}</Display> },
  h1: { code: '<Heading level={1}>', render: (s) => <Heading level={1}>{s}</Heading> },
  h2: { code: '<Heading level={2}>', render: (s) => <Heading level={2}>{s}</Heading> },
  h3: { code: '<Heading level={3}>', render: (s) => <Heading level={3}>{s}</Heading> },
  h4: { code: '<Heading level={4}>', render: (s) => <Heading level={4}>{s}</Heading> },
  h5: { code: '<Heading level={5}>', render: (s) => <Heading level={5}>{s}</Heading> },
  eyebrow: { code: '<Eyebrow>', render: (s) => <Eyebrow>{s}</Eyebrow> },
  'p-lead': { code: '<Body variant="lead">', render: (s) => <Body variant="lead">{s}</Body> },
  p: { code: '<Body>', render: (s) => <Body>{s}</Body> },
  'p-small': { code: '<Body variant="small">', render: (s) => <Body variant="small">{s}</Body> },
  mono: { code: '<Mono>', render: (s) => <Mono>{s}</Mono> },
}

interface Measured {
  size: string
  weight: string
  lineHeight: string
  tracking: string
}

const px = (v: string) => (v.endsWith('px') ? `${Math.round(parseFloat(v) * 100) / 100}px` : v)

/** The specimen's computed style: what achery-ui actually renders, read in the browser after render. */
const useMeasured = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [measured, setMeasured] = useState<Measured | null>(null)
  useEffect(() => {
    const el = ref.current?.firstElementChild
    if (!el) return
    const cs = getComputedStyle(el)
    const size = parseFloat(cs.fontSize)
    setMeasured({
      size: px(cs.fontSize),
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight === 'normal' ? 'normal' : `${Math.round((parseFloat(cs.lineHeight) / size) * 100) / 100}`,
      tracking: cs.letterSpacing === 'normal' ? '0' : `${Math.round((parseFloat(cs.letterSpacing) / size) * 1000) / 1000}em`,
    })
  }, [])
  return { ref, measured }
}

const Specimen = ({ style }: { style: (typeof typeStyles)[number] }) => {
  const { ref, measured } = useMeasured()
  const component = COMPONENT_FOR[style.name]
  const sample = style.sample ?? style.name
  return (
    <li className="type-specimen">
      <div className="type-specimen__meta">
        <code className="type-specimen__name">{style.name}</code>
        {component && <code className="type-specimen__component">{component.code}</code>}
        <span className="type-specimen__measure">
          {measured
            ? `${measured.size} · ${measured.weight} · ${measured.lineHeight} · ${measured.tracking}`
            : 'size · weight · line height · tracking'}
        </span>
        {style.usage && <InlineMd className="type-specimen__usage" text={style.usage} />}
      </div>
      <div ref={ref} className="type-specimen__sample">
        {component ? component.render(sample) : <span>{sample}</span>}
      </div>
    </li>
  )
}

const ScaleTable = ({
  family,
  values,
  label,
}: {
  /** The design-system family its usage notes come from; weights have none */
  family?: DsFamilyName
  values: Record<string, string | number>
  label: string
}) => (
  <div className="table-wrap">
    <table className="token-table token-table--compact">
      <caption className="visually-hidden">{label}</caption>
      <thead>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Value</th>
          <th scope="col">Usage</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(values).map(([key, value]) => {
          const note = family && usage(family, key)
          return (
            <tr key={key}>
              <th scope="row" className="token-name">
                <code>{key}</code>
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
)

const FAMILY_ROLE: Record<keyof typeof fontFamilies, string> = {
  display: 'Display and headings H1–H4: the shop-sign slab.',
  body: 'Everything else: body, labels, buttons, H5 and eyebrows.',
  mono: 'Code, IDs, measurements and figures.',
}

export const Typography = () => (
  <>
    <PageIntro title="Typography">
      <p>
        Three families: a heavy slab for display, a grotesk for the working UI and a mono for figures and
        code. The base size is a compact 14px. Load the fonts yourself: <code>googleFontsUrl</code> from{' '}
        <code>achery-ui/tokens</code> is the Google Fonts link, or self-host them (this site uses
        Fontsource).
      </p>
    </PageIntro>

    <section aria-labelledby="families">
      <h2 id="families">Families</h2>
      <ul className="family-grid">
        {(Object.keys(fontFamilies) as (keyof typeof fontFamilies)[]).map((key) => (
          <li key={key} className="family-card">
            <p className="family-card__sample" style={{ fontFamily: fontFamilies[key] }}>
              Salt, sulfur & mercury 0123456789
            </p>
            <code className="family-card__key">fontFamilies.{key}</code>
            <code className="family-card__stack">{fontFamilies[key]}</code>
            <p className="family-card__role">{FAMILY_ROLE[key]}</p>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="styles">
      <h2 id="styles">Type styles</h2>
      <p className="section-lead">
        The design system's styles, each rendered with its achery-ui component. Figures are measured from
        the rendered text: size · weight · line height · tracking.
      </p>
      <ul className="type-list">
        {typeStyles.map((style) => (
          <Specimen key={style.name} style={style} />
        ))}
      </ul>
    </section>

    <section aria-labelledby="scales">
      <h2 id="scales">Scales</h2>
      <h3>Font size</h3>
      <FamilyNote note={familyNote('fontSize')} />
      <ScaleTable family="fontSize" values={fontSizes} label="Font sizes" />
      <h3>Weight</h3>
      <ScaleTable values={fontWeights} label="Font weights" />
      <h3>Line height</h3>
      <ScaleTable family="lineHeight" values={lineHeights} label="Line heights" />
      <h3>Letter spacing</h3>
      <ScaleTable family="letterSpacing" values={letterSpacings} label="Letter spacing" />
    </section>
  </>
)
