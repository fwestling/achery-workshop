import { View, Text, type ViewProps, type ViewStyle, type TextStyle } from 'react-native'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import type { MaterialIntensity, MaterialSignature } from '../../types/theme'

export type { MaterialIntensity }

export interface NativeMaterialCardProps extends ViewProps {
  /**
   * How much of the material surfaces on this object.
   * - `'chrome'`  — material as left spine + metal eyebrow; paper body (default)
   * - `'surface'` — material header band over a paper body
   * - `'full'`    — whole object in material; reserve for rare moments
   * @default 'chrome'
   */
  intensity?: MaterialIntensity
  /**
   * Override the material signature for this object only. When omitted, uses
   * the `material` value from the nearest `NativeThemeProvider`.
   */
  signature?: MaterialSignature
  /** Header content — rendered as a bar with the material mark. */
  header?: string
  /** Footer content — rendered below a divider line. */
  footer?: React.ReactNode
  children?: React.ReactNode
}

type MaterialColors = {
  material: string
  materialFg: string
  materialBtnFg: string
  metal: string
  metalDeep: string
}

function getMaterialColors(signature: MaterialSignature, tokens: ReturnType<typeof useTheme>['tokens']): MaterialColors {
  switch (signature) {
    case 'wood':
      return {
        material: tokens.materialWood,
        materialFg: tokens.materialWoodFg,
        materialBtnFg: tokens.materialWoodFg,
        metal: tokens.silverLight,
        metalDeep: tokens.silverDeep,
      }
    case 'copper':
      return {
        material: tokens.materialCopper,
        materialFg: tokens.materialCopperFg,
        materialBtnFg: tokens.bg,
        metal: tokens.copperPatina,
        metalDeep: tokens.copperPatina,
      }
    case 'leather':
    default:
      return {
        material: tokens.materialLeather,
        materialFg: tokens.materialLeatherFg,
        materialBtnFg: tokens.fg,
        metal: tokens.gold,
        metalDeep: tokens.goldDeep,
      }
  }
}

export function MaterialCard({
  intensity = 'chrome',
  signature,
  header,
  footer,
  children,
  style,
  ...props
}: NativeMaterialCardProps) {
  const { tokens, material: contextMaterial } = useTheme()
  const resolvedSignature: MaterialSignature = signature ?? (contextMaterial !== 'none' ? contextMaterial : 'leather')
  const mc = getMaterialColors(resolvedSignature, tokens)

  const isChrome = intensity === 'chrome'
  const isSurface = intensity === 'surface'
  const isFull = intensity === 'full'

  const containerStyle: ViewStyle = {
    backgroundColor: isFull ? mc.material : tokens.surface,
    borderWidth: 1,
    borderColor: tokens.border,
    ...(isChrome ? { borderLeftWidth: 3, borderLeftColor: mc.material } : {}),
    ...(isFull
      ? {
          shadowColor: tokens.fg,
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 6,
        }
      : {
          shadowColor: tokens.fg,
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4,
        }),
  }

  const barBg = isSurface || isFull ? mc.material : undefined
  const barBorderColor = isFull ? mc.metal : tokens.border
  const barTextColor = isSurface || isFull ? mc.materialFg : tokens.fg

  const eyebrowColor: TextStyle['color'] = isFull ? mc.metal : mc.metalDeep
  const bodyTextColor: TextStyle['color'] = isFull ? mc.materialFg : tokens.fg
  const rowBorderColor = isFull ? mc.metal : tokens.borderMute
  const footBorderColor = isFull ? mc.metal : tokens.borderMute

  return (
    <View style={[containerStyle, style]} {...props}>
      {header !== undefined && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sp3,
            padding: spacing.sp5,
            backgroundColor: barBg,
            borderBottomWidth: 1,
            borderBottomColor: barBorderColor,
          }}
        >
          <View
            style={{
              width: 9,
              height: 9,
              backgroundColor: isSurface || isFull ? mc.metal : mc.material,
              transform: [{ rotate: '45deg' }],
            }}
          />
          <Text
            style={{
              color: barTextColor,
              fontWeight: '700',
              fontSize: 15,
              letterSpacing: -0.3,
              flex: 1,
            }}
          >
            {header}
          </Text>
        </View>
      )}

      <View style={{ padding: spacing.sp5, gap: spacing.sp4 }}>
        {children}
      </View>

      {footer !== undefined && (
        <View
          style={{
            padding: spacing.sp5,
            borderTopWidth: 1,
            borderTopColor: footBorderColor,
            flexDirection: 'row',
            gap: spacing.sp3,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  )
}

/** Eyebrow label styled for use inside a MaterialCard. */
export function MaterialEyebrow({ children, intensity = 'chrome', signature }: { children: string; intensity?: MaterialIntensity; signature?: MaterialSignature }) {
  const { tokens, material: contextMaterial } = useTheme()
  const resolvedSignature: MaterialSignature = signature ?? (contextMaterial !== 'none' ? contextMaterial : 'leather')
  const mc = getMaterialColors(resolvedSignature, tokens)
  const color = intensity === 'full' ? mc.metal : mc.metalDeep

  return (
    <Text style={{ fontSize: 10, fontWeight: '600', letterSpacing: 1.8, textTransform: 'uppercase', color }}>
      {children}
    </Text>
  )
}
