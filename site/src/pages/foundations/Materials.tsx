import { Body, Button, MaterialCard, type MaterialIntensity, type MaterialSignature } from 'achery-ui'
import { palette } from 'achery-ui/tokens'
import { InlineMd, PageIntro } from '../../components/Prose'
import { Chip } from '../../components/Swatch'
import { ThemeScope } from '../../components/ThemeScope'
import { usage } from '../../foundations/designSystem'

const SIGNATURES: { material: Exclude<MaterialSignature, 'none'>; metal: string; families: string[] }[] = [
  { material: 'leather', metal: 'gilt', families: ['leather', 'gold'] },
  { material: 'wood', metal: 'pewter', families: ['wood', 'silver'] },
  { material: 'copper', metal: 'patina', families: ['copper'] },
]

const INTENSITIES: { intensity: MaterialIntensity; note: string }[] = [
  { intensity: 'chrome', note: 'Spine and metal trim on a paper body. The default.' },
  { intensity: 'surface', note: 'A material header band over paper. Dialogs.' },
  { intensity: 'full', note: 'The whole object in material. Rare, celebratory moments.' },
]

const swatchesFor = (family: string) =>
  Object.entries(palette).filter(([key]) => key === family || key.startsWith(family))

export const Materials = () => (
  <>
    <PageIntro title="Materials">
      <p>
        Materials are not a second theme. The working page stays paper, ink and accent; a material
        appears only on a bounded, occasional object (a dialog, one featured card, a receipt) where a
        richer surface reads as an occasion. Scarcity is the whole effect.
      </p>
      <p>
        Pick a signature for the project with <code>{'<AcheryProvider defaultMaterial="…">'}</code>, then
        choose how loudly each object wears it with <code>{'<MaterialCard intensity="…">'}</code>. Previews
        follow the site's light/dark setting; switch it to see the other theme.
      </p>
    </PageIntro>

    {SIGNATURES.map(({ material, metal, families }) => (
      <section key={material} aria-labelledby={material}>
        <h2 id={material}>
          {material[0]!.toUpperCase() + material.slice(1)} <span className="h-aside">with {metal}</span>
        </h2>
        <ThemeScope material={material} className="material-row">
          {INTENSITIES.map(({ intensity, note }) => (
            <figure key={intensity} className="material-row__item">
              <MaterialCard
                intensity={intensity}
                header="Close the month"
                footer={
                  <Button size="sm" variant="secondary">
                    Bind & archive
                  </Button>
                }
              >
                <Body>Seal the ledger and file it to the archive.</Body>
              </MaterialCard>
              <figcaption>
                <code>intensity="{intensity}"</code> {note}
              </figcaption>
            </figure>
          ))}
        </ThemeScope>
        <ul className="palette-grid palette-grid--compact">
          {families.flatMap(swatchesFor).map(([key, value]) => {
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
      </section>
    ))}
  </>
)
