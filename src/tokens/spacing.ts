export const spacingScale = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 56, 80] as const

export const spacing = {
  sp0: 0,
  sp1: 2,
  sp2: 4,
  sp3: 6,
  sp4: 8,
  sp5: 12,
  sp6: 16,
  sp7: 20,
  sp8: 24,
  sp9: 32,
  sp10: 40,
  sp11: 56,
  sp12: 80,
} as const

export const px = (n: number): string => `${n}px`
