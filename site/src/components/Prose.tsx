import type { ReactNode } from 'react'
import { Marked } from 'marked'

const marked = new Marked({ gfm: true, async: false })

/** Inline markdown (backticked token names in usage notes, mostly) from the repo's own data. */
export const InlineMd = ({ text, className }: { text: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: marked.parseInline(text) as string }} />
)

/** The intro under a foundation page's title. */
export const PageIntro = ({ title, children }: { title: string; children: ReactNode }) => (
  <header className="page-intro">
    <h1>{title}</h1>
    <div className="page-intro__lead">{children}</div>
  </header>
)

/** A design-system family note, set as a pull quote under a section heading. */
export const FamilyNote = ({ note }: { note: string | undefined }) =>
  note ? (
    <p className="family-note">
      <InlineMd text={note} />
    </p>
  ) : null
