import { BarChart } from 'achery-ui'
import { chartColors, CHART_SERIES_MAX } from 'achery-ui/tokens'
import { PageIntro } from '../../components/Prose'
import { Chip, RatioTag } from '../../components/Swatch'
import { ThemeScope } from '../../components/ThemeScope'
import { themeTokens, type Theme } from '../../foundations/colourRoles'
import { contrast, rateNonText } from '../../foundations/contrast'

const THEMES: Theme[] = ['light', 'dark']

const SAMPLE = [
  { label: 'NPCs', values: [12, 9, 4] },
  { label: 'Places', values: [3, 8, 14] },
  { label: 'Items', values: [7, 5, 6] },
]

const Ramp = ({ name, colours, theme }: { name: string; colours: readonly string[]; theme: Theme }) => (
  <ol className="chart-ramp" aria-label={`${name}, ${theme}`}>
    {colours.map((c, i) => {
      const ratio = contrast(c, themeTokens[theme]['surface']!)
      return (
        <li key={c} className="chart-ramp__step">
          <Chip colour={c} size="lg" />
          <code>
            {i + 1}. {c}
          </code>
          <RatioTag ratio={ratio} rating={rateNonText(ratio)} against="on surface" />
        </li>
      )
    })}
  </ol>
)

export const Charts = () => (
  <>
    <PageIntro title="Chart colours">
      <p>
        The palette is deliberately muted, and most of its hues are too grey for a chart mark.{' '}
        <code>chartColors</code> steps the same hues up just enough to tell apart, one set per theme. Text
        never wears them: labels, values and legends use the text tokens with a swatch beside them. The
        reasoning is in the doc comment of <code>src/tokens/chart.ts</code>.
      </p>
    </PageIntro>

    <section aria-labelledby="series">
      <h2 id="series">Series</h2>
      <p className="section-lead">
        Categorical, for identity, assigned in this order and never re-ordered by rank. A chart colours at
        most <code>CHART_SERIES_MAX</code> ({CHART_SERIES_MAX}) series; fold the rest into "Other".
      </p>
      <div className="chart-themes">
        {THEMES.map((theme) => (
          <div key={theme}>
            <h3>{theme === 'light' ? 'Light' : 'Dark'}</h3>
            <Ramp name="Series" colours={chartColors[theme].series} theme={theme} />
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="ordinal">
      <h2 id="ordinal">Ordinal</h2>
      <p className="section-lead">
        One hue (slate), for ordered series such as stub → draft → complete. In dark the ramp runs the
        other way, so "more" always stands out from the surface. The lightest steps are designed to clear
        2:1 rather than 3:1; order and the legend tell them apart, and every chart carries a table of its
        values.
      </p>
      <div className="chart-themes">
        {THEMES.map((theme) => (
          <div key={theme}>
            <h3>{theme === 'light' ? 'Light' : 'Dark'}</h3>
            <Ramp name="Ordinal" colours={chartColors[theme].ordinal} theme={theme} />
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="in-use">
      <h2 id="in-use">In use</h2>
      <div className="chart-themes">
        {THEMES.map((theme) => (
          <ThemeScope key={theme} theme={theme} className="chart-preview">
            <BarChart
              label={`Entities by status (${theme})`}
              orientation="horizontal"
              scale="ordinal"
              series={['Stub', 'Draft', 'Complete']}
              data={SAMPLE}
            />
          </ThemeScope>
        ))}
      </div>
    </section>
  </>
)
