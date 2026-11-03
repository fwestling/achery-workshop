const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Splits what's in a tag field at its separators. Everything before the last separator is
 * confirmed (one tag per piece); what follows it is still being typed. Text with no separator in
 * it is all still being typed. Handles a separator typed at the end and pasted text with several.
 */
export const splitTags = (text: string, separators: readonly string[]): { confirmed: string[]; rest: string } => {
  const seps = separators.filter((s) => s !== '')
  if (!seps.some((s) => text.includes(s))) return { confirmed: [], rest: text }
  const parts = text.split(new RegExp(seps.map(escape).join('|')))
  const rest = parts.pop() ?? ''
  return { confirmed: parts.filter((p) => p.trim() !== ''), rest }
}

/** `value` plus each new tag, normalised, without blanks or repeats. */
export const addTags = (value: readonly string[], raws: readonly string[], normalize: (raw: string) => string): string[] => {
  const next = [...value]
  for (const raw of raws) {
    const tag = normalize(raw)
    if (tag && !next.includes(tag)) next.push(tag)
  }
  return next
}
