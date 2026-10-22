import type { ReactNode } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { AccentColor, AccentDial, MaterialSignature } from 'achery-ui'
import { NativeThemeProvider } from 'achery-ui/native'

export interface NativeFrameProps {
  theme: 'light' | 'dark'
  accent: AccentColor
  dial: AccentDial
  material: MaterialSignature
  children: ReactNode
}

// What a native app puts at its root, for each native preview: the theme provider (its defaults are
// initial values only, so the key remounts it when the preview settings change) and a safe-area context
// with zero insets, as a browser has no notch.
const METRICS = { frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }

export const NativeFrame = ({ theme, accent, dial, material, children }: NativeFrameProps) => (
  <SafeAreaProvider initialMetrics={METRICS}>
    <NativeThemeProvider
      key={`${theme}-${accent}-${dial}-${material}`}
      defaultMode={theme}
      defaultAccent={accent}
      defaultDial={dial}
      defaultMaterial={material}
    >
      {children}
    </NativeThemeProvider>
  </SafeAreaProvider>
)

export default NativeFrame
