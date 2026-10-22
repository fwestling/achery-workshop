import { describe, expect, it } from 'vitest'
import { contrast, formatRatio, rateNonText, rateText } from './contrast'

describe('contrast', () => {
  it('matches WCAG reference values', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrast('#ffffff', '#ffffff')).toBe(1)
    // #767676 on white is the classic 4.54:1
    expect(contrast('#767676', '#ffffff')).toBeCloseTo(4.54, 2)
  })

  it('is symmetric', () => {
    expect(contrast('#1f1d18', '#fbf8f0')).toBe(contrast('#fbf8f0', '#1f1d18'))
  })
})

describe('ratings', () => {
  it('rates text at the WCAG thresholds', () => {
    expect(rateText(7)).toBe('AAA')
    expect(rateText(4.5)).toBe('AA')
    expect(rateText(4.49)).toBe('Large text')
    expect(rateText(2.99)).toBe('Decorative')
  })

  it('rates marks and edges at 3:1', () => {
    expect(rateNonText(3)).toBe('Non-text')
    expect(rateNonText(2.9)).toBe('Decorative')
  })

  it('never rounds a ratio up across a threshold', () => {
    expect(formatRatio(4.4999)).toBe('4.49:1')
    expect(formatRatio(21)).toBe('21.00:1')
  })
})
