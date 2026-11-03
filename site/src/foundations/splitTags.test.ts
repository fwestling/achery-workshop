import { describe, expect, it } from 'vitest'
import { addTags, splitTags } from '../../../src/tags/splitTags'

const words = [',', ' ']
const normalize = (t: string) => t.trim().toLowerCase().replace(/\s+/g, ' ')

describe('splitTags (TagInput, web and native)', () => {
  it('keeps text with no separator as still being typed', () => {
    expect(splitTags('brick', words)).toEqual({ confirmed: [], rest: 'brick' })
  })

  it('confirms the tag when a separator is typed after it', () => {
    expect(splitTags('brick,', words)).toEqual({ confirmed: ['brick'], rest: '' })
    expect(splitTags('brick ', words)).toEqual({ confirmed: ['brick'], rest: '' })
  })

  it('splits pasted text at every separator, keeping the last piece in the field', () => {
    expect(splitTags('brick wall, kerb mos', words)).toEqual({ confirmed: ['brick', 'wall', 'kerb'], rest: 'mos' })
  })

  it('confirms nothing for separators alone', () => {
    expect(splitTags(' ', words)).toEqual({ confirmed: [], rest: '' })
    expect(splitTags(', ,', words)).toEqual({ confirmed: [], rest: '' })
  })

  it('keeps phrases whole when space isn’t a separator', () => {
    expect(splitTags('Kara Vass, the Captain', [','])).toEqual({ confirmed: ['Kara Vass'], rest: ' the Captain' })
  })

  it('never splits with no separators (Enter only)', () => {
    expect(splitTags('a, b c', [])).toEqual({ confirmed: [], rest: 'a, b c' })
    expect(splitTags('a, b c', [''])).toEqual({ confirmed: [], rest: 'a, b c' })
  })

  it('treats separators as plain characters, not patterns', () => {
    expect(splitTags('a.b|c', ['.', '|'])).toEqual({ confirmed: ['a', 'b'], rest: 'c' })
  })
})

describe('addTags', () => {
  it('normalises, and drops blanks and repeats (including ones already there)', () => {
    expect(addTags(['brick'], ['Brick', ' ', 'Wall', 'wall '], normalize)).toEqual(['brick', 'wall'])
  })
})
