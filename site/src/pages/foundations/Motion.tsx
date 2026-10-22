import { useState } from 'react'
import { Button } from 'achery-ui'
import { duration, easing } from 'achery-ui/tokens'
import { PageIntro } from '../../components/Prose'
import { docs, renderMarkdown } from '../../content'

// The design system's tokens.json has no motion family, so the guidance is the Motion section of
// src/docs/Styleguide.mdx, rendered as-is.
const guidance = renderMarkdown(docs.motion)

const Track = ({ curve, time, label }: { curve: string; time: string; label: string }) => {
  const [end, setEnd] = useState(false)
  return (
    <div className="motion-demo">
      <div className="motion-demo__track" aria-hidden="true">
        <span
          className={end ? 'motion-demo__puck motion-demo__puck--end' : 'motion-demo__puck'}
          style={{ transition: `left ${time} ${curve}` }}
        />
      </div>
      <Button size="sm" variant="secondary" onClick={() => setEnd((e) => !e)} aria-label={`Play ${label}`}>
        Play
      </Button>
    </div>
  )
}

export const Motion = () => (
  <>
    <PageIntro title="Motion">
      <p>
        Values from <code>achery-ui/tokens</code>; in vanilla-extract use <code>vars.duration</code> and{' '}
        <code>vars.ease</code>. If your device is set to reduce motion, the demos jump instead of moving.
      </p>
    </PageIntro>

    <div className="doc" dangerouslySetInnerHTML={{ __html: guidance }} />

    <section aria-labelledby="durations">
      <h2 id="durations">Durations</h2>
      <p className="section-lead">At their real speed, with <code>easing.out</code>.</p>
      <ul className="motion-list">
        {(Object.keys(duration) as (keyof typeof duration)[]).map((key) => (
          <li key={key} className="motion-row">
            <span className="motion-row__meta">
              <code>duration.{key}</code> <code className="motion-row__value">{duration[key]}</code>
            </span>
            <Track curve={easing.out} time={duration[key]} label={`duration.${key}`} />
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="easing">
      <h2 id="easing">Easing</h2>
      <p className="section-lead">
        Slowed to one second so the curve shows. <code>easing.in</code> isn't in the guidance above: it
        accelerates away, for things leaving.
      </p>
      <ul className="motion-list">
        {(Object.keys(easing) as (keyof typeof easing)[]).map((key) => (
          <li key={key} className="motion-row">
            <span className="motion-row__meta">
              <code>easing.{key}</code> <code className="motion-row__value">{easing[key]}</code>
            </span>
            <Track curve={easing[key]} time="1s" label={`easing.${key}`} />
          </li>
        ))}
      </ul>
    </section>
  </>
)
