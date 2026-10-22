import type { TextStyle } from 'react-native'
import { fontWeights } from 'achery-ui/tokens'

/** The three families in the type system: Roboto Slab, Space Grotesk and JetBrains Mono on the web. */
export type FontRole = 'display' | 'body' | 'mono'

export type FontWeightName = keyof typeof fontWeights

/**
 * The font families an app has loaded, by role and weight. React Native can't pick a weight out of one
 * family on every platform, so each weight is its own family name, as Expo's Google Fonts packages
 * register them. Map the weights you load; any role/weight left out uses the platform font at that
 * weight, which is also what every component does when no `fonts` are given.
 *
 * @example
 * ```ts
 * // after useFonts({ RobotoSlab_700Bold, RobotoSlab_900Black, SpaceGrotesk_400Regular, … })
 * const fonts: NativeFonts = {
 *   display: { bold: 'RobotoSlab_700Bold', black: 'RobotoSlab_900Black' },
 *   body: {
 *     regular: 'SpaceGrotesk_400Regular',
 *     medium: 'SpaceGrotesk_500Medium',
 *     semibold: 'SpaceGrotesk_600SemiBold',
 *     bold: 'SpaceGrotesk_700Bold',
 *   },
 *   mono: { regular: 'JetBrainsMono_400Regular' },
 * }
 * ```
 */
export type NativeFonts = Partial<Record<FontRole, Partial<Record<FontWeightName, string>>>>

export type FontStyle = Pick<TextStyle, 'fontFamily' | 'fontWeight'>

/**
 * The style for a role at a weight: the mapped family on its own (the family is the weight; adding
 * `fontWeight` too can make Android pick a synthetic weight), or the platform font at that weight.
 */
export const resolveFont = (fonts: NativeFonts | undefined, role: FontRole, weight: FontWeightName = 'regular'): FontStyle => {
  const family = fonts?.[role]?.[weight]
  return family ? { fontFamily: family } : { fontWeight: fontWeights[weight] }
}
